import { ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction } from 'discord.js';

import { defaultServerConfig } from '../../utils';
import { getServerItem, setServerSchemaItem } from '../../db';

import type { Channel, DefaultServerConfig, Embed, Feature, Role } from '../../types';
import type { Command } from './types';

export const serverConfig: Command = (interaction) => {
  const serverConfigItem = interaction.options.getSubcommand();

  switch (serverConfigItem as keyof Omit<DefaultServerConfig, 'isMaintenance' | 'isDevServer'> | 'list') {
    case 'features':
      const updatedFeature = Object.keys(defaultServerConfig.features).filter(
        (feature) => feature !== 'serverConfig' && feature.toLowerCase() === interaction.options.getString('feature')
      )[0] as Feature;

      return features(updatedFeature, interaction);

    case 'embeds':
      const updatedEmbedProp = Object.keys(defaultServerConfig.embeds).filter(
        (embedProp) => embedProp.toLowerCase() === interaction.options.getString('name')
      )[0] as Embed;
      const updatedEmbedValue = interaction.options.getString('value');

      return embeds(updatedEmbedProp, updatedEmbedValue, interaction);

    case 'channels':
      const updatedChannel = Object.keys(defaultServerConfig.channels).filter(
        (channel) => channel.toLowerCase() === interaction.options.getString('channel')
      )[0] as Channel;
      const UpdatedChannelId = interaction.options.getChannel('value').id;

      return channels(updatedChannel, UpdatedChannelId, interaction);

    case 'roles':
      const updatedRole = Object.keys(defaultServerConfig.roles).filter(
        (role) => role.toLowerCase() === interaction.options.getString('role')
      )[0] as Role;
      const UpdatedRoleId = interaction.options.getRole('value').id;

      return roles(updatedRole, UpdatedRoleId, interaction);

    case 'list':
      const itemName = Object.keys(defaultServerConfig).filter(
        (serverConfigItem) =>
          interaction.options.getString('configuration').toLowerCase() === serverConfigItem.toLowerCase()
      )[0] as keyof DefaultServerConfig;

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

const features = (updatedFeature: Feature, interaction: ChatInputCommandInteraction<CacheType>) =>
  setServerSchemaItem(interaction.guild.id, 'features', (prevFeatures) => ({
    ...prevFeatures,
    [updatedFeature]: !prevFeatures[updatedFeature],
  })).then((newFeatures) =>
    interaction.reply({
      content: `Feature ${updatedFeature} is now ${newFeatures[updatedFeature] ? 'enabled' : 'disabled'}`,
      ephemeral: true,
    })
  );

const embeds = (updatedEmbedProp: Embed, newValue: any, interaction: ChatInputCommandInteraction<CacheType>) => {
  if (updatedEmbedProp === 'color' && !/^#?[a-f0-9]{6}$/.test(newValue as string))
    return interaction.reply({
      content: 'Color must be a 6 character hexadecimal',
    });

  setServerSchemaItem(interaction.guild.id, 'embeds', (prevEmbed) => ({
    ...prevEmbed,
    [updatedEmbedProp]: newValue,
  })).then((newEmbedProps) =>
    interaction.reply({
      content: `Embed prop ${updatedEmbedProp} is now ${newEmbedProps[updatedEmbedProp]}`,
      ephemeral: true,
    })
  );
};

const channels = (updatedChannel: Channel, newValue: string, interaction: ChatInputCommandInteraction<CacheType>) =>
  setServerSchemaItem(interaction.guild.id, 'channels', (prevChannels) => ({
    ...prevChannels,
    [updatedChannel]: newValue,
  })).then((newChannels) =>
    interaction.reply({
      content: `Channel ${updatedChannel} is set to <#${newChannels[updatedChannel]}>`,
      ephemeral: true,
    })
  );

const roles = (updatedRole: Role, newValue: string, interaction: ChatInputCommandInteraction<CacheType>) =>
  setServerSchemaItem(interaction.guild.id, 'roles', (prevRoles) => ({
    ...prevRoles,
    [updatedRole]: newValue,
  })).then((newRoles) =>
    interaction.reply({
      content: `Role ${updatedRole} is set to <@&${newRoles[updatedRole]}>`,
      ephemeral: true,
    })
  );

const list = (itemName: keyof DefaultServerConfig, interaction: ChatInputCommandInteraction<CacheType>) => {
  getServerItem(interaction.guild.id, itemName).then((item) =>
    interaction.reply({
      content: Array.isArray(item)
        ? item.map((itemData, index) => index + 1 + '. ' + itemData).join('\n')
        : typeof item === 'object'
          ? Object.keys(item)
              .map((itemData) => itemData + ': ' + (item as any)[itemData])
              .join('\n')
          : item + '',
      ephemeral: true,
    })
  );
};
