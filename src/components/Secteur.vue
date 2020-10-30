<template>
  <div class="text-left p-3">
    <h2>Secteurs</h2>  

    <ul class="list-group">
      <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
        v-for="(data, i) in secteurs" :key="i"
      >
        {{data.name}}
        <span class="badge badge-primary badge-pill">{{data.nb}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex" ;

export default {
  computed: {
    ...mapState(['secteurs'])
  },
}
</script>

<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
  }
</style>