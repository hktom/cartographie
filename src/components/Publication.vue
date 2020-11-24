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
          <vuescroll class="vueScroll">
            <div class="card-body">
                <div class="text-muted small">{{$t('last-update')}} : {{getDate(pub.modified)}}</div>
                <h3 class="mt-3" v-html="pub.title.rendered"></h3>
                
                <!--
                <img class='image' 
                  v-if="pub._embedded['wp:featuredmedia'][0]['source_url']" 
                  :src="pub._embedded['wp:featuredmedia'][0]['source_url']"
                >
                -->

                <div  class="mb-4">
                  <a :href="pub.acf.lien_vers_la_solution" class="link-btn-ico mr-2" target="_blank"
                    :title="$t('site_web.textes')"  
                    v-if="pub.acf.lien_vers_la_solution"
                  >
                    <font-awesome-icon class="color-white" icon="globe" />
                  </a>
                  
                  <a :href="'mailto:' + pub.acf.auteur_email" 
                    v-if="pub.acf.auteur_email" class="link-btn-ico mr-2"
                    :title="'mailto : ' + pub.acf.auteur_email"   
                  >
                    <font-awesome-icon class="color-white" icon="envelope" />
                  </a>

                  <a :href="pub.acf.liens_ext"
                    v-if="pub.acf.liens_ext" class="link-btn-ico"
                    :title="$t('autre_lien')"   
                    target="_blank"
                  >
                    <span class="icon-pictos-bridgeexternal-link color-white"></span>
                  </a>
                </div>


                <div v-if="pub.acf.pays_enreg_structure"
                  class="d-flex align-items-center">
                  <span class="icon-pictos-bridgepictos_Plan-de-travail-1 mr-2"></span>
                  <span class="small mr-1">
                  {{pub.acf.pays_enreg_structure}} 
                  </span>
                </div>
                
                <div v-if="pub._embedded['wp:term'][4].length > 0"
                  class="d-flex align-items-baseline mt-2 mb-4">
                  <span class="icon-pictos-bridgepictos-02 mr-2"></span>
                  <div>
                    <div class="small" v-html="pub.acf.categorie_solution"></div>
                    <div style="margin-top:-5px">
                      <span class="text-pays mr-1 mt-n1" v-for="(item, id) in pub._embedded['wp:term'][4]" :key="'pays'+id">
                        <span v-if="id != 0" class="small"> | </span> 
                        <span class="small d-inline" v-html="item.name"></span> 
                      </span>
                    </div>
                  </div>
                </div>


                <div v-if="pub.acf.pays_solution_deployee">
                  <h2 class="st">{{$t('pays_deploiement')}}</h2>
                  <p v-html="pub.acf.pays_solution_deployee"></p>
                </div>

                <div v-if="pub.acf.description_solution">
                  <h2 class="st">{{$t('description')}}</h2>
                  <p v-html="pub.acf.description_solution"></p>
                </div>

                <div v-if="pub.acf.liens_ext">
                  <h2 class="st">{{$t('autre_lien')}}</h2>
                  <p v-html="pub.acf.liens_ext"></p>
                </div>
                <div v-if="pub.acf.annee_creation_entreprise">
                  <h2 class="st">{{$t('annee_creation')}}</h2>
                  <p v-html="pub.acf.annee_creation_entreprise"></p>
                </div>
                <div v-if="pub.acf.nombre_employe">
                  <h2 class="st">{{$t('nbre_employee')}}</h2>
                  <p v-html="pub.acf.nombre_employe"></p>
                </div>
                <div v-if="pub.acf.stade_de_developpement">
                  <h2 class="st">Stade</h2>
                  <p v-html="pub.acf.stade_de_developpement"></p>
                </div>
                <!-- <div v-if="pub.acf.type_fonds || pub.acf.montant_fonds">
                  <h2 class="st">Besoin en financement</h2>
                  <p v-html="pub.acf.type_fonds"></p>
                  <p v-html="pub.acf.montant_fonds"></p>
                </div> -->
                <div v-if="pub.acf.type_fonds || pub.acf.montant_fonds "
                >
                  <h2 class="st">{{$t('besoin_financement')}}</h2>
                  <div v-if="pub.acf.type_fonds">
                    <span class="small text-muted">
                      {{$t('type')}} 
                    </span> <br>
                    <span v-html="pub.acf.type_fonds"></span>
                  </div>
                  <div v-if="pub.acf.montant_fonds">
                    <span class="small text-muted">
                      {{$t('montant')}} 
                    </span> <br>
                    <span v-html="pub.acf.montant_fonds"></span>
                  </div>
                </div>     

                <div class="mt-3">
                  <h2 class="st">{{$t('investisseur')}}</h2>
                  <p v-html="pub.acf.investisseur"></p>
                </div>

                <div v-if="pub.acf.suivie_structure">
                  <h2 class="st">{{$t('accompagnement')}}</h2>
                  <div v-if="pub.acf.suivie_structure">
                    <span class="small text-muted">
                      {{$t('suivie_structure')}} 
                    </span>
                    <p v-html="pub.acf.suivie_structure"></p>
                  </div>
                  <div v-if="pub.acf.suivie_structure_oui && 
                    pub.acf.suivie_structure.toLowerCase() == 'oui'">
                    <span class="small text-muted">
                      {{$t('suivie_structure_oui')}} 
                    </span>
                    <p v-html="pub.acf.suivie_structure_oui"></p>
                  </div>
                </div>
                <div v-if="pub.acf.solution_prix">
                  <h2 class="st">{{$t('solution_prix')}}</h2>
                  <p v-html="pub.acf.solution_prix"></p>
                </div>
                <div v-if="pub.acf.etiquette">
                  <h2 class="st">{{$t('etiquette')}}</h2>
                  <p v-html="pub.acf.etiquette"></p>
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
    // mounted
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
      this.$emit('back')
    },
    
  },
}
</script>


<style lang="scss" scoped>
  @import "../assets/sass/_variables.scss";

  .list-group-item{
    cursor: pointer;
  }
  .st{
    font-size: 14px;
    color: $yellow;
    font-weight: bold;
  }
  .image{
    width:100%;
    margin-bottom: 20px;
  }

  @media screen  and (min-width: 992px){
    .vueScroll{
      height:400px !important;
      
      ::v-deep {
        .__view{
          width: auto !important;
        }
        .__rail-is-horizontal{
          display: none;
        }
      }

    }
  }

</style>