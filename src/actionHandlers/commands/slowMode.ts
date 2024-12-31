import { ApplicationCommandOptionType, ChannelType } from 'discord.js';

import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const slowMode: Command = async (interaction) => {
  const { options, channel } = interaction;
  const t = await onUserTranslate(interaction.user.id);

  if (channel?.type !== ChannelType.GuildText) return;

  const duration = options.getInteger('duration', true);

  const content = duration ? t('slowMode.set', { time: duration }) : t('slowMode.disabled');

  // TODO: Add optional reason for slow mode
  channel.setRateLimitPerUser(duration, 'Change slow mode').then(() => interaction.reply({ content, ephemeral: true }));
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
