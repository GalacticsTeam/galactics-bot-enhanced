import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';

import { getEmbed } from '@utils';
import { getUserSchemaItem } from '@db';

import type { Command } from './types';

export const user: Command = async (interaction) => {
  const { user, guild, options } = interaction;

  const guildUser = guild.members.cache.get(options.getUser('user')?.id ?? user.id);

  if (!guildUser) return interaction.reply({ content: 'Invalid User', ephemeral: true });

  const color = await getEmbed(guild.id, 'color');
  const warns = await getUserSchemaItem(guild.id, guildUser.id, 'warns');

  const userAvatarUrl = guildUser.user.avatarURL({ size: 2048 });

  interaction.reply({
    embeds: [
      new EmbedBuilder()
        .addFields(
          { name: 'Warns count:', value: `${warns.number}`, inline: false },
          {
            name: 'Joined Discord:',
            value: `**<t:${parseInt(`${guildUser.user.createdTimestamp / 1000}`, 10)}:R>**`,
            inline: true,
          },
          {
            name: 'Joined Server:',
            value: `**<t:${parseInt(`${guildUser.joinedTimestamp ?? 0 / 1000}`, 10)}:R>**`,
            inline: true,
          }
        )
        .setThumbnail(userAvatarUrl)
        .setColor(color)
        .setFooter({ text: guildUser.user.tag, iconURL: userAvatarUrl ?? undefined }),
    ],
    ephemeral: false,
  });
};

user.create = {
  name: 'user',
  description: 'Get your account creation and server joined date',
  options: [
    {
      name: 'user',
      description: "get server member's data",
      type: ApplicationCommandOptionType.User,
    },
  ],
};
