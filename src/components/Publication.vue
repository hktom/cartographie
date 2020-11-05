<template>
  <div class="text-left">
      <div>
        <div class="header-back">
          <img src="../assets/ico/back-orange.svg" @click="goBack()" alt="">
        </div>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action">
              <div class="text-muted small">Date de mise à jour : {{getDate(pub.modified)}}</div>
              <p>
                <span v-html="pub.acf.chapeau.replace('<p>&nbsp;</p>', '')"></span>
              </p>
              <p>
                <span class="text-muted small">AUTEUR</span><br/>
                <span v-html="pub.acf.auteur"></span>
              </p>
              <p>
                <span class="text-muted small">L'AUTEUR DE LA CITATION</span><br/>
                <span v-html="pub.acf.auteur_de_la_citation"></span>
              </p>
              <p>
                <span class="text-muted small">LA CITATION</span><br/>
                <span v-html="pub.acf.la_citation"></span>
              </p>
              <p>
                <span class="text-muted small">L'ENJEU</span><br/>
                <span v-html="pub.acf.titre_du_probleme"></span>
                <span  v-html="pub.acf.le_probleme"></span>
              </p>
              <p>
                <span class="text-muted small">LA SOLUTION</span><br/>
                <span  v-html="pub.acf.titre_de_la_solution"></span><br/>           
                <span  v-html="pub.acf.la_solution"></span>
              <p>
                <span class="text-muted small">LE REGARD DE DIGITAL AFRICA</span>
                <span  v-html="pub.acf.le_regard_de_digital_africa"></span>
              </p>
              <p>
                <span class="text-muted small">LES ACTEURS</span>
                <span  v-html="pub.acf.les_acteurs"></span>
              </p>
              <p>
                <span class="text-muted small">L'IMPACT</span><br/>
                <span  v-html="pub.acf.titre_de_limpact"></span>
                <span  v-html="pub.acf.limpact"></span>
              </p> 
              <p>
                <span class="text-muted small">LE LIEN VERS LA SOLUTION</span><br/>
                <span v-html="pub.acf.lien_vers_la_solution"></span>
              </p>
              <p>
                <span class="text-muted small">LE LIEN EXTERNE</span>
                <span  v-html="pub.acf.liens_ext"></span>
              </p>             
          </li>
        </ul>
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
</style>