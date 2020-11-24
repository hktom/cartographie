<template>
  <div class="text-left p-3">
    <h2>{{$t('categories')}}</h2>  
    <!--
    <div class="loader-map" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">{{$t('loading')}}</span>
      </div>
    </div>
    -->
    <vuescroll class="vueScroll">
      <ul class="list-group">
        <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
          v-for="(data, i) in categories" :key="i"
          @click="getFromSecteurs(data)"
        >
          <span v-html="data.name"></span>
          <span class="badge badge-nb badge-primary badge-pill">{{data.nb}}</span>
        </li>
      </ul>
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
    transform: scale(1);
    @media (min-width: 992px){
      transform: scale(0);
    }
  }
  @media screen  and (min-width: 992px){
    .vueScroll{
      height:400px !important;
    }
  }
</style>