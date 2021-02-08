<template>
  <div class="map-wrapper w-100 h-100">
    <div class="loader-map" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="w-100 h-100">
      <div id="map" class="w-100 h-100"></div>
      <div id="geocoder" class="geocoder"></div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      map: null,
      hoveredStateId: null,
      mapboxClient: null,
      markerClick: false,
    };
  },
  computed: {
    lang() {
      return window.lang == "fr-FR" || window.lang == "fr"
        ? "name_fr"
        : "name_en";
    },
    countries() {
      return this.$store.state.countries;
    },
    loading() {
      return this.$store.state.loading;
    },
    geo_coordinates() {
      return this.$store.state.geo_coordinates;
    },
    country_list() {
      return this.$store.state.country_list;
    },
  },
  mounted() {
    this.initMap();
  },
  watch: {
    countries() {
      document
        .querySelectorAll("#marker-nbre-post")
        .forEach((domElement) => domElement.remove());
      this.countries.forEach((data) => {
        this.setMarker(data.name, data.count);
      });
    },
  },
  methods: {
    turfCenter(type, coordinates) {
      let polygon = [];
      if (type == "MultiPolygon") {
        polygon = turf.multiPolygon(coordinates);
      } else {
        polygon = turf.polygon(coordinates);
      }
      //console.log(turf.centerOfMass(polygon));
      return turf.centerOfMass(polygon).geometry.coordinates;
    },
    filterMap(country_name, fromMaker=false) {
      //console.log(country_name);
      if (this.lang == "name_fr" && !fromMaker) {
        let countryFr = this.country_list.filter(
          (item) => item.en.toLowerCase() == country_name.toLowerCase()
        );
        return this.$store.dispatch("mapFilter", countryFr[0].label);
      } else {
        return this.$store.dispatch("mapFilter", country_name);
      }
    },
    initMap() {
      mapboxgl.accessToken = window.window.access_token;
      this.mapboxClient = window.mapboxSdk({
        accessToken: mapboxgl.accessToken,
      });
      this.map = new mapboxgl.Map({
        container: "map",
        style: window.map_url_style,
        center: [window.position_lat, window.position_lng],
        zoom: window.zoom, // starting zoom
      });

      // Add zoom and rotation controls to the map.
      this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      const countries = this.countries;
      const lang = this.lang;
      this.map.on("load", () => {
        this.map.setLayoutProperty("country-label", "text-field", [
          "get",
          lang,
        ]);
        countries.forEach((data) => {
          this.setMarker(data.name, data.count);
        });
        this.countrieShap();
      });
    },
    // Country Shape
    countrieShap() {
      let hoveredStateId = this.hoveredStateId;
      const map = this.map;
      //const setPub = this.setPub;
      const filterMap = this.filterMap;
      const turfCenter = this.turfCenter;
      const markerClick = this.getMarkerClick;

      //soucres geojson
      this.map.addSource("states", {
        type: "geojson",
        data: window.geo_json,
      });
      this.map.addLayer({
        id: "state-fills",
        type: "fill",
        source: "states",
        layout: {},
        paint: {
          "fill-color": window.fill_color,
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.2,
            0.0,
          ],
        },
      });
      this.map.addLayer({
        id: "state-borders",
        type: "line",
        source: "states",
        layout: {},
        paint: {
          "line-color": window.border_color,
          "line-width": 0.5,
        },
      });

      // feature state for the feature under the mouse.
      this.map.on("mousemove", "state-fills", function(e) {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState(
              { source: "states", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: "states", id: hoveredStateId },
            { hover: true }
          );
        }
      });
      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      this.map.on("mouseleave", "state-fills", function() {
        if (hoveredStateId) {
          map.setFeatureState(
            { source: "states", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      this.map.on("click", "state-fills", function(e) {
        if (!markerClick()) {
          map.flyTo({
            center: turfCenter(
              e.features[0].geometry.type,
              e.features[0].geometry.coordinates
            ),
            zoom: 3.2,
          });
          const country_name = e.features[0].properties.admin;
          const targetMarker = document.querySelector(
            "#marker-nbre-post." + country_name
          );
          filterMap(country_name);
          if (targetMarker) targetMarker.click();
          else {
            //setPub([]);
            const active = document.querySelector(".activeMarker");
            if (active) {
              active.classList.remove("activeMarker");
            }
          }
        }
      });
    },

    setMarker(countryName, totalPost) {
      const map = this.map;
      const geo_coordinates = this.geo_coordinates;
      let setMarkerClick = this.setMarkerClick;
      let filterMap = this.filterMap;
      //const turfCenter=this.turfCenter;
      let country_list = this.country_list.filter(
        (item) =>
          item.label.toLowerCase() == countryName.toLowerCase() ||
          item.en.toLowerCase() == countryName.toLowerCase()
      );

      if (country_list.length > 0) {
        var index = geo_coordinates.findIndex(
          (item) =>
            item.name.toLowerCase() == country_list[0].en.toLowerCase() ||
            item.name.toLowerCase() == country_list[0].label.toLowerCase()
        );

        if (index != -1) {
          var el = document.createElement("div");
          el.innerHTML = totalPost;
          el.id = "marker-nbre-post";
          el.classList.add(countryName.toLowerCase().replaceAll(" ", ""));

          // Marker on Click
          el.addEventListener("click", (e) => {
            // map.flyTo({
            //   center: turfCenter(
            //     e.features[0].geometry.type,
            //     e.features[0].geometry.coordinates
            //   ),
            //   zoom: 3.2,
            // });
            setMarkerClick(true);
            const active = document.querySelector(".activeMarker");
            if (active) {
              active.classList.remove("activeMarker");
            }
            e.target.classList.add("activeMarker");
            filterMap(countryName, true);
            setTimeout(() => {
              setMarkerClick(false);
            }, 100);
          });
          var marker = new mapboxgl.Marker(el).setLngLat(
            geo_coordinates[index].coordinates
          );
          marker.remove(map);
          marker.addTo(map);
        }
      }
    },

    setMarkerClick(val) {
      this.markerClick = val;
    },
    getMarkerClick() {
      return this.markerClick;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/sass/_variables.scss";
a.mapboxgl-ctrl-logo,
.mapboxgl-ctrl.mapboxgl-ctrl-attrib {
  display: none;
}

#map:focus {
  outline: none;
}
#marker-nbre-post {
  line-height: 20px;
  background-color: $red;
  width: 22px;
  height: 22px;
  font-size: 9px;
  border-radius: 50%;
  color: white;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  top: 22px;
  &::after {
    width: 5px;
    position: relative;
    content: "";
    display: block;
    left: 50%;
    top: -32px;
    transform: translateX(-50%);
    border: 7px solid transparent;
    border-bottom-color: $red;
  }
  &:hover,
  &.activeMarker {
    background-color: black;
    &::after {
      border-bottom-color: black;
    }
  }
}
</style>
