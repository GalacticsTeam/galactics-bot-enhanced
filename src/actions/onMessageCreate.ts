import { Message } from 'discord.js';

import { isAllowedFeature } from 'src/utils/helpers';
import { onPing } from '../actionHandlers';

export const onMessageCreate = <T extends boolean>(msg: Message<T>) => {
  if (msg.author.bot) return;

  const command = msg.content.split(' ');
  const commandName = command[0].toLowerCase();
  const args = command.slice(1);

  isAllowedFeature('ping') && onPing(msg);
};
