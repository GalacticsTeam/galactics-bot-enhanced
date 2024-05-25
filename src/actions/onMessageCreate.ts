import { Message } from 'discord.js';

import { isDevMode } from '../utils/botConfig';

export const onMessageCreate = <T extends boolean>(msg: Message<T>) => {
  if (msg.author.bot) return;

  if (msg.content.toLowerCase() === 'ping') {
    msg.reply({
      content: 'Pong!',
    });
  }
};
