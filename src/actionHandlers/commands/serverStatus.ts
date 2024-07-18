import { ApplicationCommandOptionType } from 'discord.js';

import { addStatus, removeStatus } from '../onServerStatus';

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
  description: "Update server's status",
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
