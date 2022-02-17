const papaparse = require("papaparse");
const u = require("./utils");
const qrcoder = require("./qrcoder");

let delimiter;

function csvParser(csv) {
  const data = papaparse.parse(csv, {
    header: true,
    delimiter
  });
  if (data.errors.length > 0) {
    console.log(data.errors);
    u.log.error("csv file isn't parsed successfully");
  }
  return data.data;
}

module.exports = async (model) => {
  // settings delimiter
  delimiter = model.delimiter;
  // load csv file
  csv = u.loadFile(model.csv, "csv", csvParser);
  // assign ids and qrcodes
  return await qrcoder(csv, model);
};
