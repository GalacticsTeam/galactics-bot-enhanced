import { ChannelType, PermissionFlagsBits } from 'discord.js';

import { getRole } from '@utils';

import type { Command } from './types';

export const unlockChannel: Command = async (interaction) => {
  const { guild, channel } = interaction;

  if (!channel) return;

  const memberRole = await getRole(guild, 'member');

  if (!memberRole) return interaction.reply({ content: 'Invalid Role', ephemeral: true });
  if (channel.type !== ChannelType.GuildText) return;

  channel.permissionOverwrites
    .set([{ id: memberRole.id, allow: PermissionFlagsBits.SendMessages }])
    .then(() => interaction.reply({ content: 'Channel unlocked', ephemeral: true }));
};

unlockChannel.create = {
  name: 'unlock-channel',
  description: 'Unlocks the current channel allowing members to send messages in it',
};
