import { rotate } from '../../src/services/rover.service';

describe('Test rover', () => {
  test('Tests if will rotate', () => {
    let rover = { x: 0, y: 0, heading: 'N' };
    rover = rotate(rover, 'L');

    expect(rover.heading).toBe('W');
  });
});
