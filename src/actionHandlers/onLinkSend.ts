import { Message } from 'discord.js';

import { botConfig } from 'src/utils';

const urlRegex =
  /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.com))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/;

export const onLinkSend = (msg: Message) => {
  if (!botConfig.allowedFeatures.blockLinks) return;

  const links = msg.content.match(urlRegex);
  if (links === null) return;

  links.forEach((link) => {
    if (link.includes('gif')) return;

    return msg.reply('it is forbidden to send links here!').then((repliedMsg) => {
      msg.delete();

      setTimeout(() => repliedMsg.delete(), 5000);
    });
  });
};
