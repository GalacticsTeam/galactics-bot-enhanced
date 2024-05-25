import { Client } from 'discord.js';

import { action } from './action';

import { onReady } from './onReady';
import { onMessageCreate } from './onMessageCreate';
import { onInteractionCreate } from './onInteractionCreate';

export const invokeActions = (Client: Client) => {
  action(Client, 'ready', onReady);
  action(Client, 'messageCreate', onMessageCreate);
  action(Client, 'interactionCreate', onInteractionCreate);
};
