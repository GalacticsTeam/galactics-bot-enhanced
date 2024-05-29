import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { isAllowedFeature } from '../../utils/helpers';
import { commands as commandNames } from '../../utils/botConfig';

import { type command } from './types';
import { commandName } from './types';
import { diceRoll } from './diceRoll';
import { avatar } from './avatar';
import { user } from './user';
import { clearChat } from './clearChat';
import { serverInfo } from './serverInfo';

type commands = (typeof commandNames)[keyof typeof commandNames];

export const commands = (interaction: ChatInputCommandInteraction) => {
  switch (interaction.commandName as commands) {
    case 'roll-dice':
      return createCommandFn(interaction, diceRoll);

    case 'avatar':
      return createCommandFn(interaction, avatar);

    case 'user':
      return createCommandFn(interaction, user);

    case 'clear':
      return createCommandFn(interaction, clearChat);

    case 'server-info':
      return createCommandFn(interaction, serverInfo);
  }
};

export const commandsCreate = (commands: GuildApplicationCommandManager) => {
  createCommand(commands, diceRoll);
  createCommand(commands, avatar);
  createCommand(commands, user);
  createCommand(commands, clearChat);
  createCommand(commands, serverInfo);
};

const createCommandFn = <T extends commandName>(interaction: ChatInputCommandInteraction, command: command<T>) => {
  isAllowedFeature(command.name as T) && command(interaction);
};

const createCommand = <T extends commandName>(commands: GuildApplicationCommandManager, command: command<T>): void => {
  isAllowedFeature(command.name as T) && commands.create(command[((command.name as T) + 'Create') as `${T}Create`]);
};
