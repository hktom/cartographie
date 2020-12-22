<template>
  <div class="text-left bg-white">
    
    <h4 class="px-3 py-2">{{$t('categories')}}</h4>
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
          <span v-html="sector.name"></span>
          <span class="count">{{sector.count}}</span>
      
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

<style lang="scss" scoped>
@import "../../assets/sass/_variables.scss";
</style>
