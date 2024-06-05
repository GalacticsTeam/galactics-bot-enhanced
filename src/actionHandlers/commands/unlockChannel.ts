import { PermissionFlagsBits, TextChannel } from 'discord.js';

import { Command } from './types';

const roles = {
  member: '1086033687109455989',
};

export const unlockChannel: Command = (interaction) => {
  const channel = interaction.channel as TextChannel;

  channel.permissionOverwrites.set([
    {
      id: roles.member,
      allow: PermissionFlagsBits.SendMessages,
    },
  ]);

  interaction.reply({ content: 'Channel unlocked', ephemeral: true });
};

unlockChannel.create = {
  name: 'unlock-channel',
  description: 'Unlocks the current channel allowing members to send messages in it',
};
