import { Awaitable, Client, ClientEvents } from 'discord.js';

export type Action = <Event extends keyof ClientEvents>(
  Client: Client,
  actionType: Event,
  actionFn: (...args: ClientEvents[Event]) => Awaitable<void>
) => void;

export type IntervalFn = (client: Client, time: number) => void;
