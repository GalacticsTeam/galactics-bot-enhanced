import { GuildMember } from 'discord.js';

import { getUserSchema } from '../db';

export const onGuildMemberAdd = async (member: GuildMember) => {
  const memberSchema = await getUserSchema(member.guild.id, member.id);
};
