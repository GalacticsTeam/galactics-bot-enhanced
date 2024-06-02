import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { getCommandIdentifierIndex, isAllowedFeature } from '../../utils/helpers';

import type { Interaction, InteractionName } from './types';

import { diceRoll } from './diceRoll';
import { avatar } from './avatar';
import { user } from './user';
import { clearChat } from './clearChat';
import { serverInfo } from './serverInfo';
import { slowMode } from './slowMode';

export const commands = [
  { name: 'roll-dice', interaction: diceRoll },
  { name: 'avatar', interaction: avatar },
  { name: 'user', interaction: user },
  { name: 'clear', interaction: clearChat },
  { name: 'server-info', interaction: serverInfo },
  { name: 'slow-mode', interaction: slowMode },
] as const;

export const commandsHandler = (interaction: ChatInputCommandInteraction) => {
  const interactionName = interaction.commandName as InteractionName;
  const command = commands[getCommandIdentifierIndex(interactionName)];

  command.name === interactionName && createCommandFn(interaction, command);
};

export const commandsCreate = (commandsCreator: GuildApplicationCommandManager) =>
  Object.values(commands).forEach((command) => createCommand(commandsCreator, command));

const createCommandFn = (interaction: ChatInputCommandInteraction, command: Interaction[number]) =>
  isAllowedFeature(command.interaction.name) && command.interaction(interaction);

const createCommand = (commandsCreator: GuildApplicationCommandManager, command: Interaction[number]) =>
  isAllowedFeature(command.interaction.name) && commandsCreator.create(command.interaction.create);
