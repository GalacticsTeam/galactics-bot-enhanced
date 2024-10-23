import { ActivityType, ChannelType, Guild, GuildMember } from 'discord.js';

import { setLocalDBItem } from '@localdb';
import { onUserTranslate } from '@i18n/onTranslate';

export const createChannel = async (guild: Guild, categoryId: string, member: GuildMember) => {
  const activityName = await getUserActivity(member);

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

export const getUserActivity = async (member: GuildMember) => {
  const t = await onUserTranslate(member.guild.id, member.id);

  const activities = member.presence?.activities?.filter(
    (activity) =>
      activity.type !== ActivityType.Custom &&
      // TODO: Replace with the correct enum type when it get's released
      activity.name !== 'Hang Status'
  );

  if (!activities?.length) return `｜ ${t('name.chatting')}`;

  return `｜ ${activities[0].name}`;
};
