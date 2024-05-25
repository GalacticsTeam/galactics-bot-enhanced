import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import { commandCreate } from './types';

export const diceRoll = (interaction: ChatInputCommandInteraction) => {
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
  description: 'Get random number between 1 to 6',
  options: [
    {
      name: 'max-number',
      description: 'max number allowed',
      required: false,
      type: ApplicationCommandOptionType.Number,
    },
  ],
} satisfies commandCreate;
