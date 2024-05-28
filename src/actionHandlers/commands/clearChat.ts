import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';

import { command } from './types';

export const clearChat: command<'clearChat'> = (interaction: ChatInputCommandInteraction) => {
  const { member, channel, options } = interaction;
  const amount = options.getNumber('amount') || 0;

  if (amount > 100)
    return interaction.reply({ content: "Can't clear more than 100 messages at a time", ephemeral: true });
  if (amount < 1) return interaction.reply({ content: "Can't clear less than 1 message", ephemeral: true });

  (member.permissions as Readonly<PermissionsBitField>).has('Administrator') &&
    channel
      .bulkDelete(amount)
      .then(() => interaction.reply({ content: `Deleted ${amount} messages`, ephemeral: true }));
};

clearChat.clearChatCreate = {
  name: 'clear',
  description: 'Clear N amount of massages',
  options: [
    {
      name: 'amount',
      description: 'The amount wanted to be cleared',
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
