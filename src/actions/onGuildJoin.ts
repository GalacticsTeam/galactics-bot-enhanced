import { Guild } from 'discord.js';

import { defaultServerConfig } from '../utils';
import { setNewServerSchema } from '../db';

export const onGuildJoin = (guild: Guild) => {
  setNewServerSchema({ serverId: guild.id, ...defaultServerConfig });
};
