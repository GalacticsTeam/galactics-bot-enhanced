import { ApplicationCommandOptionType, EmbedBuilder, TextChannel } from 'discord.js';

import { getServerItem } from '../../db';

import type { Command } from './types';

export const modHelp: Command = async (interaction) => {
  const { guild, user, channel, options } = interaction;

  const serverChannels = await getServerItem(guild.id, 'channels');
  if (!serverChannels.modLogs)
    return interaction.reply({ content: 'Mod logs are disabled on this server.', ephemeral: true });

  const serverProperties = await getServerItem(guild.id, 'properties');
  const serverEmbeds = await getServerItem(guild.id, 'embeds');

  const problem = options.getString('problem');
  const modLog = guild.channels.cache.get(serverChannels.modLogs) as TextChannel;

  const fields = [{ name: 'Channel', value: `${channel}` }];
  if (problem) fields.unshift({ name: 'Problem', value: problem });

  modLog
    .send({
      content: 'Help needed!',
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: user.displayName, iconURL: user.displayAvatarURL({ extension: 'png', size: 4096 }) })
          .setFooter({ text: guild.name, iconURL: guild.iconURL({ extension: 'png', size: 4096 }) })
          .setTimestamp(new Date())
          .addFields(...fields)
          .setColor(serverEmbeds.color),
      ],
    })
    .then(() => {
      interaction.reply({
        content: serverProperties.modHelpMessage,
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
