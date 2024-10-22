import type { GuildMember, Message } from 'discord.js';

import { onUserTranslate } from '@i18n/onTranslate';
import { getRole, getRolesWithoutSeparators, isFeatureAllowed } from '@utils';

const urlRegex =
  /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.com))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))?/;

const isGifOrSticker = (part: string) => part.includes('gif') || part.includes('sticker');
const isAuthorized = async (member: GuildMember) => {
  const lowestAuthorizedRole = await getRole(member.guild, 'lowestAuthorizedRole');
  if (!lowestAuthorizedRole) return false;

  const memberRolePosition = getRolesWithoutSeparators(member.roles.cache.toJSON())[0].position;
  const lowestRolePosition = lowestAuthorizedRole.position;

  return memberRolePosition >= lowestRolePosition;
};

export const onLinkSend = async (msg: Message<true>) => {
  const t = await onUserTranslate(msg.guild.id, msg.author.id);

  if (!(await isFeatureAllowed('blockLinks', msg.guild.id)) || (await isAuthorized(msg.member!))) return;

  const isUrl = msg.content.split(' ').some((part) => urlRegex.test(part) && !isGifOrSticker(part));
  if (!isUrl) return;

  msg.reply(t('linkBlocker.blocked')).then((repliedMsg) => {
    msg.delete();
    setTimeout(() => repliedMsg.delete(), 5000);
  });
};
