import { getNextDirection, getPreviousDirection, isValidDirection } from './directions.service';
import { isValidPosition, isOutsideFromPlateau } from './plateau.service';
import ValidationError from '../classes/ValidationError';

const ROTATE_INSTRUCTIONS = ['L', 'R'];
const MOVE_INSTRUCTIONS = ['M'];
const VALID_INSTRUCTIONS = [...ROTATE_INSTRUCTIONS, ...MOVE_INSTRUCTIONS];

const isMissingRequiredFields = (object) => !object?.x || !object?.y || !object.facing;

const validateRoverPosition = (object) => {
  if (isMissingRequiredFields(object)) {
    throw new ValidationError('Missing Fields');
  }
  if (!isValidDirection(object.facing)) {
    throw new ValidationError('Invalid facing');
  }
  if (!isValidPosition(object)) {
    throw new ValidationError('Invalid x position');
  }
  if (!isValidPosition(object)) {
    throw new ValidationError('Invalid y position');
  }
};

export const moveForward = (rover) => {
  const newRover = rover;
  switch (newRover.facing) {
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

const rotateLeft = (rover) => {
  const newRover = rover;
  newRover.facing = getPreviousDirection(newRover.facing);
  return newRover;
};

const rotateRight = (rover) => {
  const newRover = rover;
  newRover.facing = getNextDirection(newRover.facing);
  return newRover;
};

export const rotate = (rover, direction) => {
  const directionHandler = {
    L: rotateLeft,
    R: rotateRight,
  };
  return directionHandler[direction](rover);
};

const doInstruction = (finalRoverPosition, instruction) => {
  if (!VALID_INSTRUCTIONS.includes(instruction)) {
    throw new ValidationError('Invalid instruction');
  }
  if (ROTATE_INSTRUCTIONS.includes(instruction)) {
    return rotate(finalRoverPosition, instruction);
  }
  return moveForward(finalRoverPosition);
};

const processInstructions = (rover, instructions) => {
  const individualInstructions = instructions.split('');
  let finalRoverPosition = rover;
  individualInstructions.forEach((instruction) => {
    finalRoverPosition = doInstruction(finalRoverPosition, instruction);
  });
  return finalRoverPosition;
};

const formatRoverPosition = (string) => {
  const [x, y, facing] = string.split(' ');
  return { x: parseInt(x, 10), y: parseInt(y, 10), facing };
};

const buildReturnObject = (referenceRover, instructions, result) => ({
  referenceRover,
  instructions,
  result,
});

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
