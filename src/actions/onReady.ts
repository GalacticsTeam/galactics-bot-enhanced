import { Client } from 'discord.js';

import { getServerSchema, runDB } from '../db';
import { isDevMode } from '../utils';
import { commandsCreate, onCustomStatus } from '../actionHandlers';
import { getLocalDBStatus } from '../localdb';

export const onReady = async <T extends boolean>(client: Client<T>) => {
  // Database Connection
  await runDB();
  const localDBStatus = await getLocalDBStatus();

  const servers = client.guilds.cache.map((server) => server);
  servers.forEach(async (server) => {
    await getServerSchema(server.id);
    const commands = server.commands;

    // Custom Status
    onCustomStatus(client);

    // Command Creation
    commandsCreate(commands);
  });

  // Bot Up Messages
  console.log(`Test Mode is set to ${isDevMode}`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Serving on ${servers.length} servers`);
  console.log(`Local DB Status: ${localDBStatus}`);
  console.log('The Bot Is Ready');
};
