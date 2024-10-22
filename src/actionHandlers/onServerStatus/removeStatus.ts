import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  InteractionResponse,
  ComponentType,
} from 'discord.js';

import { getProperty } from '@utils';
import { setServerSchemaItem } from '@db';
import { getLocalDBItem, setLocalDBItem } from '@localdb';
import type { CommandInteraction } from '@commands/types';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Status } from './types';

export const removeStatusMenu = async (statuses: Status[], serverId: string, userId: string) => {
  const t = await onUserTranslate(serverId, userId);

  const statusesSelectMenu = new StringSelectMenuBuilder()
    .setCustomId('starter')
    .setPlaceholder(t('action.makeASelection'))
    .addOptions(
      statuses.map((status) => new StringSelectMenuOptionBuilder().setLabel(status.title).setValue(status.id))
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(statusesSelectMenu);
};

export const removeStatusMenuHandler = async (interaction: InteractionResponse<true>) => {
  const t = await onUserTranslate(interaction.interaction.guild.id, interaction.interaction.user.id);

  const statusToRemove = await interaction.awaitMessageComponent({
    componentType: ComponentType.StringSelect,
  });
  const statusId = statusToRemove.values[0];
  const statusWithChannel = await getLocalDBItem(statusToRemove.guild.id, 'statusChannels');

  await setServerSchemaItem(statusToRemove.guild.id, 'properties', (prevProperties) => ({
    ...prevProperties,
    statuses: prevProperties.statuses.filter((status) => status.id !== statusId),
  }))
    .then(() => {
      const statusChannel = statusToRemove.guild.channels.cache.get(
        statusWithChannel.find((status) => status.id === statusId)?.channelId ?? ''
      );

      statusChannel?.delete().catch(console.log);
    })
    .then(async () => {
      await setLocalDBItem(statusToRemove.guild.id, 'statusChannels', (prevStatuses) =>
        prevStatuses.filter((status) => status.id !== statusId)
      );

      statusToRemove.reply({ content: t('serverStatus.remove.statusRemoved'), ephemeral: true });
    });
};

export const removeStatus = async (interaction: CommandInteraction) => {
  const t = await onUserTranslate(interaction.guild.id, interaction.user.id);

  const statuses = await getProperty(interaction.guild.id, 'statuses');
  if (!statuses.length) return interaction.reply({ content: t('serverStatus.remove.noStatuses'), ephemeral: true });

  interaction
    .reply({
      content: t('serverStatus.remove.pleaseChoose'),
      components: [await removeStatusMenu(statuses, interaction.guild.id, interaction.user.id)],
      ephemeral: true,
    })
    .then(removeStatusMenuHandler);
};
