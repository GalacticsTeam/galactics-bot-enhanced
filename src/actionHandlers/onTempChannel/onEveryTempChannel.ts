import { CategoryChannel } from 'discord.js';

import { getServerItem } from '../../db';
import { setDBItem } from '../../localdb';

import type { IntervalFn } from '../../actions/types';

export const onEveryTempChannel: IntervalFn = (client) => {
  client.guilds.cache.forEach(async (server) => {
    const channels = await getServerItem(server.id, 'channels');
    const categoryId = channels.tempChannelCategory;
    const commandsId = channels.tempChannelCommands;
    const generatorId = channels.tempChannelGenerator;

    const category = server.channels.cache.get(categoryId) as CategoryChannel;

    if (!category || !commandsId || !generatorId) return;

    category.children.cache.forEach(async (channel) => {
      if (channel.id === commandsId || channel.id === generatorId) return;

      if (channel.members.size === 0) {
        await channel.delete();

        await setDBItem(server.id, 'tempChannels', (prevTempChannels) =>
          prevTempChannels.filter((tempChannel) => tempChannel.channelId !== channel.id)
        );
      }
    });
  });
};
