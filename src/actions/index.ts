import type { CacheType, Client, Interaction, Message } from 'discord.js';

import { action, interval } from './action';

import { onReady } from './onReady';
import { onMessageCreate } from './onMessageCreate';
import { onInteractionCreate } from './onInteractionCreate';
import { onGuildCreate } from './onGuildCreate';
import { onGuildMemberAdd } from './onGuildMemberAdd';
import { onVoiceStateUpdate } from './onVoiceStateUpdate';
import { onGuildMemberUpdate } from './onGuildMemberUpdate';

import { onEveryTempChannel, onServerStatus } from '@actionHandlers';

export const invokeActions = (Client: Client<true>) => {
  action(Client, 'ready', onReady);
  action(Client, 'messageCreate', onMessageCreate as (m: Message) => void);
  action(Client, 'interactionCreate', onInteractionCreate as (i: Interaction<CacheType>) => void);
  action(Client, 'guildMemberAdd', onGuildMemberAdd);
  action(Client, 'guildCreate', onGuildCreate);
  action(Client, 'voiceStateUpdate', onVoiceStateUpdate);
  action(Client, 'guildMemberUpdate', onGuildMemberUpdate);

  interval(Client, onServerStatus, 15000);
  interval(Client, onEveryTempChannel, 5000);
};
