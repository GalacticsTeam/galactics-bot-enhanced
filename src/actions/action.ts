import type { Client } from 'discord.js';

import type { Action, IntervalFn, StartOfFn } from './types';

export const action: Action = (Client, actionType, actionFn) => {
  Client.on(actionType, actionFn);
};

export const interval = (client: Client<true>, intervalFn: IntervalFn, time: number) => {
  setInterval(() => intervalFn(client, time), time);
};

export const startOf = (client: Client<true>, startOfFn: StartOfFn, type: Time) =>
  interval(
    client,
    () => {
      const now = new Date();
      const isStarting = now.getMinutes() < 5;
      const isYearly = type === 'year' && now.getMonth() === 0 && now.getDate() === 1;
      const isMonthly = type === 'month' && now.getDate() === 1;
      const isWeekly = type === 'week' && now.getDay() === 0;
      const isDaily = type === 'day' && now.getHours() === 0;
      const isHourly = type === 'hour' && isStarting;
      const notStartOf = !isYearly && !isMonthly && !isWeekly && !isDaily && !isHourly && !isStarting;

      if (notStartOf) return;

      startOfFn(client, now, type);
    },
    5 * 60 * 1000
  );
