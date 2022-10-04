import readCsv from './utils/read-csv';
import { runRover } from './services/rover.service';

const process = (data) => data.map((rover) => runRover(rover));

const init = () => {
  const rovers = readCsv('./rovers.csv');
  const result = process(rovers);
  console.log(result);
};

init();
