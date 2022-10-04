/**
 * Validate individual position, validating the type and value
 * @param {number} position - individual position from rover
 * @returns {boolean}
 */
// eslint-disable-next-line max-len
const isInvalidPosition = (position) => Number.isNaN(position) || !Number.isInteger(position) || position < 0;

/**
 * Validate if the position is valid
 * @param {Object} object
 * @param {number} [Object.x] - x position from rover
 * @param {number} [Object.y] - y position from rover
 * @returns {boolean}
 */
export const isValidPosition = ({ x, y }) => {
  if (isInvalidPosition(x) || isInvalidPosition(y)) {
    return false;
  }
  return true;
};

/**
 * Validate if the position is outsite from plateau
 * @param {number} [Object.x] - x position from rover
 * @param {number} [Object.y] - y position from rover
 * @returns {boolean}
 */
export const isOutsideFromPlateau = ({ x, y }) => {
  if (x < 0 || y < 0) {
    return true;
  }
  return false;
};

export default {
  isValidPosition,
  isOutsideFromPlateau,
};
