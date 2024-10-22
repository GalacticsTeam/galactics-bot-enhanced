import { ChannelType, PermissionFlagsBits } from 'discord.js';

import { getRole } from '@utils';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const lockChannel: Command = async (interaction) => {
  const { guild, channel } = interaction;
  const t = await onUserTranslate(guild.id, interaction.user.id);

  if (!channel) return;

  const memberRole = await getRole(guild, 'member');

  if (!memberRole) return interaction.reply({ content: t('error.roleIsNotSet'), ephemeral: true });
  if (channel.type !== ChannelType.GuildText) return;

  channel.permissionOverwrites
    .set([{ id: memberRole.id, deny: PermissionFlagsBits.SendMessages }])
    .then(() => interaction.reply({ content: t('channelLock.locked'), ephemeral: true }));
};

lockChannel.create = {
  name: 'lock-channel',
  description: 'Prevents members from sending messages in this channel',
};
