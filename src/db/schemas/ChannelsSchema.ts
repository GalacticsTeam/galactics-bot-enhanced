import configs from '@configs';
import { createSchema } from '@db/helpers';
import type { Channels } from '@types';

const channels = configs.channels.reduce(
  (acc, channel) => {
    acc[channel] = String;
    return acc;
  },
  {} as Record<Channel, StringConstructor>
);

export const ChannelsSchema = createSchema<Channels>(channels);
