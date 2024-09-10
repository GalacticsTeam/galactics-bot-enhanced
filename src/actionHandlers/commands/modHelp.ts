import { ApplicationCommandOptionType, EmbedBuilder, TextChannel } from 'discord.js';

import { getChannel, getEmbed, getProperty } from '../../utils/helpers';

import type { Command } from './types';

export const modHelp: Command = async (interaction) => {
  const { guild, user, channel, options } = interaction;

  const modLogsChannel = await getChannel(guild, 'modLogs');
  if (!modLogsChannel) return interaction.reply({ content: 'Invalid ModLogs', ephemeral: true });

  const helpMessage = await getProperty(guild.id, 'modHelpMessage');
  const embedColor = await getEmbed(guild.id, 'color');

  const problem = options.getString('problem');
  const modLogChannel = guild.channels.cache.get(modLogsChannel.id) as TextChannel;

  const fields = [{ name: 'Channel', value: `${channel}` }];
  if (problem) fields.unshift({ name: 'Problem', value: problem });

  modLogChannel
    .send({
      content: 'Help needed!',
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
