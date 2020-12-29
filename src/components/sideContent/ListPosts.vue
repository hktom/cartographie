<template>
  <div class="text-left bg-white mt-4">
    <div :class="`header-back mini-fiche-icon-back-color pl-4 
    ${button_back_icon_size}`">
      <span :class="`${button_back_icon}`" 
      @click="goBack()">
      </span>
    </div>

    <div class="pt-3 pl-3 mini-fiche-content"><i>{{ search_key }}</i></div>

    <b-list-group v-if="posts.length>0">
      <b-list-group-item v-for="(post) in posts" :key="post.id">
        <card :data="post"></card>
      </b-list-group-item>
    </b-list-group>
    <b-list-group v-else>
      <div class="px-4"> {{$t('404')}} </div>
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
    return {
      button_back_icon: window.button_back_icon,
      button_back_icon_size: window.button_back_icon_size,

    };
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

.header-back{
  cursor: pointer !important;
}

</style>
