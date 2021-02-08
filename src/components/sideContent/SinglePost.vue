<template>
  <div class="text-left">
    <div>
      <div :class="`header-back pl-4 mini-fiche-icon-back-color mt-4 ${button_back_icon_size}`" @click="goBack()">
        <span
          :class="`${button_back_icon}`" 
        >
        </span>
      </div>

      <div class="card" style="border:none !important">
        <div class="card-body">
          <div class="text-muted small mini-fiche-date">
            {{ $t("last-update") }} : {{ getDate(data.modified) }}
          </div>
          <div class="mt-3 mini-fiche-title" v-html="data.title.rendered"></div>

          <div class="container-fluid">
            <div class="row">
          
          <div class="col-6" v-if="data.featured_media_src_url">
            <img :src="data.featured_media_src_url" style="width:200px;height:auto; object-fit:cover"/>
          </div>
              

          <div class="col-3 ml-3 mt-3">
          <div class="mb-4 d-flex justify-content-start align-items-center">
            
            <icon-button
            v-if="acf.lien_vers_la_solution"
            :data="acf.lien_vers_la_solution"
            :label="$t('site_web.textes')"
            :icon="`${mini_fiche_word_icon}`"
            />
            
            <icon-button
            v-if="acf.adress_mail_contact"
            :data="'mailto:'+acf.adress_mail_contact"
            :label="acf.adress_mail_contact"
            :icon="`${mini_fiche_email_icon}`"
            />
            
            <icon-button
            v-if="acf.liens_ext"
            :data="acf.liens_ext"
            :label="$t('autre_lien')"
            :icon="`${mini_fiche_link_icon}`"
            />

          </div>
              </div>
            </div>
          </div>

          <mini-card
            :option="1"
            :icon="`${country_registrement_icon}`"
            :data="acf.pays_enreg_structure"
          />

          <mini-card
            :option="3"
            :icon="category_icon"
            :data="terms"
            :termIndex="0"
            :acf="acf"
          />

          <mini-card
            :option="2"
            :data="acf.pays_solution_deployee"
            :label="$t('pays_deploiement')"
          />

          <mini-card
            :option="0"
            :data="acf.annee_creation_entreprise"
            :label="$t('annee_creation')"
          />

          <mini-card
            :option="0"
            :data="acf.nombre_employe"
            :label="$t('nbre_employee')"
          />

          <mini-card
            :option="0"
            :data="acf.description_solution"
            :label="$t('description')"
          />

          <mini-card
            :option="0"
            :data="acf.categorie_solution"
            label="Categorie"
          />

          <mini-card
            :option="0"
            :data="acf.stade_de_developpement"
            :label="$t('stade')"
          />

          <mini-card
            v-if="acf.type_fonds && acf.montant_fonds > 0"
            :option="0"
            :data="`${acf.type_fonds} pour ${acf.montant_fonds} $`"
            :label="$t('besoin_financement')"
          />
          
          
          <mini-card
            :option="0"
            :data="acf.investisseur"
            :label="$t('investisseur')"
          />

          
           <mini-card
            :option="0"
            :data="acf.accompagnement_par_une_structure"
            :label="$t('accompagnement')"
          />
           
           <mini-card
            :option="0"
            :data="acf.prix_et_distinctions_"
            :label="$t('prix')"
          />
           
           <mini-card
            :option="0"
            :data="acf.un_chiffre__mot_cle"
            :label="$t('mot clé')"
          />

          <div style="width:100%;overflow:hidden" class="a-lire">
            <mini-card
            :option="0"
            :data="`<a class='mb-2 mini-fiche-label link-mini-fiche-label' href='${acf.a_lire}'>${$t('a lire')}</a>`"
            :label="''"
          />
          </div> 
         
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
    return {
      button_back_icon:window.button_back_icon,
      button_back_icon_size: window.button_back_icon_size,
      category_icon:window.category_icon,
      country_registrement_icon:window.country_registrement_icon,
      mini_fiche_word_icon:window.mini_fiche_word_icon,
      mini_fiche_email_icon:window.mini_fiche_email_icon,
      mini_fiche_link_icon:window.mini_fiche_link_icon,
    };
  },
  mounted() {},
  computed: {
    tags(){
      return [];
    },
    terms() {
      if (this.$store.state.post._embedded["wp:term"]) {
        return this.$store.state.post._embedded["wp:term"];
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
      month = month >= 10 ? month : "0" + month;
      return date.getDate() + "/" + month + "/" + date.getFullYear();
    },
    goBack() {
      return this.$store.commit("SHOW_LIST_POSTS", "list_posts");
    },
  },
};
</script>

<style>
.link-mini-fiche-label:hover{
  text-decoration: none !important;
}
.header-back{
  cursor: pointer !important;
}

</style>