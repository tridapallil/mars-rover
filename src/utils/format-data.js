import { pick } from 'lodash';

const parseDataToRovers = (data) => data.map((rover) => (pick(rover, ['coordinates', 'instructions'])));

const formatData = (data) => {
  const upperRight = data.shift();
  const rovers = parseDataToRovers(data);

  return {
    upperRight: upperRight.plateau,
    rovers,
  };
};

export default formatData;
