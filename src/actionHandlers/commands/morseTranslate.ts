import { ApplicationCommandOptionType } from 'discord.js';

import type { Command } from './types';

export const morseTranslate: Command = (interaction) => {
  const { options, user, guild } = interaction;

  const text = options.getString('text');

  interaction.reply({ content: text, ephemeral: true });
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
