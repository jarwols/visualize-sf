var coords = [37.787792, -122.408828];

var world = VIZI.world('world', {
  skybox: true,
  postProcessing: true
}).setView(coords);


// Set position of sun in sky
world._environment._skybox.setInclination(0.20);

// Add controls
VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// Buildings from Mapzen
VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
  interactive: true,
  style: function(feature) {
    var height;

    if (feature.properties.height) {
      height = feature.properties.height;
    } else {
      height = 10 + Math.random() * 10;
    }

    return {
      height: height
    };
  },
  filter: function(feature) {
    // Don't show points
    return feature.geometry.type !== 'Point';
  },
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);

var market = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "label": "Market Street, San Francisco, CA, USA"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -122.39494800567627,
            37.79449108744549
          ],
          [
            -122.41945266723631,
            37.77507374301414
          ]
        ]
      }
    }
  ]
}

VIZI.geoJSONLayer(market, {
  output: true,
  style: {
    color: '#ff0000',
    lineColor: '#f39c12',
    lineRenderOrder: 1,
    pointColor: '#00cc00',
  },
  pointGeometry: function(feature) {
    var geometry = new THREE.SphereGeometry(100, 100, 100);
    return geometry;
  }
}).addTo(world);


