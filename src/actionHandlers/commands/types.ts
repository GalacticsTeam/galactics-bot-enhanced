import { ApplicationCommandDataResolvable } from 'discord.js';

import { commands } from '../../utils';

export type commandName = keyof typeof commands;

export type command<T extends commandName> = Record<`${T}Create`, ApplicationCommandDataResolvable> & Function;
