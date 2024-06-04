import { GuildMember } from 'discord.js';

import { onWelcome } from '../actionHandlers/onWelcome';

export const onGuildMemberAdd = (member: GuildMember) => {
  onWelcome(member);
};
