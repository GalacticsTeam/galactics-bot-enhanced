import { ChannelType } from 'discord.js';

import { getServerSchemaItem } from '../../db';
import { setLocalDBItem } from '../../localdb';
import { createChannel } from './helpers';
import { isFeatureAllowed } from '../../utils/helpers';

import type { IntervalFn } from '../../actions/types';

export const onEveryTempChannel: IntervalFn = (client) => {
  client.guilds.cache.forEach(async (server) => {
    if (!(await isFeatureAllowed('tempChannels', server.id))) return;

    const {
      tempChannelCategory: categoryId,
      tempChannelGenerator: generatorId,
      tempChannelCommands: commandsId,
    } = await getServerSchemaItem(server.id, 'channels');

    const category = server.channels.cache.get(categoryId);
    const commandsChannel = server.channels.cache.get(commandsId);
    const generatorChannel = server.channels.cache.get(generatorId);

    if (category?.type !== ChannelType.GuildCategory || !commandsChannel || !generatorChannel) return;

    category.children.cache.forEach(async (channel) => {
      if (channel.id === generatorId && channel.members.size > 0) {
        channel.members.forEach((member) => {
          createChannel(server, categoryId, member);
        });
      }

      if (channel.id === commandsId || channel.id === generatorId) return;

      if (channel.members.size === 0) {
        await channel.delete().catch(console.log);

        await setLocalDBItem(server.id, 'tempChannels', (prevTempChannels) =>
          prevTempChannels.filter((tempChannel) => tempChannel.channelId !== channel.id)
        );
      }
    });
  });
};
