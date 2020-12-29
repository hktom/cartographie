<template>
  <div class="text-left bg-white">
    
    <div class="px-3 py-2 mini-fiche-title">
      {{$t('categories')}}
    </div>
      <b-list-group
        v-for="(sector, i) in sectors"
        :key="i"
        class=""
        style="border-radius:0px;height:100%"
      >
        <b-list-group-item
          v-if="sector.count > 0"
          class="d-flex justify-content-between align-items-center"
          @click="listPosts(sector)"
        >
          <span class="mini-fiche-categories" v-html="sector.name"></span>
          <span class="mini-fiche-categories-count">{{sector.count}}</span>
      
        </b-list-group-item>
      </b-list-group>
    
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    sectors() {
      return this.$store.state.category;
    },
  },
  mounted() {},
  methods: {
    listPosts(sector) {
      return this.$store.dispatch("listPosts", sector);
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/_variables.scss";
.list-group-item {
  cursor: pointer;
  border-radius: 0px;
  margin: 0px;
  border-top: none;
  border-left: none;
  border-right: none;
  // .count {
  //   font-size: 1.5rem;
  //   color: $orange;
  //   font-weight: bold;
  // }
}
</style>
