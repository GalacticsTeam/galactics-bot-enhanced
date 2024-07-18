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
import { getLocalDBItem, setLocalDBItem } from '../../localdb';
import { getProperty } from '../../utils/helpers';

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
  const statusWithChannel = await getLocalDBItem(statusToRemove.guild.id, 'statusChannels');

  await setServerSchemaItem(statusToRemove.guild.id, 'properties', (prevProperties) => ({
    ...prevProperties,
    statuses: prevProperties.statuses.filter((status) => status.id !== statusId),
  }))
    .then(() => {
      const statusChannel = statusToRemove.guild.channels.cache.get(
        statusWithChannel.find((status) => status.id === statusId).channelId
      );

      statusChannel.delete().catch(console.log);
    })
    .then(async () => {
      await setLocalDBItem(statusToRemove.guild.id, 'statusChannels', (prevStatuses) =>
        prevStatuses.filter((status) => status.id !== statusId)
      );

      statusToRemove.reply({ content: `Status has been removed.`, ephemeral: true });
    });
};

export const removeStatus = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const statuses = await getProperty(interaction.guild.id, 'statuses');
  if (!statuses.length) return interaction.reply({ content: 'No statuses to remove.', ephemeral: true });

  interaction
    .reply({
      content: "Please Choose the status you'd like to remove.",
      components: [removeStatusMenu(statuses)],
      ephemeral: true,
    })
    .then((res) => removeStatusMenuHandler(res));
};
