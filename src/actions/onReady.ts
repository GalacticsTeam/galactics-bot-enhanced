import { Client } from 'discord.js';

import { isDevMode } from '../utils/botConfig';

export const onReady = <T extends boolean>(client: Client<T>) => {
  // Bot Up Messages
  console.log(`Test Mode is set to ${isDevMode}`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log('The Bot Is Ready');
};
