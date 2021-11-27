const fs = require("fs").promises;
const path = require("path");
const { URLSearchParams } = require("url");
const axios = require("axios").default;
const axiosRetry = require("axios-retry");
const config = require("../src/hazardmap-config.json");

axiosRetry(axios, { retry: 5, retryDelay: axiosRetry.exponentialDelay });

const query = new URLSearchParams({
  data: `[out:json][timeout:60];
rel
  [name="${config.city}"]
  [type="boundary"]
  [boundary="administrative"]
  [admin_level="7"]
  (area:3601543125);
out geom;`,
});

(async () => {
  const response = await axios.get(
    `https://overpass-api.de/api/interpreter?${query}`
  );
  await fs.writeFile(
    path.join(__dirname, "../src/city-osm.json"),
    JSON.stringify(response.data)
  );
})();
