import { ChannelType, EmbedBuilder, Guild } from 'discord.js';

import { getServer, getServerUserProperty, setServerUserProperty } from '@db';
import { isFeatureAllowed } from '@utils';
import { onServerTranslate } from '@i18n/onTranslate';

export const onAutoBan = async (guild: Guild, memberId: string) => {
  if (!(await isFeatureAllowed('autoBan', guild.id))) return;
  const t = await onServerTranslate(guild.id);

  const {
    properties: { autoBanTrigger },
    channels: { logs: logsChannelId },
    embeds: { color },
  } = await getServer(guild.id);

  const userWarns = await getServerUserProperty(guild.id, memberId, 'warns');

  if (userWarns.number < autoBanTrigger) return;

  guild.members.ban(memberId, { reason: t('autoBan.autoBannedAfter', { count: userWarns.number }) }).then(async () => {
    if (!logsChannelId) return;

    const logsChannel = guild.channels.cache.get(logsChannelId);

    if (logsChannel?.type !== ChannelType.GuildText) return;

    await setServerUserProperty(guild.id, memberId, 'warns', (prevWarns) => ({
      number: 0,
      reasons: [...prevWarns.reasons, t('autoBan.autoBanReset')],
    }));

    if (!logsChannel) return;

    logsChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(color)
          .addFields(
            { name: t('autoBan.auto-banned'), value: `<@${memberId}>` },
            { name: t('name.reason'), value: t('autoBan.autoBannedAfter', { count: userWarns.number }) }
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
