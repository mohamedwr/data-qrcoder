const colors = require("colors/safe");

function log(msg, props, log = true) {
  let logger = colors;
  for (prop of props) {
    logger = logger[prop];
  }
  if (!log) {
    return logger(msg);
  }
  console.log(logger(msg));
}

function info(...msg) {
  const title = log(" INFO ", ["bold", "white", "bgBlue"], false);
  console.log(title, ...msg);
}

function success(...msg) {
  const title = log(" SUCCESS ", ["bold", "black", "bgBrightGreen"], false);
  console.log(title, ...msg);
}

function error(...msg) {
  const title = log(" ERROR ", ["bold", "white", "bgRed"], false);
  console.log(title, ...msg);
  process.exit(1);
}

module.exports = {
  info,
  success,
  error
};
