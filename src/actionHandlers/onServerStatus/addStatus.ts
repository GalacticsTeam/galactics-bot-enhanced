import { v4 as id } from 'uuid';

import { setServerProperty } from '@db';
import type { CommandInteraction } from '@commands/types';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Status, StatusType } from './types';

export const addStatus = async (title: string, type: StatusType, interaction: CommandInteraction) => {
  const t = await onUserTranslate(interaction.user.id);

  const role = interaction.options.getRole('role', true);
  const channel = interaction.options.getString('channel', true);

  const value = role?.id ?? channel;

  addSchemaStatus(interaction.guild.id, { title, type, value, id: id() }).then(() => {
    interaction.reply({ content: t('serverStatus.add.beingAdded', { title }), ephemeral: true });
  });
};

export const addSchemaStatus = (serverId: string, status: Status) =>
  setServerProperty(serverId, 'properties', (prevProperties) => ({
    ...prevProperties,
    statuses: [...prevProperties.statuses, status],
  }));
