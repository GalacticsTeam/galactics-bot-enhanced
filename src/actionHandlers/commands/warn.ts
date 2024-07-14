import { ApplicationCommandOptionType, EmbedBuilder, userMention } from 'discord.js';

import type { Command } from './types';
import { getUserItem, setUserSchemaItem } from '../../db';
import { onAutoBan } from '../';

export const warn: Command = async (interaction) => {
  const warnItem = interaction.options.getSubcommand();
  const user = interaction.options.getUser('user').id;
  const reason = interaction.options.getString('reason');

  const { number: warnsCount, reasons: warnReasons } = await getUserItem(interaction.guildId, user, 'warns');

  switch (warnItem) {
    case 'add':
      await setUserSchemaItem(interaction.guildId, user, 'warns', ({ number, reasons }) => {
        return { number: number + 1, reasons: [...reasons, `Add: ${reason}`] };
      });

      interaction.reply({ content: `Added a warn for ${userMention(user)}`, ephemeral: true });

      onAutoBan(interaction.guild, user);

      return;

    case 'remove':
      if (warnsCount === 0) {
        interaction.reply({ content: `This user has no warns`, ephemeral: true });
        return;
      }

      await setUserSchemaItem(interaction.guildId, user, 'warns', ({ number, reasons }) => {
        return { number: number - 1, reasons: [...reasons, `Remove: ${reason}`] };
      });

      interaction.reply({ content: `Removed a warn for ${userMention(user)}`, ephemeral: true });

      return;

    case 'list':
      if (warnReasons.length === 0) {
        interaction.reply({
          content: `Warns count: ${warnsCount} `,
        });
        return;
      }

      interaction.reply({
        content: `Warns count: ${warnsCount} \nReasons:\n${warnReasons.map((reason) => `> ${reason}`).join('\n')}`,
      });

      return;
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
