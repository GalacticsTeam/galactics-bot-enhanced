import { Message } from 'discord.js';

export const onPing = (msg: Message) => {
  msg.reply({ content: 'Pong!' });
};
