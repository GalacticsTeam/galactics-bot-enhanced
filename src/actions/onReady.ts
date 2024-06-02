import { Client } from 'discord.js';

import { ServerSchema, runDB } from '../db';
import { isDevMode } from '../utils';
import { commandsCreate } from '../actionHandlers';

export const onReady = async <T extends boolean>(client: Client<T>) => {
  // Database Connection
  await runDB();

  const servers = await ServerSchema.find({ isDevServer: isDevMode });
  servers.forEach((server) => {
    const guild = client.guilds.cache.get(server.serverId);
    const commands = guild.commands;

    // Command Creation
    commandsCreate(commands);
  });

  // Bot Up Messages
  console.log(`Test Mode is set to ${isDevMode}`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Serving on ${servers.length} servers`);
  console.log('The Bot Is Ready');
};
