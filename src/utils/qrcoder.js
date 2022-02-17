const fs = require("fs");
const qrcode = require("qrcode");
const u = require("./utils");

function init() {
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
    fs.mkdirSync("output/qrcodes");
  } else if (!fs.existsSync("output/qrcodes")) {
    fs.mkdirSync("output/qrcodes");
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateID(prefix, max, property, databases) {
  const id = `${prefix}-${rand(0, max)}`;
  for (const database of databases) {
    for (const record of database) {
      if (record[property] == id) {
        return generateID(prefix, max, property, databases);
      }
    }
  }
  return id;
}

module.exports = async (csv, model) => {
  init();
  const data = [];
  for (const record in csv) {
    const id = generateID(model.id.prefix, model.id.max, model.id.property, [
      data,
      ...model.database
    ]);
    u.log.info(`row ${parseInt(record) + 1}: generated id`, id);
    data.push({
      ...csv[record],
      [model.id.property]: id
    });
    try {
      const qr = await qrcode.toFile(
        `output/qrcodes/${id}.${model.qrcodeBinary}`,
        [{ data: id, mode: "alphanumeric" }]
      );
      u.log.info(
        `row ${parseInt(record) + 1}: generated qrcode`,
        `${id}.${model.qrcodeBinary}`
      );
    } catch (error) {
      u.log.error(`row ${parseInt(record) + 1}: failed to make qrcode`, error);
    }
  }
  return data;
};
