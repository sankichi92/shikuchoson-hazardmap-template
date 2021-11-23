import osmtogeojson from "osmtogeojson";

export async function fetchBoundary(name: string) {
  const query = new URLSearchParams({
    data: `[out:json][timeout:60];
relation[name="${name}"][type="boundary"];
out geom;`,
  });
  const response = await fetch(
    `https://overpass-api.de/api/interpreter?${query}`
  );
  if (response.ok) {
    return osmtogeojson(await response.json())
  } else {
    throw Error(`Failed to fetch city boundary: ${name}`)
  }
}
