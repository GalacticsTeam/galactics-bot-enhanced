import { ApplicationCommandOptionType, userMention } from 'discord.js';

import { onAutoBan } from '@actionHandlers';
import { getServerUserProperty, setServerUserProperty } from '@db';
import { onServerTranslate, onUserTranslate } from '@i18n/onTranslate';

import type { Command } from './types';

export const warn: Command = async (interaction) => {
  const action = interaction.options.getSubcommand();
  const tGuild = await onServerTranslate(interaction.guildId);
  const tUser = await onUserTranslate(interaction.user.id);

  const user = interaction.options.getUser('user', true).id;
  const reason = interaction.options.getString('reason');

  const { number: count, reasons: reasons } = await getServerUserProperty(interaction.guildId, user, 'warns');

  switch (action) {
    case 'add':
      await setServerUserProperty(interaction.guildId, user, 'warns', ({ number, reasons }) => ({
        number: number + 1,
        reasons: [...reasons, tGuild('warn.reason.add', { reason: reason! })],
      })).then(() => onAutoBan(interaction.guild, user));

      return interaction.reply({ content: tUser('warn.added', { user: userMention(user) }), ephemeral: true });

    case 'remove':
      if (!count) return interaction.reply({ content: tUser('warn.remove.noWarns'), ephemeral: true });

      await setServerUserProperty(interaction.guildId, user, 'warns', ({ number, reasons }) => ({
        number: number - 1,
        reasons: [...reasons, tGuild('warn.reason.remove', { reason: reason!! })],
      }));

      return interaction.reply({ content: tUser('warn.removed', { user: userMention(user) }), ephemeral: true });

    case 'list':
      if (!reasons.length) return interaction.reply({ content: tUser('warn.list.count', { count }), ephemeral: true });

      return interaction.reply({
        content: `${tUser('warn.list.count', { count })} \n${tUser('name.reasons')}:\n${reasons.map((reason) => `> ${reason}`).join('\n')}`,
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
