import { ApplicationCommandOptionType } from 'discord.js';

import { LANGUAGES } from '@utils/const';
import { setUserSchemaItem } from '@db/UserSchema';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const preferredLanguage: Command = async (interaction) => {
  const { user, guild, options } = interaction;
  const t = await onUserTranslate(guild.id, user.id);

  const language = options.getString('language') as Language;

  await setUserSchemaItem(guild.id, user.id, 'language', () => language).then((language) => {
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
