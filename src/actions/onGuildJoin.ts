import { Guild } from 'discord.js';

import { defaultServerConfig } from '../utils';
import { ServerSchema } from '../db';

export const onGuildJoin = (guild: Guild) => {
  const newServer = new ServerSchema({
    serverId: guild.id,
    ...defaultServerConfig,
  });

  newServer.save();
};
