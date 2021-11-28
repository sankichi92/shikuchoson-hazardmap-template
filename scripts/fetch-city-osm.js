const fs = require("fs").promises;
const path = require("path");
const axios = require("axios").default;
const axiosRetry = require("axios-retry");
const config = require("../src/hazardmap-config.json");

axiosRetry(axios, { retry: 5, retryDelay: axiosRetry.exponentialDelay });

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

(async () => {
  const response = await axios.get(`https://overpass-api.de/api/interpreter`, {
    params: { data: query },
  });
  await fs.writeFile(
    path.join(__dirname, "../src/city-osm.json"),
    JSON.stringify(response.data)
  );
})();
