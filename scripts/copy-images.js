#! /usr/bin/env node

// /images 以下のファイルを /src 以下の JavaScript (TypeScript) で import できるように /src/images にコピーする。

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
console.log("Copied /images/* to /src/images/*")

fs.writeFileSync(
  path.join(__dirname, "../src/generated/image-names.json"),
  JSON.stringify(names)
);
console.log("Generated /src/generated/image-names.json")
