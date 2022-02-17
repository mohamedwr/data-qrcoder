const u = require("./utils");

function stringErrorMsg(property) {
  u.log.error(`model.${property} is not a string`);
}

function checkString(property, propertyName) {
  if (typeof property !== "string") {
    stringErrorMsg(propertyName);
  }
}

function check(model) {
  u.log.info("checking model");
  // csv
  checkString(model.csv, "csv");
  // delimiter
  if (model.delimiter !== undefined && typeof model.delimiter !== "string") {
    stringErrorMsg("delimiter");
  }
  // id
  if (typeof model.id !== "object") {
    u.log.error("model.id is not an object");
  }
  checkString(model.id.prefix, "id.prefix");
  if (typeof model.id.max !== "number") {
    u.log.error("model.id.max is not a number");
  }
  checkString(model.id.property, "id.property");
  // qrcodeBinary
  if (typeof model.qrcodeBinary === "string") {
    model.qrcodeBinary = model.qrcodeBinary.toLowerCase();
  }
  if (!["png", "svg"].includes(model.qrcodeBinary)) {
    u.log.error("model.qrcodeBinary: only supported binaries are png and svg");
  }
  // database
  if (model.database && !Array.isArray(model.database)) {
    u.log.error("model.database is not an array");
  } else if (model.database) {
    // database children
    for (const database in model.database) {
      checkString(model.database[database], `database[${database}]`);
    }
  }
  u.log.info("checked model");
  return model;
}

function loadDatabase(database) {
  u.log.info("loading database");
  for (const file in database) {
    const parsed = u.loadFile(database[file], `database: ${database[file]}`);
    if (!Array.isArray(parsed)) {
      u.log.error(`invalid database: ${database[file]}`);
    }
    database[file] = parsed;
  }
  u.log.info("parsed database");
  return database;
}

module.exports = (modelPath) => {
  // load the model
  let model = u.loadFile(modelPath, "model");
  // check the model
  model = check(model);
  // load database files
  if (model.database) {
    model.database = loadDatabase(model.database);
  } else {
    model.database = [];
  }
  return model;
};
