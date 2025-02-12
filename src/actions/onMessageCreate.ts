import type { Message } from 'discord.js';

import { onPing, onLinkSend } from '@actionHandlers';
import { onTranslate } from '@i18n/onTranslate';

export const onMessageCreate = async (msg: Message<true>) => {
  if (msg.author.bot) return;

  // const command = msg.content.split(' ');
  // const commandName = command[0].toLowerCase();
  // const args = command.slice(1);
  const t = onTranslate('en');

  msg.reply(
    t('welcome.message', {
      user: '<@' + msg.author.id + '>',
      rolesChannel: '<#' + msg.guild?.roles.cache.first()?.id + '>',
      membersCount: msg.guild?.memberCount,
    })
  );

  onPing(msg);

  onLinkSend(msg);
};
