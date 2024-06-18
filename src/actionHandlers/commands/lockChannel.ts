import { PermissionFlagsBits, TextChannel } from 'discord.js';

import { Command } from './types';
import { getServerItem } from '../../db';

const roles = {
  member: '1086033687109455989',
};

export const lockChannel: Command = async (interaction) => {
  const roles = await getServerItem(interaction.guild.id, 'roles');
  if (!roles.member) return interaction.reply({ content: 'No member role set', ephemeral: true });

  const channel = interaction.channel as TextChannel;
  channel.permissionOverwrites
    .set([{ id: roles.member, deny: PermissionFlagsBits.SendMessages }])
    .then(() => interaction.reply({ content: 'Channel locked', ephemeral: true }));
};

lockChannel.create = {
  name: 'lock-channel',
  description: 'Prevents members from sending messages in this channel',
};
