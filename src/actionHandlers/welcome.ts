import { GuildMember, TextChannel, channelMention, userMention } from 'discord.js';

const roles = {
  member: '1086033687109455989',
  bot: '1086033687109455985',
};

const channels = {
  welcomeChannel: '1086033689143676980',
  rulesChannel: '1086033688871063671',
};

export const onWelcome = (member: GuildMember) => {
  if (member.user.bot) {
    member.roles.add(roles.bot);
    return;
  }

  member.roles.add(roles.member);

  const welcomeChannel = member.guild.channels.cache.get(channels.welcomeChannel) as TextChannel;

  welcomeChannel.send(`
  >>>   \`#\` **Welcome** ${userMention(member.id)} to out server !
  \`#\` We inform u to read our **rules** \`:\` ${channelMention(channels.rulesChannel)}
  \`#\` Total members \`:\` **${member.guild.memberCount}**
  \`#\` Enjoy with us :heart_on_fire:
    `);
};
