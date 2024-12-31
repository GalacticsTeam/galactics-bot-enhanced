import { ApplicationCommandOptionType } from 'discord.js';

import { onUserTranslate } from '@i18n/onTranslate';
import { onFormatNumber } from '@handlers/onFormat';
import { getUserProperty } from '@db/index';

import type { Command } from './types';

export const diceRoll: Command = async (interaction) => {
  const { options } = interaction;
  const userLanguage = await getUserProperty(interaction.guildId, interaction.user.id, 'language');

  const t = await onUserTranslate(interaction.guildId, interaction.user.id);
  const formatNumber = onFormatNumber(userLanguage);

  const maxNumber = options.getInteger('limit') ?? 6;

  if (maxNumber > 1000 || maxNumber < 1)
    return interaction.reply({ content: t('error.numberMustBeBetween', { min: 1, max: 1000 }), ephemeral: true });

  interaction.reply({
    content: `${formatNumber(Math.floor(Math.random() * maxNumber))}`,
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
