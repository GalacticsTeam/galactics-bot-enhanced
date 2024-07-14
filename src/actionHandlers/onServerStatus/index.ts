import { ChannelType } from 'discord.js';

import { getServerItem } from '../../db';
import { getStatusCount } from './helpers';
import { isAllowedFeature } from '../../utils/helpers';
import { getDBItem, setDBItem } from '../../localdb';

import type { Status, StatusChannel } from './types';
import type { IntervalFn } from '../../actions/types';

export const onServerStatus: IntervalFn = (client) => {
  client.guilds.cache.forEach(async (server) => {
    if (!(await isAllowedFeature('serverStatus', server.id))) return;

    const statusCategoryId = (await getServerItem(server.id, 'channels')).statusCategory;
    const statusCategory = server.channels.cache.get(statusCategoryId);
    if (!statusCategoryId || !statusCategory) return;

    const statuses = (await getServerItem(server.id, 'properties')).statuses;
    const statusChannels = await getDBItem(server.id, 'statusChannels');

    const statusesWithChannels: StatusChannel[] = [];
    const statusesWithoutChannels: Status[] = [];

    statuses.forEach((status) => {
      const statusChannel = statusChannels.find((channel) => channel.id === status.id);

      if (statusChannel) return statusesWithChannels.push(statusChannel);

      statusesWithoutChannels.push(status);
    });

    statusChannels.filter((status) => statuses.find((localStatus) => localStatus.id === status.id));
    statusesWithChannels.filter((status) => !statuses.find((localStatus) => localStatus.id === status.id));

    statusesWithChannels.forEach(async (status) => {
      const statusChannel = server.channels.cache.get(status.channelId);
      const statusCount = await getStatusCount(server, status);
      if (!statusChannel || !statusCount) return statusesWithoutChannels.push(status);

      await statusChannel.setName(`｜${status.title}: ${statusCount}`);
    });

    statusesWithoutChannels.forEach(async (status) => {
      const statusCount = await getStatusCount(server, status);

      server.channels
        .create({
          name: `｜${status.title}: ${statusCount}`,
          type: ChannelType.GuildVoice,
          parent: statusCategory.id,
        })
        .then(async (channel) => {
          await setDBItem(server.id, 'statusChannels', (prevStatuses) => [
            ...prevStatuses,
            { ...status, channelId: channel.id },
          ]);
        });
    });
  });
};
