import { ChannelType, GuildMember, TextChannel, channelMention, userMention } from 'discord.js';
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

  const welcomeChannel = member.guild.channels.cache.get(channels.welcomeChannel);
  if (welcomeChannel.type !== ChannelType.GuildText) return;

  const welcomeImage = (await Jimp.read('src/assets/welcomeImage.png')).scale(0.2);
  await addUserAvatar(welcomeImage, member);
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

const addUserAvatar = async (welcomeImage: Jimp, member: GuildMember) => {
  const userImage = await Jimp.read(member.user.displayAvatarURL({ size: 128, extension: 'png' }));
  userImage.resize(122, 122);
  userImage.circle();
  welcomeImage.composite(userImage, 222, 36);
};
