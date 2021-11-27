const fs = require("fs").promises;
const path = require("path");
const { parse } = require("jsonc-parser");

(async () => {
  const config = await fs.readFile(
    path.join(__dirname, "../hazardmap-config.jsonc")
  );
  const parsedConfig = parse(config.toString());
  await fs.writeFile(
    path.join(__dirname, "../src/hazardmap-config.json"),
    JSON.stringify(parsedConfig)
  );
})();
