const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const axios = require("axios").default;
const axiosRetry = require("axios-retry");
const config = require("../src/generated/hazardmap-config.json");

const outputPath = path.join(__dirname, "../src/generated/city-osm.json");

const query = `[out:json][timeout:60];
area
  [name="${config.prefecture}"]
  (area:3600382313);
rel
  [name="${config.city}"]
  [type="boundary"]
  [boundary="administrative"]
  [admin_level="7"]
  (area);
out geom;`;

axiosRetry(axios, { retry: 5, retryDelay: axiosRetry.exponentialDelay });

(async () => {
  const response = await axios.get(`https://overpass-api.de/api/interpreter`, {
    params: { data: query },
  });

  if (response.data.elements.length === 0) {
    console.error(
      `OSM Relation is not found: ${config.prefecture} ${config.city}`
    );
    process.exit(1);
  }

  await fs.writeFile(outputPath, JSON.stringify(response.data));
})();
