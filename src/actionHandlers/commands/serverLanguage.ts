import { ApplicationCommandOptionType } from 'discord.js';

import { LANGUAGES } from '@utils/const';
import { setServerProperty } from '@db/ServerSchema';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const serverLanguage: Command = async (interaction) => {
  const { guild, options } = interaction;
  const t = await onUserTranslate(guild.id, interaction.user.id);

  const language = options.getString('language') as Language;

  await setServerProperty(guild.id, 'properties', (prev) => ({ ...prev, language })).then((properties) => {
    interaction.reply({
      content: t('serverLanguage.set', { language: t(`name.${properties.language}`) }),
      ephemeral: true,
    });
  });
};

serverLanguage.create = {
  name: 'server-language',
  description: 'Set the language of the server',
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
