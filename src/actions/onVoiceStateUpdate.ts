import type { VoiceState } from 'discord.js';

import { onTempChannel } from '../actionHandlers';

export const onVoiceStateUpdate = async (oldState: VoiceState, newState: VoiceState) => {
  const voiceState = oldState ?? newState;
  if (voiceState.member.user.bot) return;

  onTempChannel(oldState, newState);
};
