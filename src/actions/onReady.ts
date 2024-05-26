import { Client } from 'discord.js';

import { botConfig, isDevMode } from '../utils';
import { commandsCreate } from '../actionHandlers';

export const onReady = <T extends boolean>(client: Client<T>) => {
  const guild = client.guilds.cache.get(botConfig.serverId);
  const commands = guild.commands;

  // Command Creation
  commandsCreate(commands);

  // Bot Up Messages
  console.log(`Test Mode is set to ${isDevMode}`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log('The Bot Is Ready');
};
