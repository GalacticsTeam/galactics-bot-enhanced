import { GuildMember } from 'discord.js';
import { welcome } from '../actionHandlers/welcome';

export const onGuildMemberAdd = (member: GuildMember) => {
  welcome(member);
};
