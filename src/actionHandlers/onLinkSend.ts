import type { Message } from 'discord.js';

import { isFeatureAllowed } from '../utils/helpers';

const urlRegex =
  /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.com))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/;

const isGifOrSticker = (part: string) => part.includes('gif') || part.includes('sticker');

export const onLinkSend = async (msg: Message) => {
  if (!(await isFeatureAllowed('blockLinks', msg.guild.id))) return;

  const isUrl = msg.content.split(' ').some((part) => urlRegex.test(part) && !isGifOrSticker(part));

  if (!isUrl) return;

  msg.reply('it is forbidden to send links here!').then((repliedMsg) => {
    msg.delete();
    setTimeout(() => repliedMsg.delete(), 5000);
  });
};
