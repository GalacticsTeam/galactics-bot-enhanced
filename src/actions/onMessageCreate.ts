import type { Message } from 'discord.js';

import { onPing, onLinkSend } from '../actionHandlers';

export const onMessageCreate = async (msg: Message<true>) => {
  if (msg.author.bot) return;

  const command = msg.content.split(' ');
  const commandName = command[0].toLowerCase();
  const args = command.slice(1);

  onPing(msg);

  onLinkSend(msg);
};
