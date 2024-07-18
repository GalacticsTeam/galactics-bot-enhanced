import type { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { getCommandIdentifierIndex, isFeatureAllowed } from '../../utils/helpers';
import { commands } from './commands';

import type { Interaction, InteractionCreate, InteractionName } from './types';

export const commandsHandler = (interaction: ChatInputCommandInteraction) => {
  const interactionName = interaction.commandName as InteractionName;
  const command = commands[getCommandIdentifierIndex(interactionName)];

  command.name === interactionName && createCommandFn(interaction, command);
};

const createCommandFn = async (interaction: ChatInputCommandInteraction, command: Interaction[number]) => {
  if (!(await isFeatureAllowed(command.type, interaction.guild.id)))
    return interaction.reply({ content: command.name + ' is disabled in this server.', ephemeral: true });

  command.interaction(interaction);
};

export const createAllCommands = (commandManager: GuildApplicationCommandManager) =>
  Object.values(commands).forEach(async (command) => {
    if (!(await isFeatureAllowed(command.type, commandManager.guild.id))) return;

    commandManager.create(command.interaction.create);
  });

export const createCommand = (commandManager: GuildApplicationCommandManager, interactionCreate: InteractionCreate) =>
  commandManager.create(interactionCreate);

export const deleteCommand = async (
  commandManager: GuildApplicationCommandManager,
  interactionCreate: InteractionCreate
) => {
  const commandToDelete = (await commandManager.fetch()).find((command) => command.name === interactionCreate.name);
  if (!commandToDelete) return;

  commandManager.delete(commandToDelete);
};

export * from './commands';
