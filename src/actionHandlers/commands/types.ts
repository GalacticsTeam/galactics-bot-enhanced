import type { ApplicationCommandDataResolvable, ChatInputCommandInteraction } from 'discord.js';

import { commands } from './commands';

export type Command = Record<`create`, InteractionCreate> &
  ((interaction: ChatInputCommandInteraction<'cached'>) => void);

export type Interaction = typeof commands;
export type InteractionIdentifier = Interaction[number]['type'];
export type InteractionName = Interaction[number]['name'];
export type InteractionCreate = ApplicationCommandDataResolvable & { name: InteractionName };
