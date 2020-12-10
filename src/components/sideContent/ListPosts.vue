<template>
  <div class="text-left bg-white">
    <div class="header-back">
      <span class="icon-pictos-bridgeback ico-back " @click="goBack()">
        <span class="l l1"></span>
        <span class="l l2"></span>
      </span>
      <h5 class="pt-3">{{ search_key }}</h5>
    </div>
    <b-list-group v-if="posts.length>0">
      <b-list-group-item v-for="(post) in posts" :key="post.id">
        <card :data="post"></card>
      </b-list-group-item>
    </b-list-group>
    <b-list-group v-else>
      <div class="px-4">Aucune mini fiche correspond à la recherche</div>
    </b-list-group>
  </div>
</template>

<script>
import Card from "./card";

export default {
  props: ["data"],
  components: {
    Card,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    search_key() {
      return this.$store.state.search_key;
    },
    posts() {
      return this.$store.state.posts;
    },
    base_filter() {
      return this.$store.state.base_filter;
    },
  },
  methods: {
    goBack() {
      this.$store.dispatch("resetMap");
      this.$store.commit("SET_SEARCH_VALUE", null);
      this.$store.commit("SET_FILTER_BASE", this.base_filter[0]);
      return this.$store.commit("SHOW_LIST_SECTORS", "list_sectors");
    },
    showPost(data) {
      return this.$store.commit("SHOW_POST", data);
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.header-back .ico-back {
  box-shadow: none !important;
  border-radius: 0px !important;
}

.header-back .ico-back:hover {
  background-color: none !important;
}
// @import "../../assets/sass/_variables.scss";
// .list-group-item {
//   cursor: pointer;
//   .more {
//     display: flex;
//     align-items: center;
//     color: $orange;
//   }
// }
// .list-item {
//   margin-bottom: 20px;
//   margin-left: 0px;
//   li {
//     margin: 0px;
//   }
// }
// @media screen and (min-width: 992px) {
//   .vueScroll {
//     height: 400px !important;
//     background-color: white;
//   }
// }
// .header-back h2 {
//   transform: scale(1);
//   @media (min-width: 992px) {
//     transform: scale(0);
//   }
// }
</style>
