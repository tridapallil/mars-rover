import ValidationError from '../classes/ValidationError';

/**
 * Validate individual position, validating the type and value
 * @param {number} position - individual position from rover
 * @returns {boolean}
 */
// eslint-disable-next-line max-len
export const isInvalidPosition = (position) => Number.isNaN(position) || !Number.isInteger(position);

/**
 * Validate if the positions from a rover object
 * @param {Object} object
 * @param {number} [Object.x] - x position from rover
 * @param {number} [Object.y] - y position from rover
 * @returns {boolean}
 */
export const isRoverPositionValid = ({ x, y }) => {
  if (isInvalidPosition(x)
  || isInvalidPosition(y)
  ) {
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
  if (x < 0 || y < 0 || x > global.plateau.x || y > global.plateau.y) {
    return true;
  }
  return false;
};

/**
 * Format And Validate plateau Input
 * @param {string} plateau - string input
 * @returns {boolean}
 */
export const validatePlateau = (plateau) => {
  if (!plateau.x) {
    throw new ValidationError('Missing X position for plateau');
  }
  if (!plateau.y) {
    throw new ValidationError('Missing Y position for plateau');
  }
  if (isInvalidPosition(plateau.x) || isInvalidPosition(plateau.y)) {
    throw new ValidationError('Invalid plateau input');
  }
};

/**
 * Format And Validate plateau Input
 * @param {string} plateau - string input
 * @returns {boolean}
 */
export const formatAndValidatePlateau = (plateau) => {
  const [x, y] = plateau.trim().split(' ');
  const formatedPlateau = { x: parseInt(x, 10), y: parseInt(y, 10) };
  validatePlateau(formatedPlateau);
  return formatedPlateau;
};

export default {
  isInvalidPosition,
  isRoverPositionValid,
  isOutsideFromPlateau,
};
