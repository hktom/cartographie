<template>
  <div class="text-left p-3">
      <div v-if="targetPublication == null">
        <div class="header-back">
          <img src="../assets/ico/back-orange.svg" @click="goBack()" alt="">
          <h2>Publications</h2>  
        </div>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" 
              v-for="(data, i) in solutionsActive" :key="i">
              <div class="text-muted small">Date de mise à jour : {{getDate(data.modified)}}</div>
              <span v-html="data.acf.chapeau"></span>
                                
              <a href="#!" class="more" @click.prevent="setTargetPub(data)">
                Voir plus <span class="icon-pictos-bridgego color-orange"></span>
              </a>
          </li>
        </ul>
      </div>
      <Publication :pub="targetPublication" v-else @back="resetPub()"></Publication>
  </div>

</template>

<script>
import { mapState, mapActions } from "vuex" ;
import Publication from "./Publication"
export default {
  components : {
    Publication
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
</style>