import { EmbedBuilder, GuildMember, TextChannel, channelMention, userMention } from 'discord.js';

const roles = {
  member: '1086033687109455989',
  bot: '1086033687109455985',
};

const channels = {
  welcomeChannel: '1086033689143676980',
  rulesChannel: '1086033688871063671',
};

export const welcome = (member: GuildMember) => {
  if (member.user.bot) {
    member.roles.add(roles.bot);
    return;
  }

  member.roles.member;

  const welcomeChannel = member.guild.channels.cache.get(channels.welcomeChannel) as TextChannel;

  welcomeChannel.send(`
  >>>   \`#\` **Welcome** ${userMention(member.id)} to out server !
  \`#\` We inform u to read our **rules** \`:\` ${channelMention(channels.rulesChannel)}
  \`#\` Total members \`:\` **${member.guild.memberCount}**
  \`#\` Enjoy with us :heart_on_fire:
    `);
};

// embed version, just in case we needed to use it :)
/*

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
*/
