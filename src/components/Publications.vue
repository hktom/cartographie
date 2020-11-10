<template>
  <div class="text-left p-3">
      <div v-if="targetPublication == null">
        <div class="header-back">
          <span class="icon-pictos-bridgeback ico-back color-orange" @click="goBack()">
            <span class="l l1"></span>
            <span class="l l2"></span>
          </span>
          <h2>Solutions Tech</h2>  
        </div>
        <vuescroll class='vueScroll'>
          <ul class="list-group list-item">
            <li class="list-group-item list-group-item-action" @click.prevent="setTargetPub(data)"
                v-for="(data, i) in solutionsActive" :key="i">
                <div class="text-muted small">Date de mise à jour : {{getDate(data.modified)}}</div>

                <div v-if="data._embedded['wp:term'][1].length > 0"
                  class="d-flex align-items-center">
                  <span class="icon-pictos-bridgepictos_Plan-de-travail-1 mr-2"></span>
                  <span class="text-muted small mr-1" v-for="(item, id) in data._embedded['wp:term'][1]" :key="id">
                    <span v-if="id != 0"> | </span>{{item.name}} 
                  </span><br/>
                </div>
                
                <div v-if="data._embedded['wp:term'][2].length > 0"
                  class="d-flex align-items-center">
                  <span class="icon-pictos-bridgepictos-02 mr-2"></span>
                  <span class="text-muted small text-pays mr-1" v-for="(item, id) in data._embedded['wp:term'][2]" :key="'pays'+id">
                    <span v-if="id != 0">&nbsp; | </span>{{item.name}} 
                  </span>
                </div>

                <p  class="mt-2" v-html="data.acf.chapeau.replace('<p>&nbsp;</p>', '')"></p>
                <a href="#!" class="more" @click.prevent="setTargetPub(data)">
                  Voir plus <span class="icon-pictos-bridgego color-orange"></span>
                </a>
            </li>
          </ul>
        </vuescroll>
      </div>
      <Publication :pub="targetPublication" v-else @back="resetPub()"></Publication>
  </div>

</template>

<script>
import { mapState, mapActions } from "vuex" ;
import Publication from "./Publication"
import vuescroll from 'vuescroll';

export default {
  components : {
    Publication,
    vuescroll
  } ,
  data(){
    return {
      targetPublication : null
    }
  },
  mounted() {
      console.log('nous sommes dans publication component', this.solutions)
  },
  computed: {
    ...mapState(['solutionsActive'])
  },
	methods: {
    ...mapActions(['setMenu']),
    getDate(datePub){
        const date = new Date(datePub)
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    },
    goBack(){
      console.log("Button cliqué")
      this.setMenu(1)
    },
    setTargetPub(data){
      this.targetPublication = data
    },
    resetPub(){
      this.targetPublication = null
    }

  },
  watch :{
    solutionsActive(){
      console.log('Ged')
      this.resetPub()
    }
  }
}
</script>


<style lang="scss" scoped>
  @import "../assets/sass/_variables.scss";
  .list-group-item{
    cursor: pointer;
    .more{
      display: flex;
      align-items: center;
      color: $orange ;
    }
  }
  .list-item{
    margin-bottom: 20px;
  }
  @media screen  and (min-width: 992px){
    .vueScroll{
      height:400px !important;
    }
  }
  
  

</style>