import { ApplicationCommandOptionType, EmbedBuilder, type Guild, type User } from 'discord.js';

import { getEmbed } from '@utils';

import type { Command } from './types';

export const avatar: Command = async (interaction) => {
  const { user, guild, options } = interaction;

  const isServer = options.getSubcommand() === 'server';
  const source = isServer ? guild : (options.getUser('member') ?? user);

  const color = await getEmbed(guild.id, 'color');

  const name = isServer ? (source as Guild).name : (source as User).displayName;
  const avatarURL = isServer ? (source as Guild).iconURL({ size: 2048 }) : (source as User).avatarURL({ size: 2048 });

  interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(color)
        .setTitle(name)
        .setDescription(`[Avatar Link](${avatarURL})`)
        .setImage(avatarURL),
    ],
    ephemeral: true,
  });
};

avatar.create = {
  name: 'avatar',
  description: 'Get avatar of a user or this server',
  options: [
    {
      name: 'user',
      description: 'Get your avatar',
      required: false,
      type: ApplicationCommandOptionType.Subcommand,
      options: [{ name: 'member', description: "Get member's avatar", type: ApplicationCommandOptionType.User }],
    },
    {
      name: 'server',
      description: "Get this server's avatar",
      required: false,
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
};
