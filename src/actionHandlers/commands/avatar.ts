import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, Guild, User } from 'discord.js';
import { commandCreate } from './types';

type getAvatarEmbedFn = ((user: User, type: 'user') => EmbedBuilder) & ((user: Guild, type: 'server') => EmbedBuilder);

export const avatar = (interaction: ChatInputCommandInteraction) => {
  const { user, guild, options } = interaction;

  const mentionedUser = options.getUser('user');
  const server = options.getString('server');

  const getAvatarEmbed: getAvatarEmbedFn = (user: User & Guild, type = 'user') =>
    new EmbedBuilder()
      .setColor(0x0f0229)
      .setTitle(type === 'user' ? user.username : user.name)
      .setDescription(
        `[Avatar Link](${type === 'user' ? user.avatarURL({ size: 2048 }) : user.iconURL({ size: 2048 })})`
      )
      .setImage(type === 'user' ? user.avatarURL({ size: 2048 }) : user.iconURL({ size: 2048 }));

  if (!server && !mentionedUser) return interaction.reply({ embeds: [getAvatarEmbed(user, 'user')], ephemeral: true });
  if (server) return interaction.reply({ embeds: [getAvatarEmbed(guild, 'server')], ephemeral: true });
  if (mentionedUser) return interaction.reply({ embeds: [getAvatarEmbed(mentionedUser, 'user')], ephemeral: true });
};

avatar.avatarCreate = {
  name: 'avatar',
  description: "Get's your avatar",
  options: [
    {
      name: 'user',
      description: "Get's specific user's avatar",
      required: false,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: 'server',
      description: "Get's this server's avatar",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
} satisfies commandCreate;
