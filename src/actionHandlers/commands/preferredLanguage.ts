import { ApplicationCommandOptionType } from 'discord.js';

import { LANGUAGES } from '@utils/const';
import { setUserSchemaItem } from '@db/UserSchema';

import type { Command } from './types';

export const preferredLanguage: Command = async (interaction) => {
  const { user, guild, options } = interaction;

  const language = options.getString('language') as Language;

  await setUserSchemaItem(guild.id, user.id, 'language', () => language).then((language) => {
    interaction.reply({ content: `Your preferred language is now set to ${language}`, ephemeral: true });
  });
};

preferredLanguage.create = {
  name: 'preferred-language',
  description: 'Set your preferred language',
  options: [
    {
      name: 'language',
      description: 'The language you prefer',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: LANGUAGES.map((language) => ({
        name: language,
        value: language,
      })),
    },
  ],
};
