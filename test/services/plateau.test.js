import { isInvalidPosition, validateRoverPosition, isOutsideFromPlateau } from '../../src/services/plateau.service';

describe('Test the method that validate if an individual position is valid', () => {
  test('Tests 1 that should return false', () => {
    expect(isInvalidPosition(1)).toBe(false);
  });
  test('Tests -1 that should return true', () => {
    expect(isInvalidPosition(-1)).toBe(true);
  });
  test('Tests N that should return true', () => {
    expect(isInvalidPosition('N')).toBe(true);
  });
});
