import { Guild } from 'discord.js';

import { defaultServerConfig } from '../utils';
import { setNewServerSchema } from '../db';

export const onGuildCreate = (guild: Guild) => {
  setNewServerSchema({ serverId: guild.id, ...defaultServerConfig });
};
