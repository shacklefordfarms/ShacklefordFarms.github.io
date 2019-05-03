function init () {
  let myMap = L.map('map').setView([30.3645, -91.1722], 13)
  let Esri_WorldImagery = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  let esriBasemap = L.tileLayer(Esri_WorldImagery, {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(myMap)

  let basemaps = {
    'Basemap': esriBasemap }

  let soilLayer = L.layerGroup().addTo(myMap)
  let boundaryLayer = L.layerGroup().addTo(myMap)
  let ssurgo = 'https://ShacklefordFarms.github.io/data/SSURGO_Farm.geojson'
  let boundary = 'https://ShacklefordFarms.github.io/data/Boundary.geojson'

  jQuery.getJSON (ssurgo, function(soilMap){
    // Will apply a diferent style for each feature - polygon
    	let soilTypeStyle = function (feature) {
    	  let sClass = feature.properties.MUSYM
    	  let soilColor = '#663300' // let the initial color be a darker green
    	  if ( sClass == "SeA" ) { soilColor = '#be8a60' }
        if ( sClass == "W" ) { soilColor = '	#008B8B' }
        if ( sClass == "ShB" ) { soilColor = '#ccbea0' }
        if ( sClass == "ThA" ) { soilColor = '#e5d08d' }
        if ( sClass == "CmA" ) { soilColor = '#8e805b' }
        if ( sClass == "SiB" ) { soilColor = '#d0953c' }
    	  return {
    	    color: soilColor, //use the color variable above for the value
    	    weight: 1,
    	    fillOpacity: 0.8
    	  }
    	}
      let onEachFeature = function (feature, layer) {
        soilLayer.addLayer(layer)
    		let sSymbol = feature.properties.MUSYM
        let sType = feature.properties.Soil_Type
    		let sDrainage = feature.properties.Drainage
        let sArea = feature.properties.Area
    		layer.bindPopup('<b>Soil Type:</b> ' + sType +
                        '<br><b>Map Unit Symbol (MUSYM):</b> ' + sSymbol+
                        '<br><b>Soil Drainage:</b> ' + sDrainage+
                        '<br><b>Soil Area (ac):</b> ' + sArea)
    	}
    	let geojsonOptionsSoil = {
    		style: soilTypeStyle,
    		onEachFeature: onEachFeature
    	}
    L.geoJSON (soilMap, geojsonOptionsSoil ).addTo(myMap)

  })

  jQuery.getJSON (boundary, function(boundaryMap){
      let onEachFeatureB = function (feature, boundlayer) {
      boundaryLayer.addLayer(boundlayer)
    }
      let geojsonOptionsB = {
        style: {
          fillColor: 'transparent',
          weight: 2,
          color: 'black'  //Outline color
        },
        onEachFeature: onEachFeatureB
    }
    L.geoJSON (boundaryMap, geojsonOptionsB).addTo(myMap)
  })

}
window.addEventListener('load', init)
