import { ChannelType, VoiceState } from 'discord.js';

import { getServerProperty } from '@db';
import { isFeatureAllowed } from '@utils';
import { getLocalDBItem, setLocalDBItem } from '@localdb';

import { createChannel } from './helpers';

export const onTempChannel = async (oldState: VoiceState, newState: VoiceState) => {
  const voiceState = newState ?? oldState;

  if (!(await isFeatureAllowed('tempChannels', voiceState.guild.id))) return;

  const {
    tempChannelCategory: categoryId,
    tempChannelGenerator: generatorId,
    tempChannelCommands: commandsId,
  } = await getServerProperty(voiceState.guild.id, 'channels');

  if (!categoryId || !generatorId || !commandsId) return;

  const category = voiceState.guild.channels.cache.get(categoryId);
  const commandsChannel = voiceState.guild.channels.cache.get(commandsId);
  const generatorChannel = voiceState.guild.channels.cache.get(generatorId);

  if (!category || !commandsChannel || !generatorChannel) return;

  // If the user is in the category channel
  if (newState?.channel?.parent?.id === categoryId && newState?.member) {
    if (commandsChannel.type === ChannelType.GuildText)
      commandsChannel.permissionOverwrites.edit(newState?.member.id, { ViewChannel: true, SendMessages: true });

    if (newState?.channel.id !== generatorId)
      newState?.channel.permissionOverwrites.edit(newState?.member.id, {
        SendMessages: true,
        ReadMessageHistory: true,
      });
  }

  // If the user is in the generator channel
  if (newState?.channel?.id === generatorId && newState?.member)
    createChannel(voiceState.guild, categoryId, newState.member).then(() => {
      if (generatorChannel.type !== ChannelType.GuildVoice) return;

      generatorChannel.permissionOverwrites
        .edit(newState?.member?.id ?? '', { Connect: false, SendMessages: false, ReadMessageHistory: false })
        .then(() =>
          setTimeout(() => newState.member && generatorChannel.permissionOverwrites.delete(newState?.member.id), 3000)
        );
    });

  // If the user leaves the category channel
  if (oldState?.channel?.parentId !== categoryId) return;

  // If the user leaves the category channel and goes to another category channel
  if (newState?.channel?.parentId !== categoryId && commandsChannel.type === ChannelType.GuildText && oldState.member)
    commandsChannel.permissionOverwrites.delete(oldState?.member.id);

  if (generatorId === oldState?.channel?.id || oldState.channel.members.size) return;

  // If the user leaves the generator channel
  const oldDbVc = (await getLocalDBItem(voiceState.guild.id, 'tempChannels')).find(
    (tempChannel) => tempChannel.channelId === oldState.channel?.id
  );

  oldState.channel
    .delete()
    .then(() =>
      setLocalDBItem(voiceState.guild.id, 'tempChannels', (prevTempChannels) =>
        prevTempChannels.filter((tempChannel) => tempChannel.channelId !== oldDbVc?.channelId)
      )
    );
};
