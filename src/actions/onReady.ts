import type { Client } from 'discord.js';

import { getServerSchema, runDB } from '../db';
import { isDevMode } from '../utils';
import { createAllCommands, onCustomStatus } from '../actionHandlers';
import { getLocalDBStatus } from '../localdb';

export const onReady = async <T extends boolean>(client: Client<T>) => {
  const localDBStatus = await getLocalDBStatus();

  // Database Connection
  await runDB();

  // Custom Status
  onCustomStatus(client);

  const servers = client.guilds.cache.toJSON();
  servers.forEach(async (server) => {
    const commands = server.commands;

    // Server Schema
    await getServerSchema(server.id);

    // Command Creation
    createAllCommands(commands);
  });

  // Bot Up Messages
  console.log(`Test Mode is set to ${isDevMode}`);
  console.log(`Bot's Dev Name: ${process.env.DEVNAME}`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Serving on ${servers.length} servers`);
  console.log(`Local DB Status: ${localDBStatus}`);
  console.log('The Bot Is Ready');
};
