import { ChannelType } from 'discord.js';

import type { IntervalFn } from '@actions/types';
import { getLocalDBItem, setLocalDBItem } from '@localdb';
import { getChannel, getProperty, isFeatureAllowed } from '@utils';

import { getStatusCount } from './helpers';
import type { Status, StatusChannel } from './types';

export const onServerStatus: IntervalFn = (client) => {
  client.guilds.cache.forEach(async (server) => {
    if (!(await isFeatureAllowed('serverStatus', server.id))) return;

    const statusCategory = await getChannel(server, 'statusCategory');
    if (!statusCategory) return;

    const statuses = await getProperty(server.id, 'statuses');
    const statusChannels = await getLocalDBItem(server.id, 'statusChannels');

    const statusesWithChannels: StatusChannel[] = [];
    const statusesWithoutChannels: Status[] = [];

    statuses.forEach((status) => {
      const statusChannel = statusChannels.find((channel) => channel.id === status.id);

      if (statusChannel) return statusesWithChannels.push(statusChannel);

      statusesWithoutChannels.push(status);
    });

    statusesWithChannels.forEach(async (status) => {
      const statusChannel = server.channels.cache.get(status.channelId);
      const statusCount = await getStatusCount(server, status);
      if (!statusChannel || (!statusCount && statusCount !== 0)) return statusesWithoutChannels.push(status);

      await statusChannel.setName(`｜${status.title}: ${statusCount}`);
    });

    setTimeout(
      () =>
        statusesWithoutChannels.forEach(async (status) => {
          const statusCount = await getStatusCount(server, status);

          const statusInvalidChannel = (await getLocalDBItem(server.id, 'statusChannels')).find(
            (statusCHannel) => statusCHannel.id === status.id
          );
          if (!statusInvalidChannel) return;

          const channel = server.channels.cache.get(statusInvalidChannel?.channelId);

          if (!channel)
            await setLocalDBItem(server.id, 'statusChannels', (prevStatuses) =>
              prevStatuses.filter((statusChannel) => statusChannel.id !== status.id)
            );

          server.channels
            .create({
              name: `｜${status.title}: ${statusCount}`,
              type: ChannelType.GuildVoice,
              parent: statusCategory.id,
            })
            .then(async (channel) => {
              await setLocalDBItem(server.id, 'statusChannels', (prevStatuses) => [
                ...prevStatuses,
                { ...status, channelId: channel.id },
              ]);
            });
        }),
      1000
    );
  });
};

export * from './removeStatus';
export * from './addStatus';
export * from './helpers';
