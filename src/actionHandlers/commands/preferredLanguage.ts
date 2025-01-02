import { ApplicationCommandOptionType } from 'discord.js';

import { LANGUAGES } from '@utils/const';
import { setUserProperty } from '@db/UserSchema';
import { onTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const preferredLanguage: Command = async (interaction) => {
  const { user, options } = interaction;

  const language = options.getString('language') as Language;
  const t = onTranslate(language);

  await setUserProperty(user.id, 'language', () => language).then((language) => {
    interaction.reply({ content: t('preferredLanguage.set', { language: t(`name.${language}`) }), ephemeral: true });
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
