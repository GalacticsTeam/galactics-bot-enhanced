import { ApplicationCommandOptionType } from 'discord.js';

import type { Command } from './types';

export const morseTranslate: Command = (interaction) => {
  const { options } = interaction;

  const text = options.getString('text');
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
