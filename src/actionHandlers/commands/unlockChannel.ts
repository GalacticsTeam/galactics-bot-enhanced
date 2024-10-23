import { ChannelType, PermissionFlagsBits } from 'discord.js';

import { getRole } from '@utils';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const unlockChannel: Command = async (interaction) => {
  const { guild, channel } = interaction;
  const t = await onUserTranslate(interaction.guildId, interaction.user.id);

  if (!channel) return;

  const memberRole = await getRole(guild, 'member');

  if (!memberRole) return interaction.reply({ content: t('error.roleIsNotSet'), ephemeral: true });
  if (channel.type !== ChannelType.GuildText) return;

  channel.permissionOverwrites
    .set([{ id: memberRole.id, allow: PermissionFlagsBits.SendMessages }])
    .then(() => interaction.reply({ content: t('channelLock.unlocked'), ephemeral: true }));
};

unlockChannel.create = {
  name: 'unlock-channel',
  description: 'Unlocks the current channel allowing members to send messages in it',
};
