import { GuildMember } from 'discord.js';

import { onWelcome } from '../actionHandlers/welcome';

export const onGuildMemberAdd = (member: GuildMember) => {
  onWelcome(member);
};
