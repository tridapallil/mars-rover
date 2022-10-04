import { getNextDirection, getPreviousDirection } from '../../src/services/directions.service';

describe('Test directions service', () => {
  test('Tests if will 90 degree positive', () => {
    const nextDirection = getNextDirection('N');

    expect(nextDirection).toBe('E');
  });

  test('Tests if will 90 degree negative', () => {
    const previousDirection = getPreviousDirection('S');

    expect(previousDirection).toBe('E');
  });

  test('Tests if will 90 degree negative and go to the last position from positions array', () => {
    const previousDirection = getPreviousDirection('N');

    expect(previousDirection).toBe('W');
  });

  test('Tests if will 90 degree postive and go to the fist position from positions array', () => {
    const nextDirection = getNextDirection('S');

    expect(nextDirection).toBe('W');
  });
});
