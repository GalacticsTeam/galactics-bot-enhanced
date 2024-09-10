import { setServerSchemaItem, getServerSchemaItem } from '../../db';
import { commands, createCommand, deleteCommand } from '../commands';
import { checkItemType } from '../../utils/helpers';

import type { Feature, Property, DefaultServerConfig, Embed, Channel, Role } from '../../types';
import type { CommandInteraction } from '../commands/types';

export const features = async (updatedFeature: Feature, interaction: CommandInteraction) => {
  await setServerSchemaItem(interaction.guild.id, 'features', (prevFeatures) => ({
    ...prevFeatures,
    [updatedFeature]: !prevFeatures[updatedFeature],
  })).then((newFeatures) => {
    interaction.reply({
      content: `Feature ${updatedFeature} is set to ${newFeatures[updatedFeature] ? 'enabled' : 'disabled'}`,
      ephemeral: true,
    });

    const updatedCommand = commands.find((command) => command.type === updatedFeature);
    if (!updatedCommand) return;

    if (newFeatures[updatedFeature])
      return createCommand(interaction.guild.commands, updatedCommand.interaction.create);

    deleteCommand(interaction.guild.commands, updatedCommand.interaction.create);
  });
};

export const embeds = async <T extends Embed>(
  updatedEmbedProp: T,
  newValue: DefaultServerConfig['embeds'][T],
  interaction: CommandInteraction
) => {
  switch (updatedEmbedProp) {
    case 'color':
      if (/^#?[a-f0-9]{6}$/.test(newValue as string)) break;

      return interaction.reply({ content: 'Color must be a 6 character hexadecimal', ephemeral: true });
  }

  await setServerSchemaItem(interaction.guild.id, 'embeds', (prevEmbed) => ({
    ...prevEmbed,
    [updatedEmbedProp]: newValue,
  })).then((newEmbedProps) =>
    interaction.reply({
      content: `Embed prop ${updatedEmbedProp} is set to ${newEmbedProps[updatedEmbedProp]}`,
      ephemeral: true,
    })
  );
};

export const properties = <T extends Property>(
  updatedProperty: T,
  newValue: DefaultServerConfig['properties'][T],
  interaction: CommandInteraction
) => {
  switch (updatedProperty) {
    case 'autoBanTrigger':
      if (+newValue) break;

      return interaction.reply({ content: 'Value must be a number', ephemeral: true });
  }

  setServerSchemaItem(interaction.guild.id, 'properties', (prevProperties) => ({
    ...prevProperties,
    [updatedProperty]: newValue,
  })).then((newProperties) =>
    interaction.reply({
      content: `Property ${updatedProperty} is set to ${newProperties[updatedProperty]}`,
      ephemeral: true,
    })
  );
};

export const channels = (updatedChannel: Channel, newValue: string, interaction: CommandInteraction) =>
  setServerSchemaItem(interaction.guild.id, 'channels', (prevChannels) => ({
    ...prevChannels,
    [updatedChannel]: newValue,
  })).then((newChannels) =>
    interaction.reply({
      content: `Channel ${updatedChannel} is set to <#${newChannels[updatedChannel]}>`,
      ephemeral: true,
    })
  );

export const roles = (updatedRole: Role, newValue: string, interaction: CommandInteraction) =>
  setServerSchemaItem(interaction.guild.id, 'roles', (prevRoles) => ({
    ...prevRoles,
    [updatedRole]: newValue,
  })).then((newRoles) =>
    interaction.reply({
      content: `Role ${updatedRole} is set to <@&${newRoles[updatedRole]}>`,
      ephemeral: true,
    })
  );

export const list = (itemName: keyof DefaultServerConfig, interaction: CommandInteraction) => {
  getServerSchemaItem(interaction.guild.id, itemName).then((item) => {
    const { isArray, isObj } = checkItemType(item);
    const ArrItems = isArray && (item as []).map((itemData, index) => index + 1 + '. ' + itemData).join('\n');
    const ObjItems =
      isObj &&
      Object.keys(item)
        .map((itemData) => itemData + ': ' + (item as any)[itemData])
        .join('\n');

    return interaction.reply({
      content: ArrItems || ObjItems || String(item),
      ephemeral: true,
    });
  });
};

export * from './helpers';
