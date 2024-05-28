import { EmbedBuilder, GuildMember, TextChannel } from 'discord.js';

const roles = {
  member: '1086033687109455989',
  bots: '1086033687109455985',
  founder: '1086033687201726634',
};

export const welcome = (member: GuildMember) => {
  if (member.user.bot) {
    member.roles.add(roles.member);
    return;
  }

  member.roles.add('1086033687201726634');

  const welcomeChannel = member.guild.channels.cache.get('1086033689143676980') as TextChannel;

  welcomeChannel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Welcome "${member.displayName}" to our server`)
        .setThumbnail(member.user.avatarURL({ size: 2048 }))
        .addFields(
          {
            name: '# Joined Discord:',
            value: `-> **In** ${member.user.createdAt.getFullYear()}.`,
            inline: true,
          },
          {
            name: '# Member number:',
            value: `-> **${member.guild.memberCount}** Members.`,
            inline: true,
          },
          {
            name: 'Please read our rules',
            value: `Rules Channel: ${member.guild.channels.cache.get('1086033688871063671')}`,
            inline: false,
          }
        )
        .setColor('#1f0557')
        .setFooter({
          text: `User id: ${member.id}`,
          iconURL: member.user.avatarURL({ size: 2048 }) ?? undefined,
        }),
    ],
  });
};
