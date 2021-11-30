const fs = require("fs");
const path = require("path");
const process = require("process");
const csv2geojson = require("csv2geojson");

const res = {};

const files = fs.readdirSync(path.join(__dirname, "../csv"));
files.sort().forEach((file) => {
  let [number, title] = path.parse(file).name.split("-");
  if (!title) {
    title = number;
  }
  
  const csv = fs.readFileSync(path.join(__dirname, `../csv/${file}`));
  csv2geojson.csv2geojson(csv.toString(), (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      res[title] = data;
    }
  });
});

fs.writeFileSync(
  path.join(__dirname, "../src/generated/feature-collections.json"),
  JSON.stringify(res)
);
