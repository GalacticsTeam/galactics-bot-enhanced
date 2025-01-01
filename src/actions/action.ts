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
      const isYearly = type === 'year' && now.getMonth() === 0 && now.getDate() === 1;
      const isMonthly = type === 'month' && now.getDate() === 1;
      const isWeekly = type === 'week' && now.getDay() === 0;
      const isDaily = type === 'day' && now.getHours() === 0 && now.getMinutes() === 0;
      const isHourly = type === 'hour' && now.getMinutes() === 0;
      const notStartOf = !isYearly && !isMonthly && !isWeekly && !isDaily && !isHourly;

      if (notStartOf) return;

      startOfFn(client, type);
    },
    5 * 60 * 1000
  );
