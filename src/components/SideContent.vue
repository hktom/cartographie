<template>
  <div class="sidebar">
    <vuescroll class="vueScroll">
      <secteur v-if="side_content == 'list_sectors'"></secteur>
      <list-posts v-if="side_content == 'list_posts'"></list-posts>
      <single-post v-if="side_content == 'show_post'"></single-post>

      <div
        v-if="
          side_content != 'list_sectors' &&
            side_content != 'list_posts' &&
            side_content != 'show_post'
        "
        class="w-100 d-flex align-items-center justify-content-center"
        style="height:400px"
      >
        <b-spinner label="Spinner"></b-spinner>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import Secteur from "./sideContent/Secteur";
import ListPosts from "./sideContent/ListPosts.vue";
import SinglePost from "./sideContent/SinglePost.vue";

export default {
  components: { Secteur, SinglePost, ListPosts, vuescroll },
  data() {
    return {
      solutions: [],
    };
  },
  computed: {
    side_content() {
      return this.$store.state.side_content;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
@import "../assets/sass/_variables.scss";
.vueScroll {
  background-color: white;
  height: 400px !important;
  overflow-x: hidden !important;
}
</style>
