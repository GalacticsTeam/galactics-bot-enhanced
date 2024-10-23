import { ApplicationCommandOptionType } from 'discord.js';

import { onMorseTranslate, formatMorseCode } from '@actionHandlers';
import { onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const morseTranslate: Command = async (interaction) => {
  const { options } = interaction;
  const t = await onUserTranslate(interaction.guildId, interaction.user.id);

  const text = options.getString('text', true);

  const translatedText = onMorseTranslate(text);

  if (!translatedText)
    return interaction.reply({ content: t('error.invalidText.alphabetic-numeric'), ephemeral: true });

  interaction.reply({ content: formatMorseCode(translatedText), ephemeral: true });
};

morseTranslate.create = {
  name: 'morse-translate',
  description: 'Translate text from English to Morse code',
  options: [
    {
      name: 'text',
      description: 'The text to translate',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};
