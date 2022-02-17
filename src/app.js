const fs = require("fs");
const del = require("del");
const u = require("./utils/utils");
const model = require("./utils/model");
const parse = require("./utils/parser");

async function perform() {
  // init
  del.sync("output", { force: true });

  // parsing process args to get model path
  const args = process.argv;
  const modelPath = args[args.length - 1];

  // parse the model
  const modelData = model(modelPath);

  // parse the CSV file
  const data = await parse(modelData);

  // save the data file
  u.catcher(
    fs.writeFileSync,
    "could not save data file",
    "./output/data.json",
    JSON.stringify(data)
  );

  console.log();
  u.log.success("qrcoded data successfully");
}
perform();
