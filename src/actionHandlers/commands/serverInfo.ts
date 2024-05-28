import { ChannelType, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

import { command } from './types';

export const serverInfo: command<'serverInfo'> = async (interaction: ChatInputCommandInteraction) => {
  const { guild } = interaction;

  const serverMembers = (await guild.members.fetch()).map((member) => member);
  const serverChannels = (await guild.channels.fetch()).map((channel) => channel);

  const usersCount = serverMembers.filter((member) => !member.user.bot).length;
  const botsCount = guild.memberCount - usersCount;

  const textChannelsCount = serverChannels.filter((channel) => channel.type === ChannelType.GuildText).length;
  const voiceChannelsCount = serverChannels.filter((channel) => channel.type === ChannelType.GuildVoice).length;

  const owner = (await guild.fetchOwner()).user.id;

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setAuthor({
          name: guild.name,
          iconURL: guild.iconURL({ size: 2048 }),
        })
        .addFields(
          { name: '🆔 Server ID:', value: guild.id, inline: true },
          {
            name: '📆 Created On:',
            value: `**<t:${parseInt(`${guild.createdAt.getTime() / 1000}`, 10)}:R>**`,
            inline: true,
          },
          { name: '👑 Founded by:', value: `<@${owner}>`, inline: true },
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
          { name: '✨ Boosts:', value: `${guild.premiumSubscriptionCount}`, inline: true }
        )
        .setColor('#1f0557')
        .setThumbnail(guild.iconURL({ size: 2048 })),
    ],
  });
};

serverInfo.serverInfoCreate = {
  name: 'server-info',
  description: "Get's Server's full info",
};
