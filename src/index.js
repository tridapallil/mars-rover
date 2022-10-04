import readCsv from './utils/read-csv';
import { runRover } from './services/rover.service';

const process = (data) => data.map((rover) => runRover(rover));

const init = () => {
  const rovers = readCsv('./rovers.csv');
  // const rovers = [
  //   { coordinates: '1 2 N', instructions: 'LMLMLMLMM' },
  //   { coordinates: '3 3 E', instructions: 'MRRMMRMRRM' },
  // ];
  const result = process(rovers);
  console.log(result);
};

init();
