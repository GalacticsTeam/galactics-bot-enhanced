import type { Client } from 'discord.js';

import configs from '../const';

export const onCustomStatus = async (client: Client) => {
  let statusIndex = 0;

  setInterval(() => {
    if (statusIndex === configs.customStatus.length) statusIndex = 0;

    const { name, type } = configs.customStatus[statusIndex];
    client.user?.setActivity(name, { type });

    statusIndex++;
  }, 5000);
};
