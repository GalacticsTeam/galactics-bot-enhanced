import { ApplicationCommandOptionType, EmbedBuilder, TextChannel, type APIEmbedField } from 'discord.js';

import { getChannel, getEmbed, getProperty } from '@utils';
import { onServerTranslate, onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const modHelp: Command = async (interaction) => {
  const { guild, user, channel, options } = interaction;

  const tGuild = await onServerTranslate(guild.id);
  const tUser = await onUserTranslate(guild.id, user.id);

  const modLogsChannel = await getChannel(guild, 'modLogs');
  if (!modLogsChannel) return interaction.reply({ content: tUser('error.channelIsNotSet'), ephemeral: true });

  const helpMessage = await getProperty(guild.id, 'modHelpMessage');
  const embedColor = await getEmbed(guild.id, 'color');

  const problem = options.getString('problem');
  const modLogChannel = guild.channels.cache.get(modLogsChannel.id) as TextChannel;

  const fields: APIEmbedField[] = [{ name: tGuild('name.channel'), value: `${channel}` }];
  if (problem) fields.unshift({ name: tGuild('modHelp.fields.problem'), value: problem });

  modLogChannel
    .send({
      content: tGuild('name.galactics', { user: user.displayName }),
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: user.displayName, iconURL: user.displayAvatarURL({ extension: 'png', size: 4096 }) })
          .setFooter({ text: guild.name, iconURL: guild.iconURL({ extension: 'png', size: 4096 }) ?? undefined })
          .setTimestamp(new Date())
          .addFields(...fields)
          .setColor(embedColor),
      ],
    })
    .then(() => {
      interaction.reply({
        content: helpMessage,
        ephemeral: true,
      });
    });
};

modHelp.create = {
  name: 'mod-help',
  description: 'Ask a moderator for help',
  options: [
    {
      name: 'problem',
      description: "The problem you're facing",
      type: ApplicationCommandOptionType.String,
    },
  ],
};
