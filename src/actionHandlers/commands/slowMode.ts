import { ApplicationCommandOptionType, ChannelType } from 'discord.js';

import type { Command } from './types';

export const slowMode: Command = (interaction) => {
  const { options, channel } = interaction;

  if (channel?.type !== ChannelType.GuildText) return;

  const duration = options.getInteger('duration', true);

  channel.setRateLimitPerUser(duration, 'Change slow mode').then(() =>
    interaction.reply({
      content: duration ? `Channel slow mode is set to ${duration}s` : `Slow mode has been removed`,
      ephemeral: true,
    })
  );
};

slowMode.create = {
  name: 'slow-mode',
  description: "Set channel's slow mode",
  options: [
    {
      name: 'duration',
      description: 'Slow mode duration in seconds',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
