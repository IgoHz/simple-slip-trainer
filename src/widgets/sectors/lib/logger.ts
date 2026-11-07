import { PlaybackSequence } from '@/entities/combination';

export function logSequenceDev(
  sequence: PlaybackSequence,
  forceLog = false
): void {
  if (!forceLog && process.env.NODE_ENV !== 'development') {
    return;
  }

  if (sequence.type === 'combination') {
    const punches = sequence.steps
      .filter((s) => !s.isRest && s.sectorIndex >= 0)
      .map((s) => s.position ?? s.punchType ?? 'punch')
      .join(' → ');

    console.log(
      `🥊 [Trainer] Combo: "${sequence.combinationName ?? sequence.combinationId}" (${punches})`
    );
  } else {
    const punch = sequence.steps[0];
    console.log(
      `🥊 [Trainer] Single Punch: ${punch?.position ?? punch?.punchType ?? 'punch'}`
    );
  }
}
