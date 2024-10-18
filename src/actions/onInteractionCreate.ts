import { commandsHandler } from '@actionHandlers';
import type { CommandInteraction } from '@commands/types';

export const onInteractionCreate = (interaction: CommandInteraction) => {
  if (!interaction.isCommand()) return;

  commandsHandler(interaction);
};
