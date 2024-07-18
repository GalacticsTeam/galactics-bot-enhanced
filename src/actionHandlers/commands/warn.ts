import { ApplicationCommandOptionType, userMention } from 'discord.js';

import { onAutoBan } from '../';
import { getUserSchemaItem, setUserSchemaItem } from '../../db';

import type { Command } from './types';

export const warn: Command = async (interaction) => {
  const action = interaction.options.getSubcommand();

  const user = interaction.options.getUser('user').id;
  const reason = interaction.options.getString('reason');

  const { number: count, reasons: reasons } = await getUserSchemaItem(interaction.guildId, user, 'warns');

  switch (action) {
    case 'add':
      await setUserSchemaItem(interaction.guildId, user, 'warns', ({ number, reasons }) => {
        return { number: number + 1, reasons: [...reasons, `Add: ${reason}`] };
      }).then(() => onAutoBan(interaction.guild, user));

      return interaction.reply({ content: `Added a warn for ${userMention(user)}`, ephemeral: true });

    case 'remove':
      if (!count) return interaction.reply({ content: `This user has no warns`, ephemeral: true });

      await setUserSchemaItem(interaction.guildId, user, 'warns', ({ number, reasons }) => {
        return { number: number - 1, reasons: [...reasons, `Remove: ${reason}`] };
      });

      return interaction.reply({ content: `Removed a warn for ${userMention(user)}`, ephemeral: true });

    case 'list':
      if (!reasons.length) return interaction.reply({ content: `Warns count: ${count} ` });

      return interaction.reply({
        content: `Warns count: ${count} \nReasons:\n${reasons.map((reason) => `> ${reason}`).join('\n')}`,
      });
  }
};

warn.create = {
  name: 'warn',
  description: "Add a warn to a member, Remove a warn from them, list a member's warns",
  options: [
    {
      name: 'add',
      description: "Increments a user's warns count",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'Select a user',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'reason',
          description: 'Enter a reason for warning a user',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'remove',
      description: "Decrements a user's warns count",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'Select a user',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'reason',
          description: 'Enter a reason for removing a warn from a user',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'list',
      description: "Decrements user's warns count",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'Select a user',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
  ],
};
