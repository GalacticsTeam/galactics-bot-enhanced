import { Client } from 'discord.js';

import { action } from './action';

import { onReady } from './onReady';

export const invokeActions = (Client: Client) => {
  action(Client, 'ready', onReady);
};
