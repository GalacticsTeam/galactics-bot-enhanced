import { ApplicationCommandOptionType } from 'discord.js';

import type { Command } from './types';

export const diceRoll: Command = (interaction) => {
  const { options } = interaction;

  const maxNumber = options.getInteger('limit') ?? 6;

  if (maxNumber > 1000 || maxNumber < 1)
    return interaction.reply({ content: 'Number must be between 1 and 1000', ephemeral: true });

  interaction.reply({
    content: `${Math.floor(Math.random() * maxNumber)}`,
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
      type: ApplicationCommandOptionType.Integer,
    },
  ],
};
