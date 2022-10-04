import formatData from '../../src/utils/format-data';

describe('Test rover', () => {
  test('Tests if will rotate', () => {
    const inputData = [
      { coordinates: '', instructions: '', plateau: '4 5' },
      { coordinates: '1 2 N', instructions: 'LMLMLMLMM', plateau: '' },
      { coordinates: '3 3 E', instructions: 'MRRMMRMRRM', plateau: '' },
    ];

    const resultData = {
      upperRight: '4 5',
      rovers: [
        { coordinates: '1 2 N', instructions: 'LMLMLMLMM' },
        { coordinates: '3 3 E', instructions: 'MRRMMRMRRM' },
      ],
    };
    expect(formatData(inputData)).toEqual(resultData);
  });
});
