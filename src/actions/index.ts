import { CacheType, Client, Interaction } from 'discord.js';

import { action, interval } from './action';

import { onReady } from './onReady';
import { onMessageCreate } from './onMessageCreate';
import { onInteractionCreate } from './onInteractionCreate';
import { onGuildCreate } from './onGuildCreate';
import { onGuildMemberAdd } from './onGuildMemberAdd';

import { onServerStatus } from '../actionHandlers';

export const invokeActions = (Client: Client) => {
  action(Client, 'ready', onReady);
  action(Client, 'messageCreate', onMessageCreate);
  action(Client, 'interactionCreate', onInteractionCreate as (i: Interaction<CacheType>) => void);
  action(Client, 'guildMemberAdd', onGuildMemberAdd);
  action(Client, 'guildCreate', onGuildCreate);

  interval(Client, onServerStatus, 30000);
};
