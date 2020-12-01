<template>
  <div class="text-left">
    <h2>{{ $t("categories") }}</h2>
    <vuescroll class="vueScroll">
      <b-list-group
        v-for="(sector, i) in sectors"
        :key="i"
        class="box-shadow"
        style="border-radius:0px;height:100%"
      >
        <b-list-group-item
          v-if="sector.count > 0"
          class="d-flex justify-content-between align-items-center"
          @click="listPosts(sector.id)"
        >
          <span v-html="sector.name"></span>
          <span class="badge badge-nb badge-primary badge-pill">{{
            sector.count
          }}</span>
        </b-list-group-item>
      </b-list-group>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
export default {
  components: { vuescroll },
  data() {
    return {};
  },
  computed: {
    sectors() {

      return this.$store.state.sectors;
    },
  },
  mounted() {},
  methods: {
    listPosts(sector_id) {
      return this.$store.dispatch("listPosts", sector_id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/_variables.scss";

.list-group {
  margin-left: 0px;
}
.list-group-item {
  cursor: pointer;
  margin: 0px;
  .badge-nb {
    border-radius: 5px;
    border-top-right-radius: unset;
    border-bottom-left-radius: unset;
    background-color: $red;
  }
}
h2 {
  color: $yellow;
  display: block;
  @media (min-width: 992px) {
    display: none;
  }
}
@media screen and (min-width: 992px) {
  .vueScroll {
    max-height: 300px !important;
  }
}
</style>
