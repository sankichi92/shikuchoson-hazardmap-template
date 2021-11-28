const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");

const config = fs.readFileSync(path.join(__dirname, "../hazardmap-config.jsonc"));
const parsedConfig = parse(config.toString());
fs.writeFileSync(
  path.join(__dirname, "../src/generated/hazardmap-config.json"),
  JSON.stringify(parsedConfig)
);
