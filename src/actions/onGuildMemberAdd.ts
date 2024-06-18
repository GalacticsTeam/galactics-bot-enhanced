import { GuildMember } from 'discord.js';

import { onWelcome } from '../actionHandlers/onWelcome';
import { getUserSchema } from '../db';
import { isAllowedFeature } from '../utils/helpers';

export const onGuildMemberAdd = async (member: GuildMember) => {
  const memberSchema = await getUserSchema(member.guild.id, member.id);

  (await isAllowedFeature('welcome', member.guild.id)) && onWelcome(member);
};
