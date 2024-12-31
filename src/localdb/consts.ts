import type { LocalDBServerConfig } from '@types';

const localDB = {
  lastJoinedIds: [],
  statusChannels: [],
  tempChannels: [],
} as const satisfies LocalDBServerConfig;

export default {
  localDB,
};
