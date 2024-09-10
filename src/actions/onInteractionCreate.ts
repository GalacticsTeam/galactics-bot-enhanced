import { commandsHandler } from '../actionHandlers';

import type { CommandInteraction } from '../actionHandlers/commands/types';

export const onInteractionCreate = (interaction: CommandInteraction) => {
  if (!interaction.isCommand()) return;

  commandsHandler(interaction);
};
