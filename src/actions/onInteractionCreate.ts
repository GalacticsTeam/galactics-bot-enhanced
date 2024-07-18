import type { ChatInputCommandInteraction } from 'discord.js';

import { commandsHandler } from '../actionHandlers';

export const onInteractionCreate = (interaction: ChatInputCommandInteraction) => {
  if (!interaction.isCommand()) return;

  commandsHandler(interaction);
};
