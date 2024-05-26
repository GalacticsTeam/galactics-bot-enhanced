import { Message } from 'discord.js';

import { botConfig } from '../utils';

export const onPing = (msg: Message) => {
  if (!botConfig.allowedFeatures.ping) return;

  msg.reply({ content: 'Pong!' });
};
