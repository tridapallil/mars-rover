import csvToJson from 'convert-csv-to-json';

const readCsv = (file) => {
  const data = csvToJson.getJsonFromCsv(file);
  return data;
};

export default readCsv;
