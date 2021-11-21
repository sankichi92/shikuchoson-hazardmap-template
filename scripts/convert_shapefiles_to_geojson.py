import os.path
import subprocess

targets = {
    'd_rzone.shp': 'tokyo_dosekiryu_tokubetsu.json',
    'd_yzone.shp': 'tokyo_dosekiryu.json',
    'j_yzone.shp': 'tokyo_jisuberi.json',
    'k_rzone.shp': 'tokyo_gakekuzure_tokubetsu.json',
    'k_yzone.shp': 'tokyo_gakekuzure.json',
    # '最大浸水深.shp': 'hachioji_shinsui_shin.json',
    # '浸水継続時間.shp': 'hachioji_shinsui_jikan.json',
}

dirname = os.path.dirname(__file__)

for shapefile_name, output_name in targets.items():
    shapefile_path = os.path.join(
        dirname, f'../data_original/shapefiles/{shapefile_name}',
    )
    output_path = os.path.join(dirname, f'../data/{output_name}')
    subprocess.run([
        '/Applications/QGIS.app/Contents/MacOS/bin/ogr2ogr',
        '-t_srs', 'EPSG:4326',
        '-f', 'GeoJSON', output_path,
        shapefile_path,
    ])
