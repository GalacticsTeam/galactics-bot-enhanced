import { ChannelType, EmbedBuilder } from 'discord.js';

import { getEmbed, getProperty } from '@utils';
import { onUserTranslate } from '@i18n/onTranslate';
import { getUserProperty } from '@db/index';
import { onFormatNumber } from '@handlers/onFormat';

import type { Command } from './types';

export const serverInfo: Command = async (interaction) => {
  const { guild } = interaction;
  const t = await onUserTranslate(interaction.user.id);
  const userLanguage = await getUserProperty(interaction.user.id, 'language');

  const formatNumber = onFormatNumber(userLanguage);

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
          { name: `🆔 ${t('serverInfo.fields.serverID')}:`, value: guild.id, inline: true },
          {
            name: `📅 ${t('serverInfo.fields.createdOn')}:`,
            value: `**<t:${parseInt(`${guild.createdAt.getTime() / 1000}`, 10)}:R>**`,
            inline: true,
          },
          { name: `👑 ${t('serverInfo.fields.foundedBy')}:`, value: `${owner}`, inline: true },
          {
            name: `👥 ${t('serverInfo.fields.members', { count: guild.memberCount })}:`,
            value: `${t('serverInfo.fields.members.users', { count: usersCount })} | ${t('serverInfo.fields.members.bots', { count: botsCount })}`,
            inline: true,
          },
          {
            name: `💬 ${t('serverInfo.fields.channels', { count: serverChannels.length })}:`,
            value: `${t('serverInfo.fields.channels.text', { count: voiceChannelsCount })} | ${t('serverInfo.fields.channels.voice', { count: textChannelsCount })}`,
            inline: true,
          },
          {
            name: `✨ ${t('serverInfo.fields.boosts')}:`,
            value: `${formatNumber(guild.premiumSubscriptionCount ?? 0)}`,
            inline: true,
          },
          { name: `🌍 ${t('serverInfo.fields.language')}:`, value: `${t(`name.${language}`)}`, inline: true }
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
