<template>
  <div class="text-left">
      <div>
        <div class="header-back">
          <span class="icon-pictos-bridgeback ico-back color-orange" @click="goBack()">
            <span class="l l1"></span>
            <span class="l l2"></span>
          </span>
        </div>
        <div class="card">
          <vuescroll class='vueScroll'>
            <div class="card-body">
                <div class="text-muted small">{{$t('last-update')}} : {{getDate(pub.modified)}}</div><br/>
                <h3 v-html="pub.title.rendered"></h3>
                <div class="mb-2">

                  <div v-if="pub._embedded['wp:term'][1].length > 0"
                    class="d-flex align-items-center">
                    <span class="icon-pictos-bridgepictos_Plan-de-travail-1 mr-2"></span>
                    <span class="mr-1" v-for="(item, id) in pub._embedded['wp:term'][1]" :key="id"> 
                      <span v-if="id != 0"> | </span>{{item.name}} 
                    </span>
                  </div>

                  <div v-if="pub._embedded['wp:term'][2].length > 0"
                    class="d-flex align-items-center">
                    <span class="icon-pictos-bridgepictos-02 mr-2"></span>
                    <span class="mr-1" v-for="(item, id) in pub._embedded['wp:term'][2]" :key="'secteur'+id"> 
                      <span v-if="id != 0"> | </span>{{item.name}} 
                    </span>
                  </div>
                </div>
                <img class='image' :src="pub._embedded['wp:featuredmedia'][0]['source_url']">
                <p>
                  <span v-html="pub.acf.chapeau.replace('<p>&nbsp;</p>', '')"></span>
                </p>
                <div v-if="pub.acf.liens_ext">
                  <h2 class=""> {{$t('site_web')}} </h2>
                  <p v-html="pub.acf.liens_ext"></p>
                </div>
                <div v-if="pub.acf.auteur_email">
                  <h2 class="">Mail contact</h2>
                  <p v-html="pub.acf.auteur_email"></p>
                </div>
                <div v-if="pub.acf.lien_vers_la_solution">
                  <h2 class="">Linkedin</h2>
                  <p v-html="pub.acf.lien_vers_la_solution"></p>
                </div>
                <div v-if="pub.acf.pays_enreg_structure">
                  <h2 class="">{{$t('pays_origine')}}}</h2>
                  <p v-html="pub.acf.pays_enreg_structure"></p>
                </div>
                <div v-if="pub.acf.pays_solution_deployee">
                  <h2 class="">{{$t('pays_deploiement')}}</h2>
                  <p v-html="pub.acf.pays_solution_deployee"></p>
                </div>
                <div v-if="pub.acf.annee_creation_entreprise">
                  <h2 class="">{{$t('annee_creation')}}</h2>
                  <p v-html="getDate(pub.acf.annee_creation_entreprise)"></p>
                </div>
                <div v-if="pub.acf.nombre_employe">
                  <h2 class="">{{$t('nbre_employee')}}</h2>
                  <p v-html="pub.acf.nombre_employe"></p>
                </div>
                <div v-if="pub.acf.stade_de_developpement">
                  <h2 class="">Stade</h2>
                  <p v-html="pub.acf.stade_de_developpement"></p>
                </div>
                <!-- <div v-if="pub.acf.type_fonds || pub.acf.montant_fonds">
                  <h2 class="">Besoin en financement</h2>
                  <p v-html="pub.acf.type_fonds"></p>
                  <p v-html="pub.acf.montant_fonds"></p>
                </div> -->
                <div v-if="pub.acf.nature_et_structure_capital || 
                   pub.acf.levee_fonds || pub.acf.type_fonds || pub.acf.montant_fonds ">
                  <h2 class="">{{$t('investisseur')}}</h2>
                  <div v-if="pub.acf.nature_et_structure_capital">
                    <span class="small text-muted">
                       {{$t('nature_et_structure_capital')}} 
                    </span>
                    <p v-html="pub.acf.nature_et_structure_capital"></p>
                  </div>
                  <div v-if="pub.acf.levee_fonds">
                    <span class="small text-muted">
                       {{$t('levee_fonds')}} 
                    </span>
                    <p v-html="pub.acf.levee_fonds"></p>
                  </div>
                  <div v-if="pub.acf.type_fonds && pub.acf.levee_fonds.toLowerCase() == 'oui'">
                    <span class="small text-muted">
                       {{$t('type_fonds')}} 
                    </span>
                    <p v-html="pub.acf.type_fonds"></p>
                  </div>
                  <div v-if="pub.acf.montant_fonds && pub.acf.levee_fonds.toLowerCase() == 'oui'">
                    <span class="small text-muted">
                       {{$t('montant_fonds')}} 
                    </span>
                    <p v-html="pub.acf.montant_fonds"></p>
                  </div>
                </div>                

                <div v-if="pub.acf.suivie_structure">
                  <h2 class="">{{$t('accompagnement')}}</h2>
                  <div v-if="pub.acf.suivie_structure">
                    <span class="small text-muted">
                       {{$t('suivie_structure')}} 
                    </span>
                    <p v-html="pub.acf.suivie_structure"></p>
                  </div>

                  <div v-if="pub.acf.suivie_structure_oui && 
                    pub.acf.suivie_structure_oui.toLowerCase() == 'oui'">
                    <span class="small text-muted">
                       {{$t('suivie_structure_oui')}} 
                    </span>
                    <p v-html="pub.acf.suivie_structure_oui"></p>
                  </div>
                </div>
                <div v-if="pub.acf.solution_prix">
                  <h2 class="">{{$t('solution_prix')}}</h2>
                  <p v-html="pub.acf.solution_prix"></p>
                </div> 



            </div>
          </vuescroll>
        </div>
      </div>

  </div>

</template>

<script>
import { mapState, mapActions } from "vuex" ;
import vuescroll from 'vuescroll';

export default {
  props : ['pub'],
  components : {
    vuescroll 
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
      let month = (date.getMonth() + 1)
      month = month.length > 1 ? month : '0' + month
      return date.getDate() + "/" + month + "/" + date.getFullYear()
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
    font-size: 50px;
    color: #FBC026;
  }
  .image{
    width:100%;
    margin-bottom: 20px;
  }
  @media screen  and (min-width: 992px){
    .vueScroll{
      height:400px !important;
    }
  }

</style>