import { ApplicationCommandOptionType } from 'discord.js';

import { onMorseTranslate, formatMorseCode } from '@actionHandlers';

import type { Command } from './types';

export const morseTranslate: Command = (interaction) => {
  const { options } = interaction;

  const text = options.getString('text', true);

  const translatedText = onMorseTranslate(text);

  if (!translatedText)
    return interaction.reply({ content: 'Invalid Text (alphabetical/numbers only)', ephemeral: true });

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
