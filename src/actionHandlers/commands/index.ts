import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { getCommandIdentifierIndex, isAllowedFeature } from '../../utils/helpers';

import type { Interaction, InteractionName } from './types';

import { diceRoll } from './diceRoll';
import { avatar } from './avatar';
import { user } from './user';
import { clearChat } from './clearChat';
import { serverInfo } from './serverInfo';
import { slowMode } from './slowMode';
import { unlockChannel } from './unlockChannel';
import { lockChannel } from './lockChannel';
import { serverConfig } from './serverConfig';

export const commands = [
  { name: 'roll-dice', type: 'diceRoll', interaction: diceRoll },
  { name: 'avatar', type: 'avatar', interaction: avatar },
  { name: 'user', type: 'user', interaction: user },
  { name: 'clear', type: 'clearChat', interaction: clearChat },
  { name: 'server-info', type: 'serverInfo', interaction: serverInfo },
  { name: 'slow-mode', type: 'slowMode', interaction: slowMode },
  { name: 'unlock-channel', type: 'unlockChannel', interaction: unlockChannel },
  { name: 'lock-channel', type: 'lockChannel', interaction: lockChannel },
  { name: 'server-config', type: 'serverConfig', interaction: serverConfig },
] as const;

export const commandsHandler = (interaction: ChatInputCommandInteraction) => {
  const interactionName = interaction.commandName as InteractionName;
  const command = commands[getCommandIdentifierIndex(interactionName)];

  command.name === interactionName && createCommandFn(interaction, command);
};

export const commandsCreate = (commandsCreator: GuildApplicationCommandManager) =>
  Object.values(commands).forEach((command) => createCommand(commandsCreator, command));

const createCommandFn = async (interaction: ChatInputCommandInteraction, command: Interaction[number]) =>
  (await isAllowedFeature(command.type, interaction.guild.id))
    ? command.interaction(interaction)
    : interaction.reply({ content: command.name + ' is disabled in this server.', ephemeral: true });

const createCommand = async (commandsCreator: GuildApplicationCommandManager, command: Interaction[number]) =>
  (await isAllowedFeature(command.type, commandsCreator.guild.id)) &&
  commandsCreator.create(command.interaction.create);
