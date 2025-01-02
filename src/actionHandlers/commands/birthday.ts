import { ApplicationCommandOptionType } from 'discord.js';

import { getUserProperty, setUserProperty } from '@db/index';
import { onUserTranslate } from '@i18n/onTranslate';
import { onFormatBirthday } from '@actionHandlers/onBirthday/helpers';
import { birthdayFormatString } from '@actionHandlers/onBirthday/const';

import type { Command } from './types';

export const birthday: Command = async (interaction) => {
  const action = interaction.options.getSubcommand() as 'set' | 'show';
  const tUser = await onUserTranslate(interaction.user.id);
  const formatBirthday = onFormatBirthday();

  switch (action) {
    case 'set':
      const date = interaction.options.getString('date', true);
      const now = new Date(new Date().toLocaleString('en-EG', { timeZone: 'Africa/Cairo' }));
      const birthday = new Date(date);
      if (
        isNaN(birthday.getTime()) ||
        date.includes('/') ||
        now.getTime() > birthday.getTime() ||
        date.split('-')[0].length > 4 ||
        date.split('-')[0].length < 2
      )
        return interaction.reply({ content: tUser('birthday.invalidDate'), ephemeral: true });

      await setUserProperty(interaction.user.id, 'birthday', () =>
        new Date(birthday.toLocaleString('en-EG', { timeZone: 'Africa/Cairo' })).toISOString()
      );

      return interaction.reply({
        content: tUser('birthday.set', { date: formatBirthday(birthday) }),
        ephemeral: true,
      });

    case 'show':
      const user = interaction.options.getUser('user') ?? interaction.user;
      const userBirthday = await getUserProperty(user.id, 'birthday');

      return interaction.reply({
        content: userBirthday
          ? tUser('birthday.show', {
              user: user.toString(),
              date: `**<t:${parseInt(`${new Date(userBirthday).getTime() / 1000}`, 10)}:R>**`,
            })
          : tUser('birthday.notSetForUser', { user: user.toString() }),
        ephemeral: true,
      });
  }
};

birthday.create = {
  name: 'birthday',
  description: 'Manage your birthday',
  options: [
    {
      name: 'set',
      description: 'Set your birthday',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'date',
          description: `The date of your birthday: ${birthdayFormatString.toLowerCase()}`,
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'show',
      description: 'Show your birthday',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'Select a user',
          type: ApplicationCommandOptionType.User,
        },
      ],
    },
  ],
};
