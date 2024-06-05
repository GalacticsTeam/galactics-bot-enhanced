import { PermissionFlagsBits, TextChannel } from 'discord.js';

import { Command } from './types';

const roles = {
  member: '1086033687109455989',
};

export const lockChannel: Command = (interaction) => {
  const channel = interaction.channel as TextChannel;

  channel.permissionOverwrites.set([
    {
      id: roles.member,
      deny: PermissionFlagsBits.SendMessages,
    },
  ]);

  interaction.reply({ content: 'Channel locked', ephemeral: true });
};

lockChannel.create = {
  name: 'lock-channel',
  description: 'Prevents members from sending messages in this channel',
};
