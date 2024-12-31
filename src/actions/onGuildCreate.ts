import type { Guild } from 'discord.js';

import { getServer } from '@db';
import { createAllCommands } from '@actionHandlers';

export const onGuildCreate = (guild: Guild) => {
  const commands = guild.commands;

  getServer(guild.id);

  createAllCommands(commands);
};
