import { App, BlockAction } from '@slack/bolt';
import { decodeBase64 } from './secret-santa';

const blocks = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: 'Secret Santa Azot.dev 🎅',
      emoji: true,
    },
  },
  {
    type: 'image',
    title: {
      type: 'plain_text',
      text: "C'est Noël avant l'heure🎅",
      emoji: true,
    },
    image_url: 'https://www.jeuxetcompagnie.fr/wp-content/uploads/2021/12/158661803_s.jpg',
    alt_text: 'noel',
  },
  {
    type: 'section',
    text: {
      type: 'plain_text',
      text: "Parce que les fêtes de fin d'année :snowman: riment aussi avec le plaisir d'offrir, Azot.dev fait son premier secret Santa :santa:  Cadeau orginal, drôle, pratique, c'est comme vous voulez 😀 Mais sans se ruiner : un budget maximum de 10 € / cadeau 😊 Alors faites vous plaisir et tirez au sort la personne à laquelle vous offrirez votre super cadeau 🎁 ",
      emoji: true,
    },
  },
  {
    type: 'divider',
  },
];

const action = {
  type: 'actions',
  elements: [
    {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Tirer au sort 🎊',
        emoji: true,
      },
      value: 'revel_name',
      action_id: 'revel_name',
    },
  ],
};

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  const secretSantaList = JSON.parse(decodeBase64(process.env.SECRET_SANTA_LIST_BASE_64 ?? '{}'));

  const scheduledDate = process.env.SECRET_SANTA_SCHEDULED_DATE;

  if (!scheduledDate) {
    throw new Error('Missing env SECRET_SANTA_SCHEDULED_DATE.');
  }

  const participants: Record<string, string> = JSON.parse(
    decodeBase64(process.env.SECRET_SANTA_PARTICIPANTS ?? '{}')
  );

  if (Object.keys(participants).length === 0) {
    throw new Error('Missing env SECRET_SANTA_PARTICIPANTS. Or it is empty');
  }

  for (const participant of Object.keys(participants)) {
    await app.client.chat.scheduleMessage({
      post_at: Number(scheduledDate),
      channel: participant,
      text: 'Secret Santa',
      blocks: [...blocks, action],
    });
  }

  app.action<BlockAction>('revel_name', async ({ body, ack }) => {
    await ack();

    const headers = new Headers();
    headers.set('Content-type', 'application/json');

    await fetch(body.response_url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        blocks: [
          ...blocks,
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `:tada: *${secretSantaList[participants[body.user.id]]}* `,
            },
          },
        ],
      }),
    });
  });

  console.log('⚡️ Bolt app is running!');
})();
