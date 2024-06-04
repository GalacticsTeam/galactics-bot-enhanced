import { Message } from 'discord.js';

import { getServerItem } from '../db';

import type { PrefixParam, Prefix } from './prefixes/types';

export const onPrefix = async <T extends boolean>(msg: Message<T>, commandName: string, commandArgs: string[]) => {
  const serverPrefixes = await getServerItem(msg.guild.id, 'prefixes');
  if (!serverPrefixes.includes(commandName as Prefix)) return;

  const prefixParam = commandArgs[0] as PrefixParam;
  const paramOptions = commandArgs.slice(1);

  switch (prefixParam) {
  }
};
