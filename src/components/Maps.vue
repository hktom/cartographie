<template>
  <div class="map-wrapper">
    <div class="loader-map" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div id="map"></div>
    <div id="geocoder" class="geocoder"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require("mapbox-gl");"
import {mapActions, mapState} from "vuex" ;
//const mapboxSdk  = require('@mapbox/mapbox-sdk');
export default {
  data() {
    return {
      map : null,
      hoveredStateId : null ,
      mapboxClient : null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    ...mapActions(['setMenu','setSolutionsActive']),
    initMap(){
      mapboxgl.accessToken = window.access_token || "pk.eyJ1IjoidGhlc3kiLCJhIjoiY2tmMm5hZWM3MTlxczJ4bzAzaXR5cm5rciJ9.hD0g1llrf64deGWq2V_rqg";
      this.mapboxClient = window.mapboxSdk({ accessToken: mapboxgl.accessToken });
      
      this.map = new mapboxgl.Map({
        container: "map",
        style: window.map_url_style || "mapbox://styles/thesy/ckh0h1vl90z5o19nm3a9wq4fe/draft", // stylesheet location
        center:  [window.position_lng || 35, window.position_lat || 5], // starting position [lng, lat]
        zoom: window.zoom || 2 // starting zoom
      });
      // Add zoom and rotation controls to the map.
      this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      const countries = this.countries
      this.map.on("load", () => {
        this.countrieShap()
        countries.forEach((data) => {
         this.setMarker(data.name, data.nb , data) 
        })
      });
    },
    countrieShap(){
      let hoveredStateId = this.hoveredStateId 
      const map = this.map
      const setPub = this.setPub

      //soucres geojson 
      this.map.addSource('states', {
          'type': 'geojson',
          'data': window.geo_json || 'https://raw.githubusercontent.com/hktom/assets/master/africa-countries.geo.json'
      });
      this.map.addLayer({
            'id': 'state-fills',
            'type': 'fill',
            'source': 'states',
            'layout': {},
            'paint': {
                'fill-color': window.fill_color || "red",
                'fill-opacity': [
                    'case', ['boolean', ['feature-state', 'hover'], false],
                    0.2,
                    0.0
                ]
            }
        });
      this.map.addLayer({
          'id': 'state-borders',
          'type': 'line',
          'source': 'states',
          'layout': {},
          'paint': {
              'line-color': window.border_color || "transparent",
              'line-width': 0.5
          }
      });
      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      this.map.on('mousemove', 'state-fills', function(e) {
          if (e.features.length > 0) {
              if (hoveredStateId) {
                  map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: false });
              }
              hoveredStateId = e.features[0].id;
              map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: true });
          }
      });
      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      this.map.on('mouseleave', 'state-fills', function() {
          if (hoveredStateId) {
              map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: false });
          }
          hoveredStateId = null;
      });

      this.map.on('click', 'state-fills', function(e) {
          console.log('pays cliqué', e.features)
          const country_name = e.features[0].properties.admin.toLowerCase().replaceAll(' ', '')
          console.log(country_name)
          const targetMarker = document.querySelector('#marker-nbre-post.' + country_name)
          if(targetMarker) targetMarker.click()
          else{
            setPub([])
            const active = document.querySelector('.activeMarker')
            if(active){
              active.classList.remove('activeMarker')
            }
          }
      });
    }, 
    setMarker(countryName, totalPost, data) {
      const map = this.map
      const setPub = this.setPub
      this.mapboxClient.geocoding
        .forwardGeocode({
            query: countryName,
            autocomplete: false,
            limit: 1,
        })
        .send()
        .then(function(res) {
          if (res && res.body && res.body.features && res.body.features.length) {
            console.log(res)
                var feature = res.body.features[0];
                // create DOM element for the marker
                var el = document.createElement("div");
                el.innerHTML = `${totalPost}`;
                el.id = "marker-nbre-post";
                el.classList.add(res.body.features[0].place_name.toLowerCase().replaceAll(' ', '')) ;
                el.addEventListener('click', (e) => {
                    //alert("Marker Clicked. v2");
                    //var url = $("#page-url").val();
                    // url += `/?q=${acf}&v=${countryName}`;
                    // window.location.href = url;
                    const active = document.querySelector('.activeMarker')
                    if(active){
                      active.classList.remove('activeMarker')
                    }
                    e.target.classList.add('activeMarker')
                    setPub(data)
                });
                var marker = new mapboxgl.Marker(el).setLngLat(feature.center);
                marker.remove(map);
                marker.addTo(map);
            }
        });
    },
    setPub(data){
      //redefinir menu
      this.setMenu(2)
      // definir les publication
      if(data.solutions){
        this.setSolutionsActive(data.solutions)
      }else{
        this.setSolutionsActive([])
      }
    }
  },
  computed: {
    ...mapState(['countries','loading'])
  },
  watch: {
    countries(){
      document.querySelectorAll('#marker-nbre-post').forEach(
        domElement => domElement.remove()
      )
      this.countries.forEach((data) => {
         this.setMarker(data.name, data.nb, data) 
      })
    }
  },
}
</script>

<style lang="scss">
  @import "../assets/sass/_variables.scss";

  .map-wrapper{
    width: 100%;
    background-color: #eee;
    #map{
      width: 100%;
      height: calc(100vh - 50px);
      min-width: 300px;
      max-height: 500px;
      z-index: 2;
    }
  }
  .mapboxgl-ctrl-top-right{
    width: 100%;
    padding: 10px 20px;
    .mapboxgl-ctrl-geocoder{
      width: 100%;
      float: none;
      max-width: none;
    }
  }
  .loader-map{
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #marker-nbre-post{
    line-height: 20px;
    background-color: #007bff;
    width: 22px;
    height: 22px;
    font-size: 9px;
    border-radius: 50%;
    color: white;
    cursor : pointer ;
    top: 22px;
    &::after{
      width: 5px;
      position: relative;
      content: "";
      display: block;
      left: 50%;
      top: -32px;
      transform: translateX(-50%);
      border: 7px solid transparent;
      border-bottom-color: #007bff;
    }
    &:hover, &.activeMarker{
      background-color: $red;
      &::after{
        border-bottom-color: $red;
      }
    }
  }
</style>