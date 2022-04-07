var mymap = L.map('mapid').setView([39.7502,-104.9490], 17);
L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2tyZWNrbGkiLCJhIjoiY2t6bG9pMDJ2MWt3bjJvczgwNHM4YTBmaiJ9.gCsjFPzTZWZ6lJEMA0maBw'
    }).addTo(mymap);
var gjData = '../data/trees2.geojson'
let xhr = new XMLHttpRequest();
xhr.open('GET', gjData);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.onload = function() {
    if (xhr.status !== 200) return
    treeLayer = L.geoJSON(xhr.response, {
        pointToLayer: function (feature, latlng) {
               return L.circleMarker(latlng, pointStyle);
          }
       }
  )
treeLayer.addTo(mymap);
};
xhr.send();
var pointStyle = {
    radius: 3,
    fillColor: "#1cc44c",
    color: "#0f5824",
    weight: 1,
    opacity: 0.35,
    fillOpacity: 0.8
    };
function onEachOfMyFeatures(feature, layer) {
        // does this feature have a property named SPECIES_CO?
        if (feature.properties && feature.properties.SPECIES_CO) {
            layer.bindPopup(feature.properties.SPECIES_CO);
        }
    }
L.geoJSON(geojsonFeature, {
        onEachFeature: onEachOfMyFeatures
    }).addTo(mymap);
    
    
    
