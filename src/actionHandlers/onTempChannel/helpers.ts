import { ActivityType, ChannelType, Guild, GuildMember } from 'discord.js';

import { setDBItem } from '../../localdb';

export const createChannel = async (guild: Guild, categoryId: string, member: GuildMember, activityName: string) => {
  const channel = await guild.channels.create({
    name: activityName,
    type: ChannelType.GuildVoice,
    parent: categoryId,
  });

  await setDBItem(guild.id, 'tempChannels', (prevTempChannels) => [
    ...prevTempChannels,
    { channelId: channel.id, creatorId: member.id },
  ]);

  channel.lockPermissions();

  member.voice.setChannel(channel);
};

export const getUserActivity = (member: GuildMember) => {
  const activities = member.presence.activities;
  const isCustomStatus = activities?.[0].type === ActivityType.Custom;
  const isCustomStatusOnly = activities.length === 1 && isCustomStatus;

  if (!activities.length || isCustomStatusOnly) return `｜ Talking`;

  if (activities.length > 1 && isCustomStatus) return `｜ ${activities[1].name}`;

  return `｜ ${activities[0].name}`;
};
