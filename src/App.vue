<template>
  <div id="app" class="w-100" :style="`position:relative;height:${height}px`">
    <Maps class="maps-position"></Maps>
    <div class="container-search"><map-search class="search"></map-search></div>
    <!-- <div class="map_filter_option">
      <v-select
        :disabled="this.search_value?true:false"
        :autoscroll="true"
        :searchable="true"
        :options="base_filter"
        :placeholder="`Option d'affichage des pays`"
        :value="$store.state.base_filter_selected"
        @input="select_filter"
      ></v-select>
    </div> -->
    <div class="container-side"><side-content></side-content></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      height: window.height,
    };
  },
  components: {},
  mounted() {
    this.$store.dispatch("loadGeoCoordinate", window.geo_json);
    this.$store.dispatch("loadData");
    this.$store.commit("SET_LANG", this.$i18n.locale)
  },
  methods: {
    select_filter(val) {
      if (val) {
        this.$store.commit("SET_FILTER_BASE", val);
        if (this.search_value) {
          this.$store.dispatch("searchKey", this.search_value);
        } else {
          this.$store.dispatch("search_key_with_null", val.option);
        }
      }
    },
  },
  computed: {
    base_filter() {
      return this.$store.state.base_filter;
    },
    search_value() {
      return this.$store.state.search_value;
    },
  },
};
</script>

<style>
.mapboxgl-canvas:focus {
  outline: none !important;
}
.map_filter_option {
  position: absolute;
  top: 412px;
  left: 40px;
  width: 25%;
  padding: 5px 10px;
  background-color: white;
}
.list-group-item {
  border-radius: 0px !important;
}
.container-search {
  position: absolute;
  width: 60%;
  top: 0;
  margin-left: 20px;
}

.container-side {
  position: absolute;
  top: 4px;
  width: 27rem;
  right: 10px;
}

@media (max-width: 992px) {
  .map_filter_option {
    top: 0px;
    margin-left: 0px;
    left: 0px;
    width: 100%;
    position: relative;
    padding: 20px 54px;
  }
  .container-side,
  .map_filter_option {
    position: relative;
    padding: 20px 54px;
    width: 100%;
  }
  .container-search {
    width: 95%;
  }
}
</style>
