import { GuildMember, PartialGuildMember } from 'discord.js';

import { onRoleOrganize } from '../actionHandlers';
import { isAllowedFeature } from '../utils/helpers';

export const onGuildMemberUpdate = async (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
  const member = newMember ?? oldMember;

  (await isAllowedFeature('roleOrganize', member.guild.id)) && onRoleOrganize(oldMember, newMember);
};
