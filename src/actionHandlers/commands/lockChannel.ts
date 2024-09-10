import { ChannelType, PermissionFlagsBits } from 'discord.js';

import { getRole } from '../../utils/helpers';

import type { Command } from './types';

export const lockChannel: Command = async (interaction) => {
  const { guild, channel } = interaction;

  if (!channel) return;

  const memberRole = await getRole(guild, 'member');

  if (!memberRole) return interaction.reply({ content: 'Invalid Role', ephemeral: true });
  if (channel.type !== ChannelType.GuildText) return;

  channel.permissionOverwrites
    .set([{ id: memberRole.id, deny: PermissionFlagsBits.SendMessages }])
    .then(() => interaction.reply({ content: 'Channel locked', ephemeral: true }));
};

lockChannel.create = {
  name: 'lock-channel',
  description: 'Prevents members from sending messages in this channel',
};
