import type { Client } from 'discord.js';

import { isDevMode } from '@utils';
import { getLocalDBStatus } from '@localdb';
import { getServerSchema, runDB } from '@db';
import { createAllCommands, onCustomStatus } from '@actionHandlers';

export const onReady = async (client: Client<true>) => {
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
