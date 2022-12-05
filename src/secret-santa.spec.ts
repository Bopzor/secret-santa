import expect from 'expect';
import { createSecretSantaList } from './secret-santa';

describe("create Secret Santa's list", () => {
  it('creates a list for two peoples', () => {
    const secretSantaList = createSecretSantaList(['aurelie', 'violaine']);

    expect(secretSantaList).toEqual({
      aurelie: 'violaine',
      violaine: 'aurelie',
    });
  });

  it('creates a list for three peoples', () => {
    const participants = ['aurelie', 'violaine', 'raspoutine'];
    const secretSantaList = createSecretSantaList(participants);

    const secretSantas = Object.keys(secretSantaList);

    expect(secretSantas).toHaveLength(3);

    for (const participant of participants) {
      expect(secretSantas).toContain(participant);
    }

    const receivers = Object.values(secretSantaList);
    expect(receivers.length).toEqual([...new Set(receivers)].length);

    for (const [secretSanta, receiver] of Object.entries(secretSantaList)) {
      expect(secretSanta).not.toEqual(receiver);
    }
  });

  it('creates a list for n peoples', () => {
    const participants = ['aurelie', 'violaine', 'raspoutine', 'pablo', 'mano', 'guesha'];
    const secretSantaList = createSecretSantaList(participants);

    const secretSantas = Object.keys(secretSantaList);

    expect(secretSantas).toHaveLength(participants.length);

    for (const participant of participants) {
      expect(secretSantas).toContain(participant);
    }

    const receivers = Object.values(secretSantaList);
    expect(receivers.length).toEqual([...new Set(receivers)].length);

    for (const [secretSanta, receiver] of Object.entries(secretSantaList)) {
      expect(secretSanta).not.toEqual(receiver);
    }
  });
});
