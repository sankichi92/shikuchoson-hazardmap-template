#! /usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const axios = require("axios").default;
const config = require("../src/generated/hazardmap-config.json");

(async () => {
  const propertiesResponse = await axios.get(
    "https://shikuchoson-boundaries.sankichi.app/"
  );
  const property = propertiesResponse.data.find(
    (property) =>
      property["都道府県"] === config.prefecture &&
      property["市区町村"] === config.shikuchoson
  );

  if (!property || !property["行政区域コード"]) {
    console.error(
      `行政区域コードが見つかりませんでした: 都道府県=${config.prefecture} 市区町村=${config.shikuchoson}`
    );
    process.exit(1);
  }

  const geojsonResponse = await axios.get(
    `https://shikuchoson-boundaries.sankichi.app/${property["行政区域コード"]}.geojson`
  );
  await fs.writeFile(
    path.join(__dirname, "../src/generated/shikuchoson-boundary.json"),
    JSON.stringify(geojsonResponse.data)
  );
  console.log("Generated /src/generated/shikuchoson-boundary.json")
})();
