import { onMaintenance } from '@actionHandlers';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const maintenance: Command = async (interaction) => {
  const { guild } = interaction;
  const t = await onUserTranslate(interaction.user.id);

  interaction.deferReply({ ephemeral: true });

  await onMaintenance(guild).then((newIsMaintenance) =>
    interaction.editReply({ content: t('maintenance.modeIs', { mode: newIsMaintenance ? 'on' : 'off' }) })
  );
};

maintenance.create = {
  name: 'maintenance',
  description: 'Toggle maintenance mode',
};
