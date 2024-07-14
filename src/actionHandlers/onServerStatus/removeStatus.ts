import {
  ChatInputCommandInteraction,
  CacheType,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  InteractionResponse,
  ComponentType,
} from 'discord.js';

import { setServerSchemaItem } from '../../db';
import { getDBItem, setDBItem } from '../../localdb';

import type { Status } from './types';

export const removeStatusMenu = (statuses: Status[]) => {
  const statusesSelectMenu = new StringSelectMenuBuilder()
    .setCustomId('starter')
    .setPlaceholder('Make a selection!')
    .addOptions(
      statuses.map((status) => new StringSelectMenuOptionBuilder().setLabel(status.title).setValue(status.id))
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(statusesSelectMenu);
};

export const removeStatusMenuHandler = async (interaction: InteractionResponse<boolean>) => {
  const statusToRemove = await interaction.awaitMessageComponent({
    componentType: ComponentType.StringSelect,
  });
  const statusId = statusToRemove.values[0];
  const statusWithChannel = await getDBItem(statusToRemove.guild.id, 'statusChannels');

  await setServerSchemaItem(statusToRemove.guild.id, 'properties', (prevProperties) => ({
    ...prevProperties,
    statuses: prevProperties.statuses.filter((status) => status.id !== statusId),
  }))
    .then(() => {
      const statusChannel = statusToRemove.guild.channels.cache.get(
        statusWithChannel.find((status) => status.id === statusId).channelId
      );

      statusChannel.delete();
    })
    .then(async () => {
      await setDBItem(statusToRemove.guild.id, 'statusChannels', (prevStatuses) =>
        prevStatuses.filter((status) => status.id !== statusId)
      );

      statusToRemove.reply({ content: `Status has been removed.`, ephemeral: true });
    });
};
