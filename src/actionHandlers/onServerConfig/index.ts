import { checkItemType } from '@utils/helpers';
import type { CommandInteraction } from '@commands/types';
import { setServerSchemaItem, getServerSchemaItem } from '@db';
import { commands, createCommand, deleteCommand } from '@commands';
import type { Feature, Property, DefaultServerConfig, Embed } from '@types';
import { onUserTranslate } from '@i18n/onTranslate';

export const features = async (updatedFeature: Feature, interaction: CommandInteraction) => {
  const t = await onUserTranslate(interaction.guild.id, interaction.user.id);

  await setServerSchemaItem(interaction.guild.id, 'features', (prevFeatures) => ({
    ...prevFeatures,
    [updatedFeature]: !prevFeatures[updatedFeature],
  })).then((newFeatures) => {
    interaction.reply({
      content: t('serverConfig.updated', {
        config: t('name.feature'),
        prop: updatedFeature,
        value: t(`state.${newFeatures[updatedFeature] ? 'enabled' : 'disabled'}`),
      }),
      ephemeral: true,
    });

    const updatedCommand = commands.find((command) => command.type === updatedFeature);
    if (!updatedCommand) return;

    if (newFeatures[updatedFeature])
      return createCommand(interaction.guild.commands, updatedCommand.interaction.create);

    deleteCommand(interaction.guild.commands, updatedCommand.interaction.create);
  });
};

const hexColorRegex = /^#?[a-f0-9]{6}$/;

export const embeds = async <T extends Embed>(
  updatedEmbedProp: T,
  newValue: DefaultServerConfig['embeds'][T],
  interaction: CommandInteraction
) => {
  const t = await onUserTranslate(interaction.guild.id, interaction.user.id);

  switch (updatedEmbedProp) {
    case 'color':
      if (hexColorRegex.test(newValue as string)) break;

      return interaction.reply({ content: t('serverConfig.embed.error.color'), ephemeral: true });
  }

  await setServerSchemaItem(interaction.guild.id, 'embeds', (prevEmbed) => ({
    ...prevEmbed,
    [updatedEmbedProp]: newValue,
  })).then((newEmbedProps) =>
    interaction.reply({
      content: t('serverConfig.updated', {
        config: t('name.embed'),
        prop: updatedEmbedProp,
        value: String(newEmbedProps[updatedEmbedProp]),
      }),
      // content: `Embed prop ${updatedEmbedProp} is set to ${newEmbedProps[updatedEmbedProp]}`,
      ephemeral: true,
    })
  );
};

export const properties = async <T extends Property>(
  updatedProperty: T,
  newValue: DefaultServerConfig['properties'][T],
  interaction: CommandInteraction
) => {
  const t = await onUserTranslate(interaction.guild.id, interaction.user.id);

  switch (updatedProperty) {
    case 'autoBanTrigger':
      if (+newValue) break;

      return interaction.reply({
        content: t('error.valueMustBeA', {
          type: t('type.number'),
        }),
        ephemeral: true,
      });
  }

  setServerSchemaItem(interaction.guild.id, 'properties', (prevProperties) => ({
    ...prevProperties,
    [updatedProperty]: newValue,
  })).then((newProperties) =>
    interaction.reply({
      content: t('serverConfig.updated', {
        config: t('name.property'),
        prop: updatedProperty,
        value: String(newProperties[updatedProperty]),
      }),
      ephemeral: true,
    })
  );
};

export const channels = async (updatedChannel: Channel, newValue: string, interaction: CommandInteraction) => {
  const t = await onUserTranslate(interaction.guild.id, interaction.user.id);

  return setServerSchemaItem(interaction.guild.id, 'channels', (prevChannels) => ({
    ...prevChannels,
    [updatedChannel]: newValue,
  })).then((newChannels) =>
    interaction.reply({
      content: t('serverConfig.updated', {
        config: t('name.channel'),
        prop: updatedChannel,
        value: `<#${newChannels[updatedChannel]}>`,
      }),
      ephemeral: true,
    })
  );
};

export const roles = async (updatedRole: Role, newValue: string, interaction: CommandInteraction) => {
  const t = await onUserTranslate(interaction.guild.id, interaction.user.id);

  return setServerSchemaItem(interaction.guild.id, 'roles', (prevRoles) => ({
    ...prevRoles,
    [updatedRole]: newValue,
  })).then((newRoles) =>
    interaction.reply({
      content: t('serverConfig.updated', {
        config: t('name.role'),
        prop: updatedRole,
        value: `<@&${newRoles[updatedRole]}>`,
      }),
      ephemeral: true,
    })
  );
};

export const list = (itemName: keyof DefaultServerConfig, interaction: CommandInteraction) => {
  getServerSchemaItem(interaction.guild.id, itemName).then((item) => {
    const { isArray, isObj } = checkItemType(item);
    const ArrItems = isArray && (item as []).map((itemData, index) => index + 1 + '. ' + itemData).join('\n');
    const ObjItems =
      isObj &&
      Object.keys(item)
        .map((itemData) => itemData + ': ' + (item as Record<string, unknown>)[itemData])
        .join('\n');

    return interaction.reply({
      content: ArrItems || ObjItems || String(item),
      ephemeral: true,
    });
  });
};

export * from './helpers';
