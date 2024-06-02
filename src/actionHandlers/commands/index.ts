import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { getCommandIdentifier, isAllowedFeature } from '../../utils/helpers';

import type { Interaction, InteractionIdentifier, InteractionName } from './types';

import { diceRoll } from './diceRoll';
import { avatar } from './avatar';
import { user } from './user';
import { clearChat } from './clearChat';
import { serverInfo } from './serverInfo';
import { slowMode } from './slowMode';

export const commands = {
  diceRoll: { name: 'roll-dice', interaction: diceRoll },
  avatar: { name: 'avatar', interaction: avatar },
  user: { name: 'user', interaction: user },
  clearChat: { name: 'clear', interaction: clearChat },
  serverInfo: { name: 'server-info', interaction: serverInfo },
  slowMode: { name: 'slow-mode', interaction: slowMode },
} as const;

export const commandsHandler = (interaction: ChatInputCommandInteraction) => {
  const interactionName = interaction.commandName as InteractionName;
  const command = commands[getCommandIdentifier(interactionName)];

  command.name === interactionName && createCommandFn(interaction, command);
};

export const commandsCreate = (commandsCreator: GuildApplicationCommandManager) =>
  Object.values(commands).forEach((command) => createCommand(commandsCreator, command));

const createCommandFn = <T extends InteractionIdentifier>(
  interaction: ChatInputCommandInteraction,
  command: Interaction[T]
) => isAllowedFeature(getCommandIdentifier(command.name)) && command.interaction(interaction);

const createCommand = <T extends InteractionIdentifier>(
  commandsCreator: GuildApplicationCommandManager,
  command: Interaction[T]
) => isAllowedFeature(getCommandIdentifier(command.name)) && commandsCreator.create(command.interaction.create);
