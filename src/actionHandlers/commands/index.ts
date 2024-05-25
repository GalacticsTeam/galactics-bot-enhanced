import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';
import { diceRoll } from './diceRoll';
import { command } from '../../types';

export const commands = (interaction: ChatInputCommandInteraction) => {
  switch (interaction.commandName as command) {
    case 'roll-dice':
      diceRoll(interaction);
  }
};

export const commandsCreate = (commands: GuildApplicationCommandManager) => {
  commands.create(diceRoll.diceRollCreate);
};
