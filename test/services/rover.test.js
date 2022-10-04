import {
  rotate,
  validateRoverPosition,
  isMissingRequiredFields,
  moveForward,
  rotateRight,
  rotateLeft,
  doInstruction,
  formatRoverPosition,
} from '../../src/services/rover.service';
import ValidationError from '../../src/classes/ValidationError';

describe('Test rover method to rotate', () => {
  test('Tests if will rotate Left', () => {
    let rover = { x: 0, y: 0, heading: 'N' };
    rover = rotate(rover, 'L');

    expect(rover.heading).toBe('W');
  });
  test('Tests if will rotate Right', () => {
    let rover = { x: 0, y: 0, heading: 'N' };
    rover = rotate(rover, 'R');

    expect(rover.heading).toBe('E');
  });
});

describe('Test rover method to rotate Left', () => {
  test('Tests if will rotate Left', () => {
    let rover = { x: 0, y: 0, heading: 'N' };
    rover = rotateLeft(rover);

    expect(rover.heading).toBe('W');
  });
});

describe('Test rover method to rotate Right', () => {
  test('Tests if will rotate right', () => {
    let rover = { x: 0, y: 0, heading: 'N' };
    rover = rotateRight(rover);

    expect(rover.heading).toBe('E');
  });
});

describe('Test rover method that validade the initial value from rover', () => {
  beforeEach(() => {
    global.plateau = {
      x: 4,
      y: 5,
    };
  });

  test('Tests invalid heading', () => {
    const rover = { x: 0, y: 0, heading: 'Z' };

    const validateRover = () => validateRoverPosition(rover);
    expect(validateRover).toThrow(ValidationError);
    expect(validateRover).toThrow('Invalid heading');
  });
  test('Tests if is missing fields', () => {
    const rover = { x: 0, heading: 'N' };

    const validateRover = () => validateRoverPosition(rover);
    expect(validateRover).toThrow(ValidationError);
    expect(validateRover).toThrow('Missing Fields');
  });
  test('Tests invalid x', () => {
    const rover = { x: 'z', y: 0, heading: 'N' };

    const validateRover = () => validateRoverPosition(rover);
    expect(validateRover).toThrow(ValidationError);
    expect(validateRover).toThrow('Invalid x or y position');
  });

  test('Tests invalid y', () => {
    const rover = { x: 0, y: 'v', heading: 'N' };
    const validateRover = () => validateRoverPosition(rover);
    expect(validateRover).toThrow(ValidationError);
    expect(validateRover).toThrow('Invalid x or y position');
  });

  test('Tests outside the map', () => {
    const rover = { x: 0, y: 7, heading: 'N' };
    const validateRover = () => validateRoverPosition(rover);
    expect(validateRover).toThrow(ValidationError);
    expect(validateRover).toThrow('Rover landed outside from plateau');
  });
});

describe('Test method that validade if is missing values from rover object', () => {
  test('Missing y value', () => {
    const rover = { x: 0, heading: 'N' };
    expect(isMissingRequiredFields(rover)).toBe(true);
  });

  test('Has all values from rover', () => {
    const rover = { x: 0, y: 3, heading: 'N' };
    expect(isMissingRequiredFields(rover)).toBe(false);
  });
});

describe('Test rover method that moves forward', () => {
  beforeEach(() => {
    global.plateau = {
      x: 4,
      y: 5,
    };
  });

  test('Tests if will move to north', () => {
    const rover = { x: 3, y: 4, heading: 'N' };
    const roverResult = { x: 3, y: 5, heading: 'N' };

    expect(moveForward(rover)).toEqual(roverResult);
  });

  test('Tests if will move to E', () => {
    const rover = { x: 3, y: 4, heading: 'E' };
    const roverResult = { x: 4, y: 4, heading: 'E' };

    expect(moveForward(rover)).toEqual(roverResult);
  });

  test('Tests if will move to W', () => {
    const rover = { x: 3, y: 4, heading: 'W' };
    const roverResult = { x: 2, y: 4, heading: 'W' };

    expect(moveForward(rover)).toEqual(roverResult);
  });

  test('Tests if will move to S', () => {
    const rover = { x: 3, y: 4, heading: 'S' };
    const roverResult = { x: 3, y: 3, heading: 'S' };

    expect(moveForward(rover)).toEqual(roverResult);
  });

  test('Tests if will throw when moving outside from plateau', () => {
    const rover = { x: 3, y: 5, heading: 'N' };
    const move = () => moveForward(rover);

    expect(move).toThrow(ValidationError);
    expect(move).toThrow('Invalid move, outsite from plateau');
  });
});

describe('Test the method that do Instruction Individual', () => {
  beforeEach(() => {
    global.plateau = {
      x: 4,
      y: 5,
    };
  });

  test('Tests if will throw when trying to do an invalid instruction', () => {
    const rover = { x: 3, y: 5, heading: 'N' };
    const doInstructionMethod = () => doInstruction(rover, 'Z');

    expect(doInstructionMethod).toThrow(ValidationError);
    expect(doInstructionMethod).toThrow('Invalid instruction');
  });
});

describe('Test the method that format the input from rover', () => {
  test('Tests if will formart correctly', () => {
    const stringInput = '3 5 N';
    const roverResult = { x: 3, y: 5, heading: 'N' };
    expect(formatRoverPosition(stringInput)).toEqual(roverResult);
  });
});
