import type { Awaitable, Client, ClientEvents } from 'discord.js';

export type Action = <Event extends keyof ClientEvents>(
  Client: Client<true>,
  actionType: Event,
  actionFn: (...args: ClientEvents[Event]) => Awaitable<void>
) => void;

export type IntervalFn = (client: Client<true>, time: number) => void;
