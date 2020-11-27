<template>
  <div class="text-left">
    <h2>{{$t('categories')}}</h2>  
    <!--
    <div class="loader-map" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">{{$t('loading')}}</span>
      </div>
    </div>
    -->
    <vuescroll class="vueScroll">
      <b-list-group v-for="(data, i) in categories" :key="i"
          @click="getFromSecteurs(data)" class="box-shadow" style="border-radius:0px">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span v-html="data.name"></span>
          <span class="badge badge-nb badge-primary badge-pill">{{data.nb}}</span>
        </b-list-group-item>
      </b-list-group>

      <!-- <ul class="list-group">
        <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
          v-for="(data, i) in categories" :key="i"
          @click="getFromSecteurs(data)"
        >
          <span v-html="data.name"></span>
          <span class="badge badge-nb badge-primary badge-pill">{{data.nb}}</span>
        </li>
      </ul> -->
    </vuescroll>
  </div>  
</template>

<script>
import {mapState, mapActions} from "vuex" ;
import vuescroll from 'vuescroll';

export default {
  components : {
    vuescroll
  } ,
  data(){
    return {
      secteurActive : null ,
      solutions : []
    }
  },
  computed: {
    ...mapState(['categories']),
  },
  mounted() {
    console.log(this.categories)
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
  @import "../assets/sass/_variables.scss";

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
      background-color: $red;
    }
  }
  h2{
    color: $yellow;
    display: block;
    @media (min-width: 992px){
      display: none;
    }
  }
  @media screen  and (min-width: 992px){
    .vueScroll{
      max-height:400px !important;
    }
  }
</style>