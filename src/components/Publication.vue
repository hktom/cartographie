<template>
  <div class="text-left">
      <div>
        <div class="header-back">
          <img src="../assets/ico/back-orange.svg" @click="goBack()" alt="">
        </div>
        <div class="card">
          <div class="card-body">
              <div class="text-muted small">Date de mise à jour : {{getDate(pub.modified)}}</div>
              <p>
                <span v-html="pub.acf.chapeau.replace('<p>&nbsp;</p>', '')"></span>
              </p>
              <div v-if="pub.acf.auteur != ''">
                <h2 class="">AUTEUR</h2><br/>
                <p v-html="pub.acf.auteur"></p>
              </div>
              <div v-if="pub.acf.auteur_de_la_citation != ''">
                <h2 class="">L'AUTEUR DE LA CITATION</h2><br/>
                <p v-html="pub.acf.auteur_de_la_citation"></p>
              </div>
              <div v-if="pub.acf.la_citation != ''">
                <h2 class="">LA CITATION</h2><br/>
                <p v-html="pub.acf.la_citation"></p>
              </div>
              <div v-if="pub.acf.titre_du_probleme || pub.acf.le_probleme != ''" >
                <h2 class="">L'ENJEU</h2>
                <p v-html="pub.acf.titre_du_probleme"></p>
                <p  v-html="pub.acf.le_probleme"></p>
              </div>
              <div v-if="pub.acf.titre_de_la_solution || pub.acf.la_solution  != ''">
                <h2 class="">LA SOLUTION</h2>
                <p  v-html="pub.acf.titre_de_la_solution"></p>          
                <p  v-html="pub.acf.la_solution"></p>
              </div>
              <div v-if="pub.acf.le_regard_de_digital_africa != ''">
                <h2 class="">LE REGARD DE DIGITAL AFRICA</h2>
                <p  v-html="pub.acf.le_regard_de_digital_africa"></p>
              </div>
              <div v-if="pub.acf.les_acteurs != ''">
                <h2 class="">LES ACTEURS</h2>
                <p  v-html="pub.acf.les_acteurs"></p>
              </div>
              <div v-if="pub.acf.titre_de_limpact || pub.acf.limpact != ''">
                <h2 class="">L'IMPACT</h2>
                <p  v-html="pub.acf.titre_de_limpact"></p>
                <p  v-html="pub.acf.limpact"></p>
              </div> 
              <div v-if="pub.acf.lien_vers_la_solution != ''">
                <h2 class="">LE LIEN VERS LA SOLUTION</h2>
                <p v-html="pub.acf.lien_vers_la_solution"></p>
              </div>
              <div v-if="pub.acf.liens_ext != ''">
                <h2 class="">LE LIEN EXTERNE</h2>
                <p  v-html="pub.acf.liens_ext"></p>
              </div>             
          </div>
        </div>
      </div>

  </div>

</template>

<script>
import { mapState, mapActions } from "vuex" ;
export default {
  props : ['pub'],
  components : { 
  } ,
  data(){
    return {
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
      this.$emit('back')
    },
    
  },
}
</script>


<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
  }
  h2{
    font-size: 30px;
    color: #FBC026;
  }
</style>