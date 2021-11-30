const fs = require("fs");
const path = require("path");

const fileNameRegexp = /^(\d+-)?(?<name>.*)/
const names = []

const files = fs.readdirSync(path.join(__dirname, "../images"));
files.sort().forEach((file) => {
  const name = file.match(fileNameRegexp).groups.name
  names.push(name)
  fs.copyFileSync(
    path.join(__dirname, `../images/${file}`),
    path.join(__dirname, `../src/images/${name}`)
  );
});

fs.writeFileSync(
  path.join(__dirname, "../src/generated/image-names.json"),
  JSON.stringify(names)
);
