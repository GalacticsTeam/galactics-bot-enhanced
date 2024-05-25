import { Client } from 'discord.js';

import { action } from './action';

import { onReady } from './onReady';
import { onMessageCreate } from './onMessageCreate';

export const invokeActions = (Client: Client) => {
  action(Client, 'ready', onReady);
  action(Client, 'messageCreate', onMessageCreate);
};
