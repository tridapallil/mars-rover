import { isInvalidPosition, isRoverPositionValid, isOutsideFromPlateau } from '../../src/services/plateau.service';

describe('Test the method that validate if an individual position is valid', () => {
  test('Tests N that should return true', () => {
    expect(isInvalidPosition('N')).toBe(true);
  });
});

describe('Test the method that validate if the rover position is outside from plateau', () => {
  beforeEach(() => {
    global.plateau = {
      x: 4,
      y: 5,
    };
  });

  test('Tests an invalid position, outside of map', () => {
    const rover = {
      x: 5,
      y: 4,
      heading: 'N',
    };
    expect(isOutsideFromPlateau(rover)).toBe(true);
  });

  test('Tests an valid position, inside of map', () => {
    const rover = {
      x: 4,
      y: 4,
      heading: 'N',
    };
    expect(isOutsideFromPlateau(rover)).toBe(false);
  });

  test('Tests an invalid position, outside of map with negative position', () => {
    const rover = {
      x: -1,
      y: 4,
      heading: 'N',
    };
    expect(isOutsideFromPlateau(rover)).toBe(true);
  });
});

describe('Test the method that validate if the rover position type is valid', () => {
  test('Tests an input with character', () => {
    const rover = {
      x: 'N',
      y: 4,
      heading: 'N',
    };
    expect(isRoverPositionValid(rover)).toBe(false);
  });
  test('Tests an input with integer', () => {
    const rover = {
      x: 5,
      y: 4,
      heading: 'N',
    };
    expect(isRoverPositionValid(rover)).toBe(true);
  });
});
