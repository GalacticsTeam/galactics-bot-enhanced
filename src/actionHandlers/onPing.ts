import type { Message } from 'discord.js';

import { isFeatureAllowed } from '@utils';

export const onPing = async (msg: Message<true>) => {
  if (!(await isFeatureAllowed('ping', msg.guild.id))) return;

  if (msg.content.toLowerCase() !== 'ping') return;

  msg.reply({ content: 'Pong!' });
};
