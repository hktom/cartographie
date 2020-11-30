<template>
  <div class="sidebar">
    <secteur v-if="side_content == 'list_sectors'"></secteur>
    <publications v-if="side_content == 'list_posts'"></publications>    
    <publication v-if="side_content == 'show_pos'"></publication>    
  </div>
</template>

<script>
import Secteur from "./Secteur";
import Publications from "./Publications"
import Publication from "./Publication"

export default {
  components : { Secteur , Publications, Publication} ,
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