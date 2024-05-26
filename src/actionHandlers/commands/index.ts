import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { commands as commandNames } from '../../utils';

import { diceRoll } from './diceRoll';
import { avatar } from './avatar';
import { user } from './user';

type command = (typeof commandNames)[keyof typeof commandNames];

export const commands = (interaction: ChatInputCommandInteraction) => {
  switch (interaction.commandName as command) {
    case 'roll-dice':
      return diceRoll(interaction);

    case 'avatar':
      return avatar(interaction);

    case 'user':
      return user(interaction);
  }
};

export const commandsCreate = (commands: GuildApplicationCommandManager) => {
  commands.create(diceRoll.diceRollCreate);
  commands.create(avatar.avatarCreate);
  commands.create(user.userCreate);
};
