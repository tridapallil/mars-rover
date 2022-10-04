import { isEmpty, pick } from 'lodash';
import ValidationError from '../classes/ValidationError';

const parseDataToRovers = (data) => data.map((rover) => (pick(rover, ['coordinates', 'instructions'])));

const formatData = (data) => {
  const upperRight = data.shift();
  const rovers = parseDataToRovers(data);
  const { plateau } = pick(upperRight, ['plateau']);

  if (isEmpty(plateau)) {
    throw new ValidationError('Missing plateau input');
  }

  return {
    upperRight: plateau,
    rovers,
  };
};

export default formatData;
