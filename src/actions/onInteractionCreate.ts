import { ChatInputCommandInteraction } from 'discord.js';
import { commands } from '../actionHandlers';

export const onInteractionCreate = (interaction: ChatInputCommandInteraction) => {
  if (!interaction.isCommand()) return;

  commands(interaction);
};
