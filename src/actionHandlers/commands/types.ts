import { ApplicationCommandDataResolvable, ApplicationCommandOptionType } from 'discord.js';

import { commandName } from '../../types';

export type command<T extends commandName> = Record<`${T}Create`, ApplicationCommandDataResolvable> & Function;
