import { getNextDirection, getPreviousDirection, isValidDirection } from '../../src/services/directions.service';

describe('Test the method that get next directions', () => {
  test('Tests if will 90 degree positive', () => {
    const nextDirection = getNextDirection('N');

    expect(nextDirection).toBe('E');
  });

  test('Tests if will 90 degree negative', () => {
    const previousDirection = getPreviousDirection('S');

    expect(previousDirection).toBe('E');
  });

  test('Tests if will 90 degree negative and go to the last position from array', () => {
    const previousDirection = getPreviousDirection('N');

    expect(previousDirection).toBe('W');
  });

  test('Tests if will 90 degree postive and go to the fist position from array', () => {
    const nextDirection = getNextDirection('S');

    expect(nextDirection).toBe('W');
  });
});

describe('Test the method that validate if is a valid direction', () => {
  test('Tests N direction that should return true', () => {
    expect(isValidDirection('N')).toBe(true);
  });

  test('Tests E direction that should return true', () => {
    expect(isValidDirection('E')).toBe(true);
  });

  test('Tests S direction that should return true', () => {
    expect(isValidDirection('S')).toBe(true);
  });

  test('Tests W direction that should return true', () => {
    expect(isValidDirection('W')).toBe(true);
  });

  test('Tests Z direction that should return false, because is an invalid direction', () => {
    expect(isValidDirection('Z')).toBe(false);
  });
});
