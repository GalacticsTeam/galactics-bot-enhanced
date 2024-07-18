import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';

import type { Command } from './types';

export const clearChat: Command = (interaction) => {
  const { member, channel, options } = interaction;

  if (!(member.permissions as Readonly<PermissionsBitField>).has('Administrator')) return;

  const amount = options.getInteger('amount');

  if (amount > 100)
    return interaction.reply({ content: "Can't clear more than 100 messages at a time", ephemeral: true });
  if (amount < 1) return interaction.reply({ content: "Can't clear less than 1 message", ephemeral: true });

  channel
    .bulkDelete(amount)
    .then(() => interaction.reply({ content: `Deleted ${amount} messages`, ephemeral: true }))
    .catch(console.log);
};

clearChat.create = {
  name: 'clear',
  description: 'Clear N amount of massages',
  options: [
    {
      name: 'amount',
      description: 'The amount wanted to be cleared',
      required: true,
      type: ApplicationCommandOptionType.Integer,
    },
  ],
};
