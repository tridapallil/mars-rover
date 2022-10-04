import { indexOf } from 'lodash';

const DIRECTIONS = ['N', 'E', 'S', 'W'];

/**
 * Get the next direction from array, considering that S is the last postion from array
 * When rotates to right, use this method
 * @param {string} actualDirection
 * @returns {string}
 */
export const getNextDirection = (actualDirection) => {
  const nextDirectionIndex = indexOf(DIRECTIONS, actualDirection) + 1;
  if (nextDirectionIndex > 3) {
    return DIRECTIONS[0];
  }
  return DIRECTIONS[nextDirectionIndex];
};

/**
 * Get the previous direction from array, considering that W is the last postion from array
 * When rotates to left, use this method
 * @param {string} actualDirection
 * @returns {string}
 */
export const getPreviousDirection = (actualDirection) => {
  const previousDirectionIndex = indexOf(DIRECTIONS, actualDirection) - 1;
  if (previousDirectionIndex < 0) {
    return DIRECTIONS[3];
  }
  return DIRECTIONS[previousDirectionIndex];
};

/**
 * Validate if the direction is a valid one
 * @param {string} direction
 * @returns {boolean}
 */
export const isValidDirection = (direction) => {
  if (DIRECTIONS.includes(direction)) {
    return true;
  }
  return false;
};

export default {
  getNextDirection,
};
