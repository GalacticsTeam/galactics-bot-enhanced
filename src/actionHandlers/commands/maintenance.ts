import { onMaintenance } from '../onMaintenance';

import type { Command } from './types';

export const maintenance: Command = async (interaction) => {
  const { guild } = interaction;

  interaction.deferReply({ ephemeral: true });

  await onMaintenance(guild).then((newIsMaintenance) =>
    interaction.editReply({ content: `Maintenance mode is now ${newIsMaintenance ? 'on' : 'off'}` })
  );
};

maintenance.create = {
  name: 'maintenance',
  description: 'Toggle maintenance mode',
};
