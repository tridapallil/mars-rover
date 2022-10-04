import { navigate } from '../../src/services/navigate.service';

describe('Test rover full navigate', () => {
  test('Tests if two rovers will navigate correctly and validate global plateau value', () => {
    const inputData = {
      upperRight: '4 5',
      rovers: [
        { coordinates: '1 2 N', instructions: 'LMLMLMLMM' },
        { coordinates: '3 3 E', instructions: 'MRRMMRMRRM' },
      ],
    };

    const plateauResult = { x: 4, y: 5 };
    const resultData = [
      {
        referenceRover: '1 2 N',
        instructions: 'LMLMLMLMM',
        result: { x: 1, y: 3, heading: 'N' },
      },
      {
        referenceRover: '3 3 E',
        instructions: 'MRRMMRMRRM',
        result: { x: 2, y: 3, heading: 'S' },
      },
    ];

    expect(navigate(inputData)).toEqual(resultData);
    expect(global.plateau).toEqual(plateauResult);
  });

  test('Tests if will return message that is an invalid input from rover', () => {
    const inputData = {
      upperRight: '4 5',
      rovers: [
        { coordinates: '1 2 N', instructions: 'LMLMLMLMZ' },
        { coordinates: '3 3 E', instructions: 'MRRMMRMRRM' },
      ],
    };

    const plateauResult = { x: 4, y: 5 };
    const resultData = [
      {
        referenceRover: '1 2 N',
        instructions: 'LMLMLMLMZ',
        result: 'Invalid instruction',
      },
      {
        referenceRover: '3 3 E',
        instructions: 'MRRMMRMRRM',
        result: { x: 2, y: 3, heading: 'S' },
      },
    ];

    expect(navigate(inputData)).toEqual(resultData);
    expect(global.plateau).toEqual(plateauResult);
  });
});
