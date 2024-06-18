import { ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction } from 'discord.js';

import { defaultServerConfig } from '../../utils';
import { setServerSchemaItem } from '../../db';

import type { DefaultServerConfig, Embed, Feature } from '../../types';
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
  }
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

  return setServerSchemaItem(interaction.guild.id, 'embeds', (prevEmbed) => ({
    ...prevEmbed,
    [updatedEmbedProp]: newValue,
  })).then((newEmbedProps) => {
    interaction.reply({
      content: `Embed prop ${updatedEmbedProp} is now ${newEmbedProps[updatedEmbedProp]}`,
      ephemeral: true,
    });
  });
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
  ],
};
