import { PermissionFlagsBits, TextChannel } from 'discord.js';

import { Command } from './types';
import { getServerItem } from '../../db';

export const unlockChannel: Command = async (interaction) => {
  const roles = await getServerItem(interaction.guild.id, 'roles');
  if (!roles.member) return interaction.reply({ content: 'No member role set', ephemeral: true });

  const channel = interaction.channel as TextChannel;
  channel.permissionOverwrites
    .set([{ id: roles.member, allow: PermissionFlagsBits.SendMessages }])
    .then(() => interaction.reply({ content: 'Channel unlocked', ephemeral: true }));
};

unlockChannel.create = {
  name: 'unlock-channel',
  description: 'Unlocks the current channel allowing members to send messages in it',
};
