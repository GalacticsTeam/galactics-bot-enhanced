import { ChannelType, EmbedBuilder, Guild } from 'discord.js';

import { getServerSchema, getUserSchemaItem, setUserSchemaItem } from '@db';
import { isFeatureAllowed } from '@utils';

export const onAutoBan = async (guild: Guild, memberId: string) => {
  if (!(await isFeatureAllowed('autoBan', guild.id))) return;

  const {
    properties: { autoBanTrigger },
    channels: { logs: logsChannelId },
    embeds: { color },
  } = await getServerSchema(guild.id);

  const userWarns = await getUserSchemaItem(guild.id, memberId, 'warns');

  if (userWarns.number < autoBanTrigger) return;

  guild.members.ban(memberId, { reason: `Auto-banned after ${userWarns.number} warns` }).then(async () => {
    if (!logsChannelId) return;

    const logsChannel = guild.channels.cache.get(logsChannelId);

    if (logsChannel?.type !== ChannelType.GuildText) return;

    await setUserSchemaItem(guild.id, memberId, 'warns', (prevWarns) => ({
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
            iconURL: guild.iconURL({ size: 2048 }) ?? undefined,
          })
          .setThumbnail(guild.iconURL({ size: 2048 })),
      ],
    });
  });
};
