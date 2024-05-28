import { Message } from 'discord.js';

const urlRegex =
  /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.com))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/;

const isGifOrSticker = (part: string) => part.includes('gif') || part.includes('sticker');

export const onLinkSend = (msg: Message) => {
  const isUrl = msg.content.split(' ').some((part) => urlRegex.test(part) && !isGifOrSticker(part));

  if (!isUrl) return;

  msg.reply('it is forbidden to send links here!').then((repliedMsg) => {
    msg.delete();
    setTimeout(() => repliedMsg.delete(), 5000);
  });
};
