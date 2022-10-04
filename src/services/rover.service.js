import { getNextDirection, getPreviousDirection, isValidDirection } from './directions.service';

const isMissingRequiredFields = (object) => !object?.x || !object?.y || !object.face;

const isAValidPosition = (position) => Number.isNaN(position) || !Number.isInteger(position) || position < 0;

const validateRover = (object) => {
  if (isMissingRequiredFields(object)) {
    throw new Error('Missing Fields');
  }
  if (!isValidDirection(object.face)) {
    throw new Error('Invalid face');
  }
  if (!isAValidPosition(object?.x)) {
    throw new Error('Invalid x position');
  }
  if (isAValidPosition(object?.y)) {
    throw new Error('Invalid y position');
  }
};

export const moveForward = (rover) => {
  const newRover = rover;
  switch (newRover.face) {
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
  return newRover;
};

const rotateLeft = (rover) => {
  const newRover = rover;
  newRover.face = getPreviousDirection(newRover.face);
  return newRover;
};

const rotateRight = (rover) => {
  const newRover = rover;
  newRover.face = getNextDirection(newRover.face);
  return newRover;
};

export const rotate = (rover, direction) => {
  const directionHandler = {
    L: rotateLeft,
    R: rotateRight,
  };
  return directionHandler[direction](rover);
};

const doInstruction = (instruction) => {
  if (['L', 'R'].includes(instruction)) {
    return rotate(instruction);
  }
  return moveForward(instruction);
};

const proccessInstructions = (rover, instructions) => {
  const individualInstructions = instructions.split('');
  let finalRoverPosition = rover;
  individualInstructions.forEach((instruction) => {
    finalRoverPosition = doInstruction(instruction);
  });
  return finalRoverPosition;
};

export const runRover = ({ coordinates, instructions }) => {
  validateRover(coordinates);
  proccessInstructions(coordinates, instructions);
};

export default {
  validateRover,
  rotate,
  moveForward,
};
