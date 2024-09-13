import { Schema } from 'mongoose';
import { getServerSchema } from './ServerSchema';

export interface YoutubeChannel {
  channelId: string;
  channelName: string;
  subscriberCount: number;
  videoCount: number;
  videos: string[];
}

export const YoutubeChannelsSchema: Schema<YoutubeChannel> = new Schema({
  channelId: String,
  channelName: String,
  subscriberCount: Number,
  videoCount: Number,
  videos: Array<string>,
});

export const checkYoutubeChannelSchema = async (channelId: string, serverId: string) => {
  const server = await getServerSchema(serverId);
  const youtubeChannels = server.properties.youtubeChannels;

  return youtubeChannels.some((youtubeChannel) => youtubeChannel.channelId === channelId);
};

export const updateYoutubeChannelSchema = async (
  channelId: string,
  serverId: string,
  updateCallBack: (youtubeChannel: YoutubeChannel) => YoutubeChannel
) => {
  const server = await getServerSchema(serverId);
  const youtubeChannels = server.properties.youtubeChannels;

  try {
    return youtubeChannels.some((youtubeChannel, index) => {
      if (youtubeChannel.channelId === channelId) {
        const updatedChannel = updateCallBack(youtubeChannel);
        youtubeChannels[index] = updatedChannel;
        server.save();
        return true;
      }
    });
  } catch (error) {
    console.error(`Failed to update Youtube channel: ${channelId}`, error);
    return false;
  }
};

export const addYoutubeChannelSchema = async (channelId: string, serverId: string, newChannel: YoutubeChannel) => {
  const server = await getServerSchema(serverId);
  const youtubeChannels = server.properties.youtubeChannels;

  if (await checkYoutubeChannelSchema(channelId, serverId))
    updateYoutubeChannelSchema(channelId, serverId, () => newChannel);
  else youtubeChannels.push(newChannel);

  server.save();
  return true;
};
