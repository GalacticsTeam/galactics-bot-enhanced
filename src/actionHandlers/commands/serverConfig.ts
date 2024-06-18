import { ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction } from 'discord.js';

import { defaultServerConfig } from '../../utils';
import { setServerSchemaItem } from '../../db';

import type { Channel, DefaultServerConfig, Embed, Feature } from '../../types';
import type { Command } from './types';

export const serverConfig: Command = (interaction) => {
  const serverConfigItem = interaction.options.getSubcommand();

  switch (serverConfigItem as keyof Omit<DefaultServerConfig, 'isMaintenance' | 'isDevServer'>) {
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

const embeds = async (updatedEmbedProp: Embed, newValue: any, interaction: ChatInputCommandInteraction<CacheType>) => {
  if (updatedEmbedProp === 'color' && !/^#?[a-f0-9]{6}$/.test(newValue as string))
    return interaction.reply({
      content: 'Color must be a 6 character hexadecimal',
    });

  const newEmbedProps = await setServerSchemaItem(interaction.guild.id, 'embeds', (prevEmbed) => ({
    ...prevEmbed,
    [updatedEmbedProp]: newValue,
  }));
  interaction.reply({
    content: `Embed prop ${updatedEmbedProp} is now ${newEmbedProps[updatedEmbedProp]}`,
    ephemeral: true,
  });
};

const channels = async (
  updatedChannel: Channel,
  newValue: string,
  interaction: ChatInputCommandInteraction<CacheType>
) => {};
