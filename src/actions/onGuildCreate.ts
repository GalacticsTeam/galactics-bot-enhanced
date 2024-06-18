import { Guild } from 'discord.js';

import { getServerSchema } from '../db';

export const onGuildCreate = (guild: Guild) => {
  getServerSchema(guild.id);
};
