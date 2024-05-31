import { ApplicationCommandOptionType } from 'discord.js';

import type { Command } from './types';

export const diceRoll: Command = (interaction) => {
  const { options } = interaction;
  const maxNumber = options.getNumber('limit') ?? null;

  if (maxNumber && (maxNumber > 1000 || maxNumber < 1))
    return interaction.reply({ content: 'Invalid number', ephemeral: true });

  return interaction.reply({
    content: `${Math.floor(Math.random() * (maxNumber ?? 6))}`,
    ephemeral: true,
  });
};

diceRoll.create = {
  name: 'roll-dice',
  description: 'Roll the dice',
  options: [
    {
      name: 'limit',
      description: 'dice roll upper limit',
      required: false,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
