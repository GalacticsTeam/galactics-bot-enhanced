import { ApplicationCommandDataResolvable, ChatInputCommandInteraction } from 'discord.js';

import { commands } from './';

export type Interaction = typeof commands;
export type InteractionIdentifier = keyof Interaction;
export type InteractionName = Interaction[InteractionIdentifier]['name'];
export type InteractionFn = Interaction[InteractionIdentifier]['interaction'];

export type Command = Record<`create`, InteractionCreate> & ((interaction: ChatInputCommandInteraction) => void);
type InteractionCreate = ApplicationCommandDataResolvable & {
  name: InteractionName;
};
