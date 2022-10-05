import { runRover } from './rover.service';
import { formatAndValidatePlateau } from './plateau.service';
import ValidationError from '../classes/ValidationError';

global.plateau = {};

/**
 * This is the main navigate method, which process all the rovers and set the plateu value
 * @param {Object} upperRight
 * @param {Array} rovers
 * @returns {Array}
 */
export const navigate = ({ upperRight, rovers }) => {
  try {
    const formatedPlateau = formatAndValidatePlateau(upperRight);
    global.plateau = formatedPlateau;
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
