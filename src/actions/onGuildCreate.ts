import type { Guild } from 'discord.js';

import { getServerSchema } from '../db';
import { createAllCommands } from '../actionHandlers';

export const onGuildCreate = (guild: Guild) => {
  const commands = guild.commands;

  getServerSchema(guild.id);

  createAllCommands(commands);
};
