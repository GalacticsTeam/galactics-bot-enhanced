import { VoiceState } from 'discord.js';

import { isAllowedFeature } from '../utils/helpers';
import { onTempChannel } from '../actionHandlers';

export const onVoiceStateUpdate = async (oldState: VoiceState, newState: VoiceState) => {
  const voiceState = oldState ?? newState;

  if (voiceState.member.user.bot) return;

  (await isAllowedFeature('tempChannels', voiceState.guild.id)) && onTempChannel(oldState, newState);
};
