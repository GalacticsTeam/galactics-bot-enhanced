import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';

import type { Command } from './types';

export const slowMode: Command = (interaction) => {
  const { options, channel, member } = interaction;

  const duration = options.getNumber('duration');

  // check if the member is an administrator
  if (!(member.permissions as PermissionsBitField).has('Administrator')) return;

  // remove slow-mode from channel
  if (duration == 0) {
    channel
      .setRateLimitPerUser(duration)
      .then(() => interaction.reply({ content: `Slow mode has been removed`, ephemeral: true }));
    return;
  }

  // adding slow-mode to the channel
  channel
    .setRateLimitPerUser(duration, 'reason')
    .then(() => interaction.reply({ content: `Channel slow mode is set to ${duration}s`, ephemeral: true }));
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
