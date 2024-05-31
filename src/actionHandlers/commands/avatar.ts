import { ApplicationCommandOptionType, EmbedBuilder, Guild, User } from 'discord.js';

import type { Command } from './types';

export const avatar: Command = (interaction) => {
  const { user, guild, options } = interaction;

  const server = options.getString('server') || null;
  const source = options.getUser('user') || (server ? guild : null) || user;

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(0x0f0229)
        .setTitle(!server ? (source as User).username : (source as Guild).name)
        .setDescription(
          `[Avatar Link](${
            !server ? (source as User).avatarURL({ size: 2048 }) : (source as Guild).iconURL({ size: 2048 })
          })`
        )
        .setImage(!server ? (source as User).avatarURL({ size: 2048 }) : (source as Guild).iconURL({ size: 2048 })),
    ],
    ephemeral: true,
  });
};

avatar.create = {
  name: 'avatar',
  description: "Get's your avatar",
  options: [
    {
      name: 'user',
      description: "Get's user's avatar",
      required: false,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: 'server',
      description: "Get's this server's avatar",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: 'server',
          value: 'server',
        },
      ],
    },
  ],
};
