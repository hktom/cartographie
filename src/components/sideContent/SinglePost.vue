<template>
  <div class="text-left">
    <div>
      <div class="header-back">
        <span
          class="icon-pictos-bridgeback ico-back color-orange"
          @click="goBack()"
        >
          <span class="l l1"></span>
          <span class="l l2"></span>
        </span>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="text-muted small">
            {{ $t("last-update") }} : {{ getDate(data.modified) }}
          </div>
          <h3 class="mt-3" v-html="data.title.rendered"></h3>

          <div class="mb-4 d-flex justify-content-start">
            
            <icon-button
            :value="acf.lien_vers_la_solution"
            :label="$t('site_web.textes')"
            icon="globe"
            />
            
            <icon-button
            :value="'mailto:'+acf.adress_mail_contact"
            :label="acf.adress_mail_contact"
            icon="envelope"
            />
            
            <icon-button
            :value="acf.liens_ext"
            :label="$t('autre_lien')"
            custom_icon="icon-pictos-bridgeexternal-link color-white"
            :custom="true"
            />

          </div>

          <mini-card
            :option="1"
            icon="icon-pictos-bridgepictos_Plan-de-travail-1"
            :value="acf.pays_enreg_structure"
          />

          <mini-card
            :option="3"
            icon="icon-pictos-bridgepictos-02"
            :value="terms"
            :termIndex="0"
          />

          <mini-card
            :option="2"
            :value="acf.pays_solution_deployee"
            :label="$t('pays_deploiement')"
          />

          <mini-card
            :option="0"
            :value="acf.annee_creation_entreprise"
            :label="$t('annee_creation')"
          />

          <mini-card
            :option="0"
            :value="acf.nombre_employe"
            :label="$t('nbre_employee')"
          />

          <mini-card
            :option="0"
            :value="acf.description_solution"
            :label="$t('description')"
          />

          <mini-card
            :option="0"
            :value="acf.categorie_solution"
            label="Categorie"
          />

          <mini-card
            :option="0"
            :value="acf.stade_de_developpement"
            label="Stade d'evolution"
          />

          <mini-card
            v-if="acf.type_fonds && acf.montant_fonds > 0"
            :option="0"
            :value="`${acf.type_fonds} pour ${acf.montant_fonds}`"
            label="Besoin en financement"
          />
          
          <mini-card
            :option="0"
            :value="acf.investisseur"
            :label="$t('investisseur')"
          />

           <mini-card
            :option="0"
            :value="acf.suivie_structure_oui"
            label="Accompagnement par une structure"
          />
           
           <mini-card
            :option="0"
            :value="acf.prix_et_distinctions_"
            label="Prix et distinctions"
          />
           
           <mini-card
            :option="0"
            :value="acf.un_chiffre__mot_cle"
            label="Un chiffre / mot clé"
          />

          <mini-card
            :option="3"
            icon="icon-pictos-bridgepictos-02"
            :value="tags"
            :termIndex="1"
          />
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from '../iconButton.vue';
import MiniCard from "../miniCard.vue";
//import { mapState, mapActions } from "vuex" ;
export default {
  components: {
    MiniCard,
    IconButton,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    tags(){
      return [];
    },
    terms() {
      if (this.$store.state.post._embedded) {
        return this.$store.state.post._embedded;
      } else {
        return [];
      }
    },
    data() {
      return this.$store.state.post;
    },
    acf() {
      return this.$store.state.post.acf;
    },
    //...mapState(['solutionsActive'])
  },
  methods: {
    //...mapActions(['setMenu']),
    getDate(datePub) {
      const date = new Date(datePub);
      let month = date.getMonth() + 1;
      month = month.length > 1 ? month : "0" + month;
      return date.getDate() + "/" + month + "/" + date.getFullYear();
    },
    goBack() {
      return this.$store.commit("SHOW_LIST_POSTS", "list_posts");
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "../../assets/sass/_variables.scss";

// .list-group-item {
//   cursor: pointer;
// }
// .st {
//   font-size: 14px;
//   color: $yellow;
//   font-weight: bold;
// }
// .image {
//   width: 100%;
//   margin-bottom: 20px;
// }

// @media screen and (min-width: 992px) {
//   .vueScroll {
//     height: 400px !important;

//     ::v-deep {
//       .__view {
//         width: auto !important;
//       }
//       .__rail-is-horizontal {
//         display: none;
//       }
//     }
//   }
// }
</style>
