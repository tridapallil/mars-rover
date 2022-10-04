import { runRover } from './rover.service';
import { formatAndValidatePlateau } from './plateau.service';
import ValidationError from '../classes/ValidationError';

export const navigate = ({ upperRight, rovers }) => {
  try {
    const formatedPlateau = formatAndValidatePlateau(upperRight);
    const process = rovers.map((rover) => runRover(rover, formatedPlateau));
    return process;
  } catch (error) {
    if (error instanceof ValidationError) {
      return error.message;
    }
    return 'Internal Error';
  }
};

export default { navigate };
