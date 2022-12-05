export const createSecretSantaList = (participants: string[]) => {
  const randomizedParticipants = shuffleArray(participants);

  const secretSantaList: Record<string, string> = {};

  for (let participantIndex = 0; participantIndex < randomizedParticipants.length; participantIndex++) {
    const participant = randomizedParticipants[participantIndex];
    let nextParticipantIndex = participantIndex + 1;

    if (participantIndex === randomizedParticipants.length - 1) {
      nextParticipantIndex = 0;
    }

    secretSantaList[participant] = randomizedParticipants[nextParticipantIndex];
  }

  return secretSantaList;
};

export const encodeToBase64 = (stuff: unknown) => {
  if (!stuff) {
    return;
  }

  return Buffer.from(JSON.stringify(stuff), 'utf-8').toString('base64');
};

export const decodeBase64 = (secret: string) => {
  return Buffer.from(secret, 'base64').toString('utf-8');
};

const shuffleArray = (array: string[]) => {
  const shuffledArray: string[] = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};
