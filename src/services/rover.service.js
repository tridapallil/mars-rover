import { isEmpty } from 'lodash';
import { getNextDirection, getPreviousDirection, isValidDirection } from './directions.service';
import { isRoverPositionValid, isOutsideFromPlateau } from './plateau.service';
import ValidationError from '../classes/ValidationError';

const ROTATE_INSTRUCTIONS = ['L', 'R'];
const MOVE_INSTRUCTIONS = ['M'];
const VALID_INSTRUCTIONS = [...ROTATE_INSTRUCTIONS, ...MOVE_INSTRUCTIONS];

/**
 * Validate if is missing a required field from rover
 * @param {Object} object - x position from rover
 * @param {number} [object.x] - x position from rover
 * @param {number} [object.y] - y position from rover
 * @param {string} [object.heading] - where the rover is heading
 * @returns {boolean}
 */
export const isMissingRequiredFields = (object) => {
  const requiredFields = ['x', 'y', 'heading'];
  const keys = Object.keys(object);
  const missingKeys = requiredFields.filter((missingKey) => !keys.includes(missingKey));
  return !isEmpty(missingKeys);
};

/**
 * Validate if the rover input is valid
 * @param {Object} object - x position from rover
 * @param {number} [object.x] - x position from rover
 * @param {number} [object.y] - y position from rover
 * @param {string} [object.heading] - where the rover is heading
 * @returns {boolean}
 */
export const validateRoverPosition = (object) => {
  if (isMissingRequiredFields(object)) {
    throw new ValidationError('Missing Fields');
  }
  if (!isValidDirection(object.heading)) {
    throw new ValidationError('Invalid heading');
  }
  if (!isRoverPositionValid(object)) {
    throw new ValidationError('Invalid x or y position');
  }
  if (isOutsideFromPlateau(object)) {
    throw new ValidationError('Rover landed outside from plateau');
  }
};

/**
 * Receive the rover and return it with the updated x/y
 * position, according to the current heading and position
 * Will throw if is an invalid move (outside from plateau)
 * @param {Object} rover - x position from rover
 * @param {number} [rover.x] - x position from rover
 * @param {number} [rover.y] - y position from rover
 * @param {string} [rover.heading] - where the rover is heading
 * @returns {Object}
 */
export const moveForward = (rover) => {
  const newRover = rover;
  switch (newRover.heading) {
    case 'N':
      newRover.y += 1;
      break;
    case 'E':
      newRover.x += 1;
      break;
    case 'S':
      newRover.y -= 1;
      break;
    case 'W':
      newRover.x -= 1;
      break;
    default:
      break;
  }
  if (isOutsideFromPlateau(newRover)) {
    throw new ValidationError('Invalid move, outsite from plateau');
  }
  return newRover;
};

/**
 * Receive the rover and return it rotating to Left
 * @param {Object} rover - x position from rover
 * @param {number} [rover.x] - x position from rover
 * @param {number} [rover.y] - y position from rover
 * @param {string} [rover.heading] - where the rover is heading
 * @returns {Object}
 */
export const rotateLeft = (rover) => {
  const newRover = rover;
  newRover.heading = getPreviousDirection(newRover.heading);
  return newRover;
};

/**
 * Receive the rover and return it rotating to Right
 * @param {Object} rover - x position from rover
 * @param {number} [rover.x] - x position from rover
 * @param {number} [rover.y] - y position from rover
 * @param {string} [rover.heading] - where the rover is heading
 * @returns {Object}
 */
export const rotateRight = (rover) => {
  const newRover = rover;
  newRover.heading = getNextDirection(newRover.heading);
  return newRover;
};

/**
 * Receive the rover and return it rotating to the input.
 * This is a handler to call the right method to rotate Left or Right
 * @param {Object} rover - x position from rover
 * @param {number} [rover.x] - x position from rover
 * @param {number} [rover.y] - y position from rover
 * @param {string} [rover.heading] - where the rover is heading
 * @param {string} direction - where the rover is heading
 * @returns {Object}
 */
export const rotate = (rover, direction) => {
  const directionHandler = {
    L: rotateLeft,
    R: rotateRight,
  };
  return directionHandler[direction](rover);
};

/**
 * Receive the rover and return the new one doing the actual instruction.
 * Will throw if is an invalid instruction
 * @param {Object} rover - x position from rover
 * @param {number} [rover.x] - x position from rover
 * @param {number} [rover.y] - y position from rover
 * @param {string} [rover.heading] - where the rover is heading
 * @param {string} direction - where the rover is heading
 * @returns {Object}
 */
export const doInstruction = (rover, instruction) => {
  if (!VALID_INSTRUCTIONS.includes(instruction)) {
    throw new ValidationError('Invalid instruction');
  }
  if (ROTATE_INSTRUCTIONS.includes(instruction)) {
    return rotate(rover, instruction);
  }
  return moveForward(rover);
};

/**
 * Receive the rover and return the final position
 * @param {Object} rover - x position from rover
 * @param {number} [rover.x] - x position from rover
 * @param {number} [rover.y] - y position from rover
 * @param {string} [rover.heading] - where the rover is heading
 * @param {Array} instructions - array of instruction
 * @returns {Object}
 */
const processInstructions = (rover, instructions) => {
  const individualInstructions = instructions.trim().split('');
  let finalRoverPosition = rover;
  individualInstructions.forEach((instruction) => {
    finalRoverPosition = doInstruction(finalRoverPosition, instruction);
  });
  return finalRoverPosition;
};

/**
 * Format the rover's input
 * @param {string} string
 * @returns {Object}
 */
export const formatRoverPosition = (string) => {
  const [x, y, heading] = string.replace(/\s/g, '').split('');
  return { x: parseInt(x, 10), y: parseInt(y, 10), heading };
};

/**
 * Format the object that will be printed
 * @param {Object} referenceRover
 * @param {string} instructions
 * @param {Object} result
 * @returns {Object}
 */
const buildReturnObject = (referenceRover, instructions, result) => ({
  referenceRover,
  instructions,
  result,
});

/**
 * Do the instrucions from rover
 * @param {Object} coordinates -- Coordinates that is where the rover is
 * @param {string} instructions
 * @returns {Object}
 */
export const runRover = ({ coordinates, instructions }) => {
  try {
    const rover = formatRoverPosition(coordinates);
    validateRoverPosition(rover);
    const finalRoverPosition = processInstructions(rover, instructions);
    return buildReturnObject(coordinates, instructions, finalRoverPosition);
  } catch (error) {
    if (error instanceof ValidationError) {
      return buildReturnObject(coordinates, instructions, error.message);
    }
    return buildReturnObject(coordinates, instructions, 'Internal Error');
  }
};

export default {
  validateRoverPosition,
  rotate,
  moveForward,
};
