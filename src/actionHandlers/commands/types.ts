import type { ApplicationCommandDataResolvable, ChatInputCommandInteraction } from 'discord.js';

import { commands } from './';

export type Command = Record<`create`, InteractionCreate> & ((interaction: ChatInputCommandInteraction) => void);

export type Interaction = typeof commands;
export type InteractionIdentifier = Interaction[number]['interaction']['name'];
export type InteractionName = Interaction[number]['name'];
type InteractionCreate = ApplicationCommandDataResolvable & { name: InteractionName };
