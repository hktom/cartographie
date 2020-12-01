<template>
  <div class="sidebar">
    <secteur v-if="side_content == 'list_sectors'"></secteur>
    <list-posts v-if="side_content == 'list_posts'"></list-posts>
    <single-post v-if="side_content == 'show_post'"></single-post>
  </div>
</template>

<script>
import Secteur from "./sideContent/Secteur";
import ListPosts from './sideContent/ListPosts.vue';
import SinglePost from './sideContent/SinglePost.vue';

export default {
  components : { Secteur , SinglePost, ListPosts} ,
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