import {
  PRESET_COMBINATIONS,
  PunchCombination,
  resolveSectorIndexForPunch,
  selectSequence
} from '@/entities/combination';
import {
  getPunchType,
  PunchType,
  SectorPosition,
  sectorPositionsConfig,
  toPunchType
} from '@/entities/sector';
import { TrainingMode } from '@/entities/session';

describe('Sequence Selector', () => {
  describe('resolveSectorIndexForPunch', () => {
    it('returns exact sector index directly for SectorPosition without randomness', () => {
      expect(
        resolveSectorIndexForPunch(SectorPosition.UPPER_LEFT_STRAIGHT)
      ).toBe(sectorPositionsConfig.indexOf(SectorPosition.UPPER_LEFT_STRAIGHT));
      expect(
        resolveSectorIndexForPunch(SectorPosition.UPPER_RIGHT_STRAIGHT)
      ).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.UPPER_RIGHT_STRAIGHT)
      );
      expect(
        resolveSectorIndexForPunch(SectorPosition.LOWER_LEFT_STRAIGHT)
      ).toBe(sectorPositionsConfig.indexOf(SectorPosition.LOWER_LEFT_STRAIGHT));
      expect(
        resolveSectorIndexForPunch(SectorPosition.LOWER_RIGHT_STRAIGHT)
      ).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.LOWER_RIGHT_STRAIGHT)
      );
      expect(resolveSectorIndexForPunch(SectorPosition.LEFT_UPPER)).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.LEFT_UPPER)
      );
      expect(resolveSectorIndexForPunch(SectorPosition.RIGHT_UPPER)).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.RIGHT_UPPER)
      );
      expect(resolveSectorIndexForPunch(SectorPosition.LEFT_LOWER)).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.LEFT_LOWER)
      );
      expect(resolveSectorIndexForPunch(SectorPosition.RIGHT_LOWER)).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.RIGHT_LOWER)
      );
    });

    it('returns a sector index that maps to the requested legacy PunchType', () => {
      const punchTypes = [
        PunchType.LEFT_HOOK,
        PunchType.RIGHT_HOOK,
        PunchType.LEFT_STRAIGHT,
        PunchType.RIGHT_STRAIGHT
      ];

      for (const punch of punchTypes) {
        const index = resolveSectorIndexForPunch(punch);
        const position = sectorPositionsConfig[index];
        expect(getPunchType(position)).toBe(punch);
      }
    });

    it('alternates position when consecutive punches share the same generic punch type', () => {
      // LEFT_STRAIGHT has UPPER_LEFT_STRAIGHT (4) and LOWER_LEFT_STRAIGHT (6)
      const firstIndex = 4;
      const secondIndex = resolveSectorIndexForPunch(
        PunchType.LEFT_STRAIGHT,
        firstIndex
      );
      expect(secondIndex).toBe(6);

      const thirdIndex = resolveSectorIndexForPunch(
        PunchType.LEFT_STRAIGHT,
        secondIndex
      );
      expect(thirdIndex).toBe(4);
    });

    it('defaults to 0 if an invalid punch type is supplied', () => {
      const index = resolveSectorIndexForPunch(
        'unknown' as unknown as PunchType
      );
      expect(index).toBe(0);
    });
  });

  describe('selectSequence in RANDOM_SINGLES mode', () => {
    it('returns a 1-step sequence with the training rate duration', () => {
      const result = selectSequence({
        mode: TrainingMode.RANDOM_SINGLES,
        rateCadence: 2000,
        prevIndex: 0,
        prevRepeatCount: 0
      });

      expect(result.sequence.type).toBe('single');
      expect(result.sequence.steps).toHaveLength(1);
      expect(result.sequence.steps[0].durationMs).toBe(2000);
      expect(result.sequence.steps[0].sectorIndex).toBeGreaterThanOrEqual(0);
      expect(result.sequence.steps[0].sectorIndex).toBeLessThan(
        sectorPositionsConfig.length
      );
      expect(result.nextIndex).toBe(result.sequence.steps[0].sectorIndex);
      expect(result.nextRepeatCount).toBeGreaterThanOrEqual(1);
    });
  });

  describe('selectSequence in COMBINATIONS mode', () => {
    it('returns a combination sequence matching the configured combination punches in exact order', () => {
      // Deterministic selection of the first combination: Jab-Cross (1-2)
      const mockRandom = () => 0; // Selects index 0
      const result = selectSequence(
        {
          mode: TrainingMode.COMBINATIONS,
          rateCadence: 2000,
          combinations: PRESET_COMBINATIONS,
          defaultIntervalMs: 600,
          prevIndex: 0,
          prevRepeatCount: 0
        },
        mockRandom
      );

      const expectedCombo = PRESET_COMBINATIONS[0];
      expect(result.sequence.type).toBe('combination');
      expect(result.sequence.combinationId).toBe(expectedCombo.id);
      expect(result.sequence.combinationName).toBe(expectedCombo.name);

      // Steps include punch steps + 1 final rest step
      expect(result.sequence.steps).toHaveLength(
        expectedCombo.punches.length + 1
      );

      // Verify punch order
      expectedCombo.punches.forEach((punch, idx) => {
        const step = result.sequence.steps[idx];
        expect(step.position).toBe(punch);
        expect(step.punchType).toBe(toPunchType(punch));
        expect(step.durationMs).toBe(600);
        expect(step.isRest).toBeFalsy();
        const pos = sectorPositionsConfig[step.sectorIndex];
        expect(pos).toBe(punch);
      });

      // Verify trailing rest step
      const restStep = result.sequence.steps[result.sequence.steps.length - 1];
      expect(restStep.isRest).toBe(true);
      expect(restStep.sectorIndex).toBe(-1);
      expect(restStep.durationMs).toBe(2000);
    });

    it('defaults combination punch interval to rateCadence when no intervalMs is specified', () => {
      const mockRandom = () => 0;
      const result = selectSequence(
        {
          mode: TrainingMode.COMBINATIONS,
          rateCadence: 2000,
          combinations: PRESET_COMBINATIONS
        },
        mockRandom
      );

      const expectedCombo = PRESET_COMBINATIONS[0];
      for (let i = 0; i < expectedCombo.punches.length; i++) {
        expect(result.sequence.steps[i].durationMs).toBe(2000);
      }
    });

    it('executes combinations with direct selections of upper and lower punches deterministically', () => {
      const directCombo: PunchCombination = {
        id: 'user-combo',
        name: 'Upper Left Straight - Upper Right Straight - Lower Right Hook',
        punches: [
          SectorPosition.UPPER_LEFT_STRAIGHT,
          SectorPosition.UPPER_RIGHT_STRAIGHT,
          SectorPosition.RIGHT_LOWER
        ]
      };

      const result = selectSequence({
        mode: TrainingMode.COMBINATIONS,
        rateCadence: 2000,
        combinations: [directCombo]
      });

      expect(result.sequence.steps).toHaveLength(4); // 3 punches + 1 rest

      // Step 0: upper left straight
      expect(result.sequence.steps[0].sectorIndex).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.UPPER_LEFT_STRAIGHT)
      );
      expect(result.sequence.steps[0].position).toBe(
        SectorPosition.UPPER_LEFT_STRAIGHT
      );
      expect(result.sequence.steps[0].punchType).toBe(PunchType.LEFT_STRAIGHT);

      // Step 1: upper right straight
      expect(result.sequence.steps[1].sectorIndex).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.UPPER_RIGHT_STRAIGHT)
      );
      expect(result.sequence.steps[1].position).toBe(
        SectorPosition.UPPER_RIGHT_STRAIGHT
      );
      expect(result.sequence.steps[1].punchType).toBe(PunchType.RIGHT_STRAIGHT);

      // Step 2: lower right hook
      expect(result.sequence.steps[2].sectorIndex).toBe(
        sectorPositionsConfig.indexOf(SectorPosition.RIGHT_LOWER)
      );
      expect(result.sequence.steps[2].position).toBe(
        SectorPosition.RIGHT_LOWER
      );
      expect(result.sequence.steps[2].punchType).toBe(PunchType.RIGHT_HOOK);
    });

    it('respects custom intervalMs override in combinations', () => {
      const customCombo: PunchCombination = {
        id: 'fast-1-2',
        name: 'Fast 1-2',
        punches: [PunchType.LEFT_STRAIGHT, PunchType.RIGHT_STRAIGHT],
        intervalMs: 400
      };

      const result = selectSequence({
        mode: TrainingMode.COMBINATIONS,
        rateCadence: 1500,
        combinations: [customCombo],
        defaultIntervalMs: 600
      });

      expect(result.sequence.steps[0].durationMs).toBe(400);
      expect(result.sequence.steps[1].durationMs).toBe(400);
      expect(result.sequence.steps[2].durationMs).toBe(1500); // rest step
    });

    it('handles combination containing a single punch', () => {
      const singlePunchCombo: PunchCombination = {
        id: 'solo-jab',
        name: 'Solo Jab',
        punches: [PunchType.LEFT_STRAIGHT],
        intervalMs: 500
      };

      const result = selectSequence({
        mode: TrainingMode.COMBINATIONS,
        rateCadence: 2000,
        combinations: [singlePunchCombo]
      });

      expect(result.sequence.steps).toHaveLength(2); // 1 punch + 1 rest
      expect(result.sequence.steps[0].punchType).toBe(PunchType.LEFT_STRAIGHT);
      expect(result.sequence.steps[0].durationMs).toBe(500);
      expect(result.sequence.steps[1].isRest).toBe(true);
    });

    it('falls back to single punch sequence if combinations list is empty', () => {
      const result = selectSequence({
        mode: TrainingMode.COMBINATIONS,
        rateCadence: 2000,
        combinations: []
      });

      expect(result.sequence.type).toBe('single');
      expect(result.sequence.steps).toHaveLength(1);
    });

    it('falls back to single punch sequence if all combinations are invalid', () => {
      const result = selectSequence({
        mode: TrainingMode.COMBINATIONS,
        rateCadence: 2000,
        combinations: [{ id: '', name: '', punches: [] }]
      });

      expect(result.sequence.type).toBe('single');
      expect(result.sequence.steps).toHaveLength(1);
    });

    it('clamps interval to minimum 50ms if extremely short timing interval provided', () => {
      const fastCombo: PunchCombination = {
        id: 'ultra-fast',
        name: 'Ultra Fast',
        punches: [PunchType.LEFT_HOOK],
        intervalMs: 10
      };

      const result = selectSequence({
        mode: TrainingMode.COMBINATIONS,
        rateCadence: 2000,
        combinations: [fastCombo]
      });

      expect(result.sequence.steps[0].durationMs).toBe(50);
    });
  });

  describe('selectSequence in MIXED mode', () => {
    it('selects combination when randomFn < mixedProbability', () => {
      const mockRandom = () => 0.2; // 0.2 < 0.5 -> Combination
      const result = selectSequence(
        {
          mode: TrainingMode.MIXED,
          rateCadence: 2000,
          combinations: PRESET_COMBINATIONS,
          mixedProbability: 0.5
        },
        mockRandom
      );

      expect(result.sequence.type).toBe('combination');
    });

    it('selects single punch when randomFn >= mixedProbability', () => {
      const mockRandom = () => 0.8; // 0.8 >= 0.5 -> Single
      const result = selectSequence(
        {
          mode: TrainingMode.MIXED,
          rateCadence: 2000,
          combinations: PRESET_COMBINATIONS,
          mixedProbability: 0.5
        },
        mockRandom
      );

      expect(result.sequence.type).toBe('single');
      expect(result.sequence.steps).toHaveLength(1);
    });
  });
});
