import { ChannelType } from 'discord.js';

import { UserSchema } from '@db/index';
import { getChannel, isFeatureAllowed } from '@utils/helpers';
import type { StartOfFn } from '@actions/types';
import { onServerTranslate } from '@i18n/onTranslate';

export const onBirthday: StartOfFn = (client, now) => {
  const today = `${now.getMonth() + 1}/${now.getDate()}`;

  client.guilds.cache.forEach(async (guild) => {
    if (!(await isFeatureAllowed('birthday', guild.id))) return;

    const birthdayUsers = await UserSchema.find({ birthday: { $regex: today } });
    if (!birthdayUsers.length) return;

    const t = await onServerTranslate(guild.id);
    const chatChannel = await getChannel(guild, 'chat');
    if (!chatChannel) return;

    if (chatChannel.type !== ChannelType.GuildText) return;
    chatChannel.send(
      t('birthday.happyBirthday', {
        user: birthdayUsers.map((user) => `<@${user.userId}>`).join(', '),
      })
    );
  });
};
