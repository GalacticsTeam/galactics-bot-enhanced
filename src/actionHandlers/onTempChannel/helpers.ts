import { ActivityType, ChannelType, Guild, GuildMember } from 'discord.js';

import { setLocalDBItem } from '@localdb';

export const createChannel = async (guild: Guild, categoryId: string, member: GuildMember) => {
  const activityName = getUserActivity(member);

  const channel = await guild.channels.create({
    name: activityName,
    type: ChannelType.GuildVoice,
    parent: categoryId,
  });

  await setLocalDBItem(guild.id, 'tempChannels', (prevTempChannels) => [
    ...prevTempChannels,
    { channelId: channel.id, creatorId: member.id },
  ]);

  channel.lockPermissions();

  member.voice.setChannel(channel).catch();
};

export const getUserActivity = (member: GuildMember) => {
  const activities = member.presence?.activities?.filter(
    (activity) =>
      activity.type !== ActivityType.Custom &&
      // TODO: Replace with the correct enum type when it get's released
      activity.name !== 'Hang Status'
  );

  if (!activities?.length) return `｜ Chatting`;

  return `｜ ${activities[0].name}`;
};
