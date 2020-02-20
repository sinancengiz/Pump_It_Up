
var map_data = "/map_data";

// reach data with D3
d3.json(map_data, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  create_map(data);
  });


// create Function to create map
  function create_map(map_data) {
        
    var myMap2 = L.map("map", {
      center: [-6.52, 34.67],
      zoom: 6
    });

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1Ijoic2luYW5jZW5naXoiLCJhIjoiY2ppZHVwMXZnMGZqaTNxcWw0NWxhN3YwNSJ9.RVV5UmzSmoeu4xd1Wh4iHA"
    ).addTo(myMap2);


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Water Pumps Locations</h4>' +  (props ?
    '<b>' + props.mag + '</b><br />' + props.mag + ' people / mi<sup>2</sup>'
    : 'Click on a point for more information');
};

info.addTo(myMap2);


    for (var i = 0; i < 5000; i++) {
        var longitude = map_data[i].longitude
        var latitude = map_data[i].latitude   
        var population = map_data[i].population

        console.log(map_data[i].status)  
        var my_color = "white";
        var my_fillColor = "white"

        if (map_data[i].status == 0) {
          my_color =  "blue";
          my_fillColor = "blue";
        } else if (map_data[i].status == 1) {
          my_color =  "green";
          my_fillColor = "green";
        } else {
          my_color =  "red";
          my_fillColor = "red";
        }

    L.circle([latitude , longitude], {
      color: my_color,
      fillColor: my_fillColor,
      fillOpacity: 0.75,
      radius: 500 + population * 2
    }).bindPopup("<h2>" + "Water Point Info" + "</h2> <h4> Population: " + map_data[i].population + "</h4> <h4> Gps_Height: " + map_data[i].gps_height + "</h4>").addTo(myMap2);
    }

  }