Promise.all(
  [d3.json('map.geojson')]).then( ([buildings]) => {
  createMap(buildings)
})
	var width = 960,
    height = 600

  function createMap(buildings) {
	features = buildings.features
	var fixed = features.map(function(feature) {
        return turf.rewind(feature,{reverse:true});
    })
		
  var proj = d3.geoMercator()
	.center([0, 42.27375])
    .rotate([71.808444, 0])
    .translate([250, 250])
    .scale(3000000);

  var gpath = d3.geoPath()
    .projection(proj);


  // draw country boundaries
  d3.select('svg')
    .append('g')
    .attr('id', 'buildings')
    .selectAll('path')
    .data(fixed)
    .enter()
    .append('path')
      .attr('d', function(d) { console.log(d); return gpath(d); })
      .attr('stroke-width', 1)
      .attr('stroke', 'steelblue')
      .attr('id', d => d.properties.name)
      .attr('fill', "white");

var selectedDate = "2/26/2022"
var selectedStartHour = "1:00 PM"

d3.csv("updated_25data.csv").then(function(data) {

var filteredSelection = data.filter( function(d){return d.Day === selectedDate && d.Event_Start === selectedStartHour} )
console.log(filteredSelection)
console.log(filteredSelection.length)

var buildingIDArray = ["AK", "FL", "KH", "SL", "WB", "UH", "SH", "AH", "RILEY", "FBC", "WEST", "HA", "IS", "RC", "QUAD", "HL", "CC", "OH", "GH", "HH", "MORGAN", "CRC", "AF", "GP", "RT", "OASIS"]
var akData, flData, khData, slData, wbData, uhData, shData, ahData, rileyData, westData, haData, isData, rcData, quadData, hlData, ccData, ohData, ghData, hhData, morganData, crcData, afData, gpData, rtData, oasisData;
var buildingDataArray = [akData, flData, khData, slData, wbData, uhData, shData, ahData, rileyData, westData, haData, isData, rcData, quadData, hlData, ccData, ohData, ghData, hhData, morganData, crcData, afData, gpData, rtData, oasisData]

function generateBuildingData (idArray, dataArray) {
for(i = 0; i < idArray.length; i++){
  dataArray[i] = filteredSelection.filter(function(d){return d.Location1 === idArray[i]});
}
return dataArray
}

function colorBuildings(idArray, dataArray){
  for(i = 0; i < idArray.length; i++){
    if(dataArray[i].length > 1)
    document.getElementById(idArray[i]).style.fill = "yellow";
  }
}
colorBuildings(buildingIDArray, generateBuildingData(buildingIDArray, buildingDataArray));
});
}