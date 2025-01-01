import { ChannelType } from 'discord.js';

import { UserSchema } from '@db/index';
import { getChannel, isFeatureAllowed } from '@utils/helpers';
import type { StartOfFn } from '@actions/types';

export const onBirthday: StartOfFn = (client) => {
  const now = new Date();
  const today = `${now.getDate()}/${now.getMonth() + 1}`;

  client.guilds.cache.forEach(async (guild) => {
    if (!(await isFeatureAllowed('birthday', guild.id))) return;

    const birthdayUsers = await UserSchema.find({ birthday: { $regex: today } });
    if (!birthdayUsers.length) return;

    const chatChannel = await getChannel(guild, 'chat');
    if (!chatChannel) return;

    if (chatChannel.type !== ChannelType.GuildText) return;
    chatChannel.send(`🎉 Today is the birthday of ${birthdayUsers.map((user) => `<@${user.userId}>`).join(', ')} 🎉`);
  });
};
