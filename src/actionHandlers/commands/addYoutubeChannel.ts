import { ApplicationCommandOptionType } from 'discord.js';

import { onAddYoutubeChannel } from '../onYoutubeRequest';

import type { Command } from './types';

export const addYoutubeChannel: Command = (interaction) => {
  const { options, guildId } = interaction;

  const channelId = options.getString('id', true);
  const serverId = guildId;

  if (!onAddYoutubeChannel(channelId, serverId))
    interaction.reply({
      content: 'An error occurred. Please check the developer console for more details.',
      ephemeral: true,
    });

  interaction.reply({ content: 'Channel was successfully added or updated.', ephemeral: true });
};

addYoutubeChannel.create = {
  name: 'add-youtube-channel',
  description: 'Add or Update Youtube channel',
  options: [
    {
      name: 'id',
      description: 'The channel id',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};
