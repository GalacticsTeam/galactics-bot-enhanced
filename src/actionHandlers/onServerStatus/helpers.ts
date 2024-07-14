import { Guild } from 'discord.js';

import { setServerSchemaItem } from '../../db';

import type { ID } from '../../types';
import type { Status } from './types';

export const addSchemaStatus = (serverId: ID, status: Status) =>
  setServerSchemaItem(serverId, 'properties', (prevProperties) => ({
    ...prevProperties,
    statuses: [...prevProperties.statuses, status],
  }));

export const getStatusCount = async (guild: Guild, status: Status) => {
  switch (status.type) {
    case 'role':
      const role = guild.roles.cache.get(status.value);
      if (!role) return null;

      const members = await guild.members.fetch();

      return members.map((i) => i).filter((member) => member.roles.cache.has(role.id)).length;

    case 'youtube':
      // TODO: Implement YouTube status count
      if (!status.value) return null;

      return status.value;
  }
};
