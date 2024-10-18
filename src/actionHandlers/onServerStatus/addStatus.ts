import { v4 as id } from 'uuid';

import { setServerSchemaItem } from '@db';
import type { CommandInteraction } from '@commands/types';

import type { Status, StatusType } from './types';

export const addStatus = async (title: string, type: StatusType, interaction: CommandInteraction) => {
  const role = interaction.options.getRole('role', true);
  const channel = interaction.options.getString('channel', true);

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
