import { Message } from 'discord.js';

import { isAllowedFeature } from '../utils/helpers';
import { onPing, onLinkSend } from '../actionHandlers';

export const onMessageCreate = async <T extends boolean>(msg: Message<T>) => {
  if (msg.author.bot) return;

  const command = msg.content.split(' ');
  const commandName = command[0].toLowerCase();
  const args = command.slice(1);

  (await isAllowedFeature('ping', msg.guild.id)) && onPing(msg);
  (await isAllowedFeature('blockLinks', msg.guild.id)) && onLinkSend(msg);
};
