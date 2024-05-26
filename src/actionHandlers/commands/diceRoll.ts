import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';

import { command } from './types';

export const diceRoll: command<'diceRoll'> = (interaction: ChatInputCommandInteraction) => {
  const { options } = interaction;

  const maxNumber = options.getNumber('max-number') || 0;

  if (maxNumber > 1000) return interaction.reply({ content: "Can't roll more than 1000 numbers", ephemeral: true });

  return interaction.reply({
    content: `${Math.floor(Math.random() * (maxNumber ? maxNumber : 6))}`,
    ephemeral: true,
  });
};

diceRoll.diceRollCreate = {
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
