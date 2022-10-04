import readCsv from './utils/read-csv';
import formatData from './utils/format-data';
import { navigate } from './services/navigate.service';

const init = () => {
  const dataFromCsv = readCsv('./rovers.csv');
  const parsedData = formatData(dataFromCsv);
  const result = navigate(parsedData);
};

init();
