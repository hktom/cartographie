<template>
  <div class="text-left p-3">
    <h2>{{$t('secteurs')}}</h2>  
    <div class="loader-map" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">{{$t('loading')}}</span>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
        v-for="(data, i) in secteurs" :key="i"
        @click="getFromSecteurs(data)"
      >
        {{data.name}}
        <span class="badge badge-nb badge-primary badge-pill">{{data.nb}}</span>
      </li>
    </ul>
  </div>  
</template>

<script>
import {mapState, mapActions} from "vuex" ;

export default {
  data(){
    return {
      secteurActive : null ,
      solutions : []
    }
  },
  computed: {
    ...mapState(['secteurs','loading']),
  },
  methods: {
    ...mapActions(['setActiveSecteur']), 
    getFromSecteurs(data){
      //this.setActiveSecteur(data.name)
      this.$emit('selectSecteur', data)

      //remove active marker
      const active = document.querySelector('.activeMarker')
      if(active){
        active.classList.remove('activeMarker')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .list-group{
    margin-left: 0px;
  }
  .list-group-item{
    cursor: pointer;
    margin: 0px;
    .badge-nb{
      border-radius: 5px;
      border-top-right-radius: unset;
      border-bottom-left-radius: unset;
    }
  }
  h2{
    color: #FBC026;
  }
</style>