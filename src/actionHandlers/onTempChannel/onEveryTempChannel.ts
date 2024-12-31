import { ChannelType } from 'discord.js';

import { isFeatureAllowed } from '@utils';
import { getServerProperty } from '@db';
import type { IntervalFn } from '@actions/types';

import { createChannel } from './helpers';

export const onEveryTempChannel: IntervalFn = (client) => {
  client.guilds.cache.forEach(async (server) => {
    if (!(await isFeatureAllowed('tempChannels', server.id))) return;

    const {
      tempChannelCategory: categoryId,
      tempChannelGenerator: generatorId,
      tempChannelCommands: commandsId,
    } = await getServerProperty(server.id, 'channels');

    if (!categoryId || !generatorId || !commandsId) return;

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
    });
  });
};
