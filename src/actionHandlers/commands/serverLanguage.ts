import { ApplicationCommandOptionType } from 'discord.js';

import { LANGUAGES } from '@utils/const';
import { setServerSchemaItem } from '@db/ServerSchema';

import type { Command } from './types';

export const serverLanguage: Command = async (interaction) => {
  const { guild, options } = interaction;

  const language = options.getString('language') as Language;

  await setServerSchemaItem(guild.id, 'properties', (prev) => ({ ...prev, language })).then((properties) => {
    interaction.reply({ content: `Server language is now set to ${properties.language}`, ephemeral: true });
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
