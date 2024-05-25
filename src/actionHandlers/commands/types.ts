import { ApplicationCommandOptionType } from 'discord.js';

import { command } from '../../types';

type commandOptionChoice = {
  name: string;
  value: string;
};

type commandOption = {
  name: string;
  description: string;
  required: boolean;
  type: ApplicationCommandOptionType;
  choices?: commandOptionChoice[];
};

export type commandCreate = {
  name: command;
  description: string;
  options: commandOption[];
};
