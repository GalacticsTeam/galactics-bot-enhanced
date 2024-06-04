import { GuildMember, TextChannel, channelMention, userMention } from 'discord.js';
import Jimp from 'jimp';

const roles = {
  member: '1086033687109455989',
  bot: '1086033687109455985',
};

const channels = {
  welcomeChannel: '1086033689143676980',
  rulesChannel: '1086033688871063671',
};

export const onWelcome = async (member: GuildMember) => {
  if (member.user.bot) return member.roles.add(roles.bot);

  const welcomeChannel = member.guild.channels.cache.get(channels.welcomeChannel) as TextChannel;

  const welcomeImage = (await Jimp.read('src/assets/welcomeImage.png')).scale(0.2);

  const userImage = await Jimp.read(member.user.displayAvatarURL({ extension: 'png' }));
  userImage.resize(122, 122);
  userImage.circle();

  welcomeImage.composite(userImage, 222, 36);

  const welcomeImageBuffer = await welcomeImage.getBufferAsync('image/png');

  member.roles.add(roles.member).then(() => {
    welcomeChannel.send({ files: [welcomeImageBuffer] }).then(() => {
      welcomeChannel.send(`
      >>>       \`#\` **Welcome** ${userMention(member.id)} to out server !
      \`#\` We inform u to read our **rules** \`:\` ${channelMention(channels.rulesChannel)}
      \`#\` Total members \`:\` **${member.guild.memberCount}**
      \`#\` Enjoy with us :heart_on_fire:
        `);
    });
  });
};
