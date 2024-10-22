import type { Message } from 'discord.js';

import { isFeatureAllowed } from '@utils';
import { onUserTranslate } from '@i18n/onTranslate';

export const onPing = async (msg: Message<true>) => {
  if (!(await isFeatureAllowed('ping', msg.guild.id))) return;

  const t = await onUserTranslate(msg.guild.id, msg.author.id);

  if (msg.content.toLowerCase() !== t('name.ping')) return;

  msg.reply({ content: t('name.pong') });
};
