import csvToJson from 'convert-csv-to-json';
import path from 'path';

const readCsv = (file) => {
  const absolutePath = path.join(`${__dirname}/../../`, file);
  const data = csvToJson.getJsonFromCsv(absolutePath);
  return data;
};

export default readCsv;
