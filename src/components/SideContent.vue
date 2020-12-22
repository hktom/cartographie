<template>
  <div class="sidebar">
    <vuescroll class="vueScroll">
    <secteur v-if="side_content == 'list_sectors'"></secteur>
    <list-posts v-if="side_content == 'list_posts'"></list-posts>
    <single-post v-if="side_content == 'show_post'"></single-post>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import Secteur from "./sideContent/Secteur";
import ListPosts from './sideContent/ListPosts.vue';
import SinglePost from './sideContent/SinglePost.vue';

export default {
  components : { Secteur , SinglePost, ListPosts, vuescroll} ,
  data() {
    return {
      solutions : []
    }
  },
  computed: {
    side_content(){
      return this.$store.state.side_content;
    }
  },
  methods: {
  },
}

</script>

<style lang="scss">
@import "../assets/sass/_variables.scss";
.list-group-item {
  cursor: pointer;
  border-radius: 0px;
  margin: 0px;
  border-top: none;
  .count {
    font-size: 1.5rem;
    color: $orange;
    font-weight: bold;
  }
}
.vueScroll{
  background-color:white;
  height: 400px !important;
  overflow-x: hidden !important;
}
</style>