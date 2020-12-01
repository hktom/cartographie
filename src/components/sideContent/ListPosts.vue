<template>
  <div class="text-left">
    <div>
      <div class="header-back">
        <span
          class="icon-pictos-bridgeback ico-back color-orange"
          @click="goBack()"
        >
          <span class="l l1"></span>
          <span class="l l2"></span>
        </span>
        <h2>{{ $t("use-case") }}</h2>
      </div>
      <vuescroll class="vueScroll">
        <b-list-group>
          <b-list-group-item v-for="(post, i) in posts" :key="i">
            <card :data="post"></card>
          </b-list-group-item>
        </b-list-group>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import Card from "./card";

export default {
  props: ["data"],
  components: {
    vuescroll,
    Card,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  methods: {
    goBack() {
      return this.$store.commit("SHOW_LIST_SECTORS", "list_sectors");
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/_variables.scss";
.list-group-item {
  cursor: pointer;
  .more {
    display: flex;
    align-items: center;
    color: $orange;
  }
}
.list-item {
  margin-bottom: 20px;
  margin-left: 0px;
  li {
    margin: 0px;
  }
}
@media screen and (min-width: 992px) {
  .vueScroll {
    height: 400px !important;
    background-color: white;
  }
}
.header-back h2 {
  transform: scale(1);
  @media (min-width: 992px) {
    transform: scale(0);
  }
}
</style>
