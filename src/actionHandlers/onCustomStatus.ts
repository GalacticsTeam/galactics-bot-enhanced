import type { Client } from 'discord.js';

import { customStatus } from '../utils';
import { isFeatureAllowed } from '../utils/helpers';

export const onCustomStatus = async (client: Client) => {
  let statusIndex = 0;

  setInterval(() => {
    if (statusIndex === customStatus.length) statusIndex = 0;

    const { name, type } = customStatus[statusIndex];
    client.user?.setActivity(name, { type });

    statusIndex++;
  }, 5000);
};
