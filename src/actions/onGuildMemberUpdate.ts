import type { GuildMember, PartialGuildMember } from 'discord.js';

import { onRoleOrganize } from '../actionHandlers';

export const onGuildMemberUpdate = async (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
  onRoleOrganize(oldMember, newMember);
};
