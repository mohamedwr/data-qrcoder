const path = require("path");
const fs = require("fs");
const log = require("./logger");

// a simple try-catch code wrapper
function catcher(func, errorMsg, ...params) {
  try {
    return func(...params);
  } catch (error) {
    console.log(error);
    log.error(errorMsg);
  }
}

function parsePath(filepath) {
  return path.isAbsolute(filepath)
    ? modelPathArg
    : path.resolve(__dirname, "../", filepath);
}

function loadFile(filepath, filename, parser = null) {
  // get file path
  filepath = parsePath(filepath, filename);
  log.info(`loading ${filename}`, filepath);
  // check its existence
  if (!fs.existsSync(filepath)) {
    log.error(`${filename} file does not exist`);
  }
  // read file binary
  file = catcher(
    fs.readFileSync,
    "could not load model file",
    filepath,
    "utf-8"
  );
  log.info(`loaded ${filename}`);
  // parse file binary
  let parsed;
  if (parser) {
    parsed = catcher(parser, `couldn't parse ${filename}`, file);
  } else {
    parsed = catcher(JSON.parse, `${filename} is not proper JSON`, file);
  }
  log.info(`parsed ${filename}`);
  return parsed;
}

module.exports = {
  log,
  catcher,
  loadFile
};
