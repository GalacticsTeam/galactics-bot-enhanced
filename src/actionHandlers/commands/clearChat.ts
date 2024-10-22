import { ApplicationCommandOptionType, ChannelType, type PermissionsBitField } from 'discord.js';

import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const clearChat: Command = async (interaction) => {
  const { member, channel, options } = interaction;
  const t = await onUserTranslate(interaction.guildId, interaction.user.id);

  if (!channel) return;

  if (!(member.permissions as Readonly<PermissionsBitField>).has('Administrator')) return;

  const amount = options.getInteger('amount', true);

  if (amount > 100)
    return interaction.reply({ content: t('error.clearChat.maximumCount', { count: 100 }), ephemeral: true });
  if (amount < 1)
    return interaction.reply({ content: t('error.clearChat.minimumCount', { count: 1 }), ephemeral: true });

  if (channel.type !== ChannelType.GuildText)
    return interaction.reply({
      content: t('error.commandOnlyWorksIn', { channel: t('channel.text') }),
      ephemeral: true,
    });

  channel
    .bulkDelete(amount)
    .then(() => interaction.reply({ content: t('clearChat.deleted', { amount }), ephemeral: true }))
    .catch(console.log);
};

clearChat.create = {
  name: 'clear',
  description: 'Clear N amount of massages',
  options: [
    {
      name: 'amount',
      description: 'The amount wanted to be cleared',
      required: true,
      type: ApplicationCommandOptionType.Integer,
    },
  ],
};
