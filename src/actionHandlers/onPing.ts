import { Message } from 'discord.js';

export const onPing = (msg: Message) => msg.content.toLowerCase() === 'ping' && msg.reply({ content: 'Pong!' });
