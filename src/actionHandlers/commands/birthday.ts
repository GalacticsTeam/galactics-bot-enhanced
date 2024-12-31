import { ApplicationCommandOptionType } from 'discord.js';

import { getUserProperty, setUserProperty } from '@db/index';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const birthday: Command = async (interaction) => {
  const action = interaction.options.getSubcommand() as 'set' | 'show';
  const tUser = await onUserTranslate(interaction.user.id);

  switch (action) {
    case 'set':
      const date = interaction.options.getString('date', true);
      const birthday = new Date(date);
      if (isNaN(birthday.getTime()))
        return interaction.reply({ content: tUser('birthday.invalidDate'), ephemeral: true });

      await setUserProperty(interaction.user.id, 'birthday', () => birthday.toISOString());

      return interaction.reply({
        content: tUser('birthday.set', { date: birthday.toLocaleDateString() }),
        ephemeral: true,
      });

    case 'show':
      const user = interaction.options.getUser('user') ?? interaction.user;
      const userBirthday = await getUserProperty(user.id, 'birthday');

      return interaction.reply({
        content: userBirthday
          ? tUser('birthday.show', { user: user.toString(), date: new Date(userBirthday).toLocaleDateString() })
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
          description: 'The date of your birthday: DD/MM/YYYY',
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
