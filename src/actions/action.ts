import { Awaitable, Client, ClientEvents } from 'discord.js';

type action = <Event extends keyof ClientEvents>(
  Client: Client,
  actionType: Event,
  actionFn: (...args: ClientEvents[Event]) => Awaitable<void>
) => void;

export const action: action = (Client, actionType, actionFn) => {
  Client.on(actionType, actionFn);
};
