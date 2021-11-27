const fs = require("fs");
const path = require("path");
const csv2geojson = require("csv2geojson");
const { abort } = require("process");

const res = {};

const files = fs.readdirSync(path.join(__dirname, "../csv"));
files.forEach((file) => {
  const title = path.parse(file).name;
  const csv = fs.readFileSync(path.join(__dirname, `../csv/${file}`));
  csv2geojson.csv2geojson(csv.toString(), (err, data) => {
    if (err) {
      abort(err);
    } else {
      res[title] = data;
    }
  });
});

fs.writeFileSync(
  path.join(__dirname, "../src/features.json"),
  JSON.stringify(res)
);
