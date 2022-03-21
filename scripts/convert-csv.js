#! /usr/bin/env node

// /csv 以下の CSV ファイルを GeoJSON に変換し、/src/generated に書き出す。

const fs = require("fs");
const path = require("path");
const process = require("process");
const csv2geojson = require("csv2geojson");

const fileNameRegexp = /^(\d+-)?(?<name>.*)/
const res = {};

const files = fs.readdirSync(path.join(__dirname, "../csv"));
files.sort().forEach((file) => {
  const name = path.parse(file).name.match(fileNameRegexp).groups.name
  const csv = fs.readFileSync(path.join(__dirname, `../csv/${file}`));
  csv2geojson.csv2geojson(csv.toString(), (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      res[name] = data;
    }
  });
});

fs.writeFileSync(
  path.join(__dirname, "../src/generated/csv-feature-collections.json"),
  JSON.stringify(res)
);
console.log("Generated /src/generated/csv-feature-collections.json")
