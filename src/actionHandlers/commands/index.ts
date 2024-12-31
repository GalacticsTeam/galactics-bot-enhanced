import type { GuildApplicationCommandManager } from 'discord.js';

import { getCommandIdentifierIndex, isFeatureAllowed } from '@utils';
import { onUserTranslate } from '@i18n/onTranslate';

import { commands } from './commands';
import type { CommandInteraction, Interaction, InteractionCreate, InteractionName } from './types';

export const commandsHandler = (interaction: CommandInteraction) => {
  const interactionName = interaction.commandName as InteractionName;
  const command = commands[getCommandIdentifierIndex(interactionName)];

  if (command.name !== interactionName) return;

  createCommandFn(interaction, command);
};

const createCommandFn = async (interaction: CommandInteraction, command: Interaction[number]) => {
  const t = await onUserTranslate(interaction.user.id);

  if (!(await isFeatureAllowed(command.type, interaction.guild.id)))
    return interaction.reply({ content: t('error.commandIsDisabled', { command: command.name }), ephemeral: true });

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
