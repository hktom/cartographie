<template>
  <div class="text-left bg-white">
      <div class="header-back">
        <span
          class="icon-pictos-bridgeback ico-back "
          @click="goBack()"
        >
          <span class="l l1"></span>
          <span class="l l2"></span>
        </span>
        <h5 class="pt-3">Liste mini-fiche par secteur</h5>
      </div>
        <b-list-group>
          <b-list-group-item v-for="(post, i) in posts" :key="i">
            <card :data="post"></card>
          </b-list-group-item>
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

<style lang="scss">

.header-back .ico-back {
  box-shadow: none !important;
  border-radius: 0px !important;
}

.header-back .ico-back:hover{
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
