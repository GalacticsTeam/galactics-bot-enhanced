import type { Message } from 'discord.js';

import { isFeatureAllowed } from '../utils/helpers';

export const onPing = async (msg: Message) => {
  if (!(await isFeatureAllowed('ping', msg.guild.id))) return;

  msg.content.toLowerCase() === 'ping' && msg.reply({ content: 'Pong!' });
};
