import { Client } from 'discord.js';

import { customStatus } from '../utils';

export const onCutsomStatus = (client: Client) => {
  let statusIndex = 0;

  setInterval(() => {
    if (statusIndex === customStatus.length) statusIndex = 0;

    const status = customStatus[statusIndex];
    client.user.setActivity(status.name, { type: status.type });

    statusIndex++;
  }, 5000);
};
