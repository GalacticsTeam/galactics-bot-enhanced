import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';

import type { Command } from './types';
import { getServerItem } from '../../db';

export const user: Command = async (interaction) => {
  const { user, guild, options } = interaction;
  const guildUser = guild && guild.members.cache.get(options.getUser('user')?.id ?? user.id);

  const embedProps = await getServerItem(guild.id, 'embeds');

  return (
    guildUser &&
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .addFields(
            {
              name: 'Joined Discord:',
              value: `**<t:${parseInt(`${guildUser.user.createdTimestamp / 1000}`, 10)}:R>**`,
              inline: true,
            },
            {
              name: 'Joined Server:',
              value: `**<t:${parseInt(`${guildUser.joinedTimestamp / 1000}`, 10)}:R>**`,
              inline: true,
            }
          )
          .setThumbnail(guildUser.user.avatarURL({ size: 2048 }))
          .setColor(embedProps.color)
          .setFooter({
            text: guildUser.user.tag,
            iconURL: guildUser.user.avatarURL({ size: 2048 }) ?? undefined,
          }),
      ],
      ephemeral: false,
    })
  );
};

user.create = {
  name: 'user',
  description: 'Get your account creation and server joined date',
  options: [
    {
      name: 'user',
      description: "get server member's data",
      required: false,
      type: ApplicationCommandOptionType.User,
    },
  ],
};
