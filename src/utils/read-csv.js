import csvToJson from 'convert-csv-to-json';
import path from 'path';

/**
 * This method read a csv file and returns an array of objects
 * @param {string} file -- string with the file name. Must be on root of the project
 * @returns {Array}
 */
const readCsv = (file) => {
  const absolutePath = path.join(`${__dirname}/../../`, file);
  const data = csvToJson.getJsonFromCsv(absolutePath);
  return data;
};

export default readCsv;
