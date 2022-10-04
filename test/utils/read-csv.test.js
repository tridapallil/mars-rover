import readCsv from '../../src/utils/read-csv';

describe('Test rover', () => {
  test('Tests if will rotate', () => {
    const resultData = readCsv('rovers.csv');
    const expectedData = [
      { coordinates: '1 2 N', instructions: 'LMLMLMLMM' },
      { coordinates: '3 3 E', instructions: 'MRRMMRMRRM' },
    ];

    expect(resultData).toEqual(expectedData);
  });
});
