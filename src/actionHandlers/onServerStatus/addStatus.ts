import type { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { v4 as id } from 'uuid';

import { setServerSchemaItem } from '../../db';

import type { Status, StatusType } from './types';

export const addStatus = async (
  title: string,
  type: StatusType,
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const role = interaction.options.getRole('role');
  const channel = interaction.options.getString('channel');

  const value = role?.id ?? channel;

  addSchemaStatus(interaction.guild.id, { title, type, value, id: id() }).then(() => {
    interaction.reply({ content: `Status "${title}" is being added.`, ephemeral: true });
  });
};

export const addSchemaStatus = (serverId: string, status: Status) =>
  setServerSchemaItem(serverId, 'properties', (prevProperties) => ({
    ...prevProperties,
    statuses: [...prevProperties.statuses, status],
  }));
