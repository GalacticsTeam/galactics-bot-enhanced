import type { Guild } from 'discord.js';

import type { Status } from './types';

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
