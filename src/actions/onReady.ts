import { Client } from 'discord.js';

import { botConfig, isDevMode } from '../utils';
import { commandsCreate } from '../actionHandlers';
import { onCutsomStatus } from '../actionHandlers/onCustomStatus';

export const onReady = <T extends boolean>(client: Client<T>) => {
  const guild = client.guilds.cache.get(botConfig.serverId);
  const commands = guild.commands;

  // Custom status
  onCutsomStatus(client);

  // Command Creation
  commandsCreate(commands);

  // Bot Up Messages
  console.log(`Test Mode is set to ${isDevMode}`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log('The Bot Is Ready');
};
