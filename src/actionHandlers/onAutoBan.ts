import { EmbedBuilder, Guild, TextChannel } from 'discord.js';

import { getServerSchema, getUserItem, setUserSchemaItem } from '../db';
import { isAllowedFeature } from '../utils/helpers';

export const onAutoBan = async (guild: Guild, memberId: string) => {
  if (!(await isAllowedFeature('autoBan', guild.id))) return;

  const {
    properties: { autoBanTrigger },
    channels: { logs: logsChannelId },
    embeds: { color },
  } = await getServerSchema(guild.id);

  const userWarns = await getUserItem(guild.id, memberId, 'warns');

  if (userWarns.number < autoBanTrigger) return;

  guild.members.ban(memberId, { reason: `Auto-banned after ${userWarns.number} warns` }).then(() => {
    const logsChannel = guild.channels.cache.get(logsChannelId) as TextChannel;

    setUserSchemaItem(guild.id, memberId, 'warns', (prevWarns) => ({
      number: 0,
      reasons: [...prevWarns.reasons, `--auto-ban-reset--`],
    }));

    if (!logsChannel) return;

    logsChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(color)
          .addFields(
            { name: 'Auto-banned', value: `<@${memberId}>` },
            { name: 'Reason', value: `Auto-banned after ${userWarns.number} warns` }
          )
          .setAuthor({
            name: guild.name,
            iconURL: guild.iconURL({ size: 2048 }),
          })
          .setThumbnail(guild.iconURL({ size: 2048 })),
        ,
      ],
    });
  });
};
