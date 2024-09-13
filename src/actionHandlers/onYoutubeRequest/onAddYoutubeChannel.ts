import { youtube } from '.';
import { addYoutubeChannelSchema } from '../../db';

import type { YoutubeChannel } from '../../db';

export const onAddYoutubeChannel = async (channelId: string, serverId: string) => {
  try {
    const response = await youtube.get('/channels', {
      params: {
        part: 'snippet,statistics',
        id: channelId,
      },
    });

    const newChannel: YoutubeChannel = {
      channelId: String(channelId),
      channelName: String(response.data.items[0].snippet.title),
      subscriberCount: Number(response.data.items[0].statistics.subscriberCount),
      videoCount: Number(response.data.items[0].statistics.videoCount),
      videos: [],
    };

    return addYoutubeChannelSchema(channelId, serverId, newChannel);
  } catch (error) {
    console.error('Error fetching data from YouTube API', error);
    return false;
  }
};
