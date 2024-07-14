import { ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction } from 'discord.js';
import { v4 as id } from 'uuid';

import { addSchemaStatus } from '../onServerStatus/helpers';
import { getServerItem } from '../../db';
import { removeStatusMenu, removeStatusMenuHandler } from '../onServerStatus/removeStatus';

import type { Command } from './types';
import type { Status } from '../onServerStatus/types';

export const serverStatus: Command = (interaction) => {
  const { options } = interaction;

  const action = (options.getSubcommandGroup() as 'add') || (options.getSubcommand() as 'remove');

  switch (action) {
    case 'add':
      const title = options.getString('title') as string;
      const type = options.getSubcommand() as Status['type'];

      return addStatus(title, type, interaction);

    case 'remove':
      return removeStatus(interaction);
  }
};

serverStatus.create = {
  name: 'server-status',
  description: "Update server's status..",
  options: [
    {
      name: 'add',
      description: 'Add a status',
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: 'role',
          description: 'Add a role count status',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'title',
              description: 'Title of the status',
              type: ApplicationCommandOptionType.String,
              required: true,
            },
            {
              name: 'role',
              description: 'Role to role to add',
              type: ApplicationCommandOptionType.Role,
              required: true,
            },
          ],
        },
        {
          name: 'youtube',
          description: 'Add a YouTube status',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'title',
              description: 'Title of the status',
              type: ApplicationCommandOptionType.String,
              required: true,
            },
            {
              name: 'channel',
              description: 'YouTube channel ID',
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'remove',
      description: 'Remove a status',
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
};

const addStatus = async (title: string, type: Status['type'], interaction: ChatInputCommandInteraction<CacheType>) => {
  switch (type) {
    case 'role':
      const role = interaction.options.getRole('role');

      return addSchemaStatus(interaction.guild.id, { title, type, value: role.id, id: id() }).then(() => {
        interaction.reply({ content: `Status "${title}" added successfully.`, ephemeral: true });
      });

    case 'youtube':
      const channel = interaction.options.getString('channel');

      return addSchemaStatus(interaction.guild.id, { title, type, value: channel, id: id() }).then(() => {
        interaction.reply({ content: `Status "${title}" added successfully.`, ephemeral: true });
      });
  }
};

const removeStatus = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const statuses = (await getServerItem(interaction.guild.id, 'properties')).statuses;
  if (!statuses.length) return interaction.reply({ content: 'No statuses to remove.', ephemeral: true });

  interaction
    .reply({
      content: "Please Choose the status you'd like to remove.",
      components: [removeStatusMenu(statuses)],
      ephemeral: true,
    })
    .then((res) => removeStatusMenuHandler(res));
};
