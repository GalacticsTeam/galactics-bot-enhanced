import { ApplicationCommandOptionType } from 'discord.js';

import type { Command } from './types';

export const slowMode: Command = (interaction) => {
  const { options, channel } = interaction;

  const duration = options.getNumber('duration');

  channel.setRateLimitPerUser(duration, 'Change slow mode');

  // remove slow-mode from channel
  if (duration === 0) return interaction.reply({ content: `Slow mode has been removed`, ephemeral: true });

  // adding slow-mode to the channel
  interaction.reply({ content: `Channel slow mode is set to ${duration}s`, ephemeral: true });
};

slowMode.create = {
  name: 'slow-mode',
  description: "Set channel's slow mode",
  options: [
    {
      name: 'duration',
      description: 'Slow mode duration in seconds',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
};
