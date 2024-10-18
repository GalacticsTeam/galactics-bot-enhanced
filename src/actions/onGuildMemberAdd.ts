import type { GuildMember } from 'discord.js';

import { onWelcome } from '@actionHandlers';

export const onGuildMemberAdd = async (member: GuildMember) => {
  onWelcome(member);
};
