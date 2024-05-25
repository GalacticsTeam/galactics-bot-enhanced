import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { command } from '../../types';

import { diceRoll } from './diceRoll';
import { avatar } from './avatar';

export const commands = (interaction: ChatInputCommandInteraction) => {
  switch (interaction.commandName as command) {
    case 'roll-dice':
      diceRoll(interaction);

    case 'avatar':
      avatar(interaction);
  }
};

export const commandsCreate = (commands: GuildApplicationCommandManager) => {
  commands.create(diceRoll.diceRollCreate);
  commands.create(avatar.avatarCreate);
};
