#! /usr/bin/env node

// hazardmap-config.jsonc (JSON with Comments) を純粋な JSON に変換して /src/generated に書き出す。

const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");

const config = fs.readFileSync(
  path.join(__dirname, "../hazardmap-config.jsonc")
);
const parsedConfig = parse(config.toString());
fs.writeFileSync(
  path.join(__dirname, "../src/generated/hazardmap-config.json"),
  JSON.stringify(parsedConfig)
);
console.log("Generated /src/generated/hazardmap-config.json")
