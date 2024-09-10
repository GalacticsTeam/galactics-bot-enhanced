import { ApplicationCommandOptionType } from 'discord.js';

import { defaultServerConfig } from '../../utils';
import { channels, embeds, features, list, properties, roles, getUpdatedItem } from '../onServerConfig';

import type { Command } from './types';
import type { ServerConfigOption } from '../onServerConfig/types';
import type { DefaultServerConfig, Embed } from '../../types';

export const serverConfig: Command = (interaction) => {
  const serverConfigItem = interaction.options.getSubcommand() as ServerConfigOption;

  switch (serverConfigItem) {
    case 'features':
      const updatedFeature = getUpdatedItem(
        serverConfigItem,
        (feature) => feature !== 'serverConfig' && feature.toLowerCase() === interaction.options.getString('feature')
      );

      return features(updatedFeature, interaction);

    case 'embeds':
      const updatedEmbedValue = interaction.options.getString('value') as DefaultServerConfig['embeds'][Embed];
      const updatedEmbedProp = getUpdatedItem(
        serverConfigItem,
        (embedProp) => embedProp.toLowerCase() === interaction.options.getString('name')
      );

      return embeds(updatedEmbedProp, updatedEmbedValue, interaction);

    case 'properties':
      const updatedPropertyValue = interaction.options.getString('value', true);
      const updatedProperty = getUpdatedItem(
        serverConfigItem,
        (prop) => prop.toLowerCase() === interaction.options.getString('name')
      );

      return properties(updatedProperty, updatedPropertyValue, interaction);

    case 'channels':
      const UpdatedChannelId = interaction.options.getChannel('value', true).id;
      const updatedChannel = getUpdatedItem(
        serverConfigItem,
        (channel) => channel.toLowerCase() === interaction.options.getString('channel')
      );

      return channels(updatedChannel, UpdatedChannelId, interaction);

    case 'roles':
      const UpdatedRoleId = interaction.options.getRole('value', true).id;
      const updatedRole = getUpdatedItem(
        serverConfigItem,
        (role) => role.toLowerCase() === interaction.options.getString('role')
      );

      return roles(updatedRole, UpdatedRoleId, interaction);

    case 'list':
      const itemName = getUpdatedItem(
        serverConfigItem,
        (item) => item.toLowerCase() === interaction.options.getString('configuration')
      );

      return list(itemName, interaction);
  }
};

serverConfig.create = {
  name: 'server-config',
  description: 'Server configuration',
  options: [
    {
      name: 'features',
      description: 'Toggle on/off a feature',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'feature',
          description: 'Feature name to toggle',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: Object.keys(defaultServerConfig.features)
            .filter((feature) => feature !== 'serverConfig')
            .map((feature) => ({ name: feature.toLowerCase(), value: feature.toLowerCase() })),
        },
      ],
    },
    {
      name: 'embeds',
      description: 'Embed configuration',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'name',
          description: 'Embed prop name',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: Object.keys(defaultServerConfig.embeds).map((embedProp) => ({
            name: embedProp.toLowerCase(),
            value: embedProp.toLowerCase(),
          })),
        },
        {
          name: 'value',
          description: 'Embed prop value',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'properties',
      description: 'Server properties configuration',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'name',
          description: 'Property name',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: Object.keys(defaultServerConfig.properties).map((propName) => ({
            name: propName.toLowerCase(),
            value: propName.toLowerCase(),
          })),
        },
        {
          name: 'value',
          description: 'Property value',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'channels',
      description: 'Channels configuration',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'channel',
          description: 'Channel to update its id',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: Object.keys(defaultServerConfig.channels).map((channelId) => ({
            name: channelId.toLowerCase(),
            value: channelId.toLowerCase(),
          })),
        },
        {
          name: 'value',
          description: 'new Channel Id',
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
    },
    {
      name: 'roles',
      description: 'Roles configuration',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'role',
          description: 'Role to update its id',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: Object.keys(defaultServerConfig.roles).map((roleId) => ({
            name: roleId.toLowerCase(),
            value: roleId.toLowerCase(),
          })),
        },
        {
          name: 'value',
          description: 'new Role Id',
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
    },

    {
      name: 'list',
      description: 'List all server configuration',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'configuration',
          description: 'Server configuration item',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: Object.keys(defaultServerConfig).map((item) => ({
            name: item.toLowerCase(),
            value: item.toLowerCase(),
          })),
        },
      ],
    },
  ],
};
