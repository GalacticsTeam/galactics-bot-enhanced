import { ChannelType, EmbedBuilder } from 'discord.js';

import { getEmbed, getProperty } from '@utils';

import type { Command } from './types';

export const serverInfo: Command = async (interaction) => {
  const { guild } = interaction;

  const color = await getEmbed(guild.id, 'color');

  const serverMembers = (await guild.members.fetch()).toJSON();
  const serverChannels = (await guild.channels.fetch()).toJSON();
  const language = await getProperty(guild.id, 'language');

  const usersCount = serverMembers.filter((member) => !member.user.bot).length;
  const botsCount = guild.memberCount - usersCount;

  const textChannelsCount = serverChannels.filter((channel) => channel?.type === ChannelType.GuildText).length;
  const voiceChannelsCount = serverChannels.filter((channel) => channel?.type === ChannelType.GuildVoice).length;

  const owner = await guild.fetchOwner();

  interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setAuthor({
          name: guild.name,
          iconURL: guild.iconURL({ size: 2048 }) ?? undefined,
        })
        .addFields(
          { name: '🆔 Server ID:', value: guild.id, inline: true },
          {
            name: '📆 Created On:',
            value: `**<t:${parseInt(`${guild.createdAt.getTime() / 1000}`, 10)}:R>**`,
            inline: true,
          },
          { name: '👑 Founded by:', value: `${owner}`, inline: true },
          {
            name: `👥 Members (${guild.memberCount}):`,
            value: `${usersCount} Users | ${botsCount} Bots`,
            inline: true,
          },
          {
            name: `💬 Channels (${serverChannels.length}):`,
            value: `${textChannelsCount} Text | ${voiceChannelsCount} Voice`,
            inline: true,
          },
          { name: '✨ Boosts:', value: `${guild.premiumSubscriptionCount}`, inline: true },
          { name: '🌍 Language:', value: language, inline: true }
        )
        .setColor(color)
        .setThumbnail(guild.iconURL({ size: 2048 })),
    ],
  });
};

serverInfo.create = {
  name: 'server-info',
  description: "Get's Server's full info",
};
