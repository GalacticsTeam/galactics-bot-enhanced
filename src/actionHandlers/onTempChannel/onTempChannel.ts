import { ChannelType, VoiceState } from 'discord.js';

import { getServerItem } from '../../db';
import { createChannel, getUserActivity } from './helpers';
import { getDBItem, setDBItem } from '../../localdb';

export const onTempChannel = async (oldState: VoiceState, newState: VoiceState) => {
  const voiceState = newState ?? oldState;

  const channels = await getServerItem(voiceState.guild.id, 'channels');
  const categoryId = channels.tempChannelCategory;
  const commandsId = channels.tempChannelCommands;
  const generatorId = channels.tempChannelGenerator;

  const category = voiceState.guild.channels.cache.get(categoryId);
  const commandsChannel = voiceState.guild.channels.cache.get(commandsId);
  const generatorChannel = voiceState.guild.channels.cache.get(generatorId);
  const activity = getUserActivity(voiceState.member);

  if (!category || !commandsChannel || !generatorChannel) return;

  if (newState?.channel?.parent.id === categoryId) {
    commandsChannel.type === ChannelType.GuildText &&
      commandsChannel.permissionOverwrites.edit(newState?.member?.id, { ViewChannel: true, SendMessages: true });

    newState?.channel.id !== generatorId &&
      newState?.channel.permissionOverwrites.edit(newState?.member?.id, {
        SendMessages: true,
        ReadMessageHistory: true,
      });
  }

  if (newState?.channel?.id === generatorId)
    createChannel(voiceState.guild, categoryId, newState.member, activity).then(
      () =>
        generatorChannel.type === ChannelType.GuildVoice &&
        generatorChannel.permissionOverwrites
          .edit(newState?.member?.id, { Connect: false, SendMessages: false, ReadMessageHistory: false })
          .then((_) => setTimeout(() => generatorChannel.permissionOverwrites.delete(newState?.member?.id), 3000))
    );

  if (oldState?.channel?.parentId === categoryId) {
    if (newState?.channel?.parentId !== categoryId)
      commandsChannel.type === ChannelType.GuildText &&
        commandsChannel.permissionOverwrites.delete(oldState?.member?.id);

    if (generatorId !== oldState?.channel?.id && oldState?.channel?.members.size === 0) {
      const oldDbVc = (await getDBItem(voiceState.guild.id, 'tempChannels')).find(
        (tempChannel) => tempChannel.channelId === oldState.channel.id
      );

      oldState.channel
        .delete()
        .then(
          async (_) =>
            await setDBItem(voiceState.guild.id, 'tempChannels', (prevTempChannels) =>
              prevTempChannels.filter((tempChannel) => tempChannel.channelId !== oldDbVc.channelId)
            )
        );
    }
  }
};
