<template>
  <div @click="showPost(data)">
    <!-- list item -->
    <h4 class="mb-1">{{ acf.titre_de_la_solution }}</h4>
    <div class="text-muted mb-2">
      {{ $t("last-update") }} : {{ getDate(data.modified) }}
    </div>
    <!-- Structure Pays -->
    <div v-if="acf.pays_enreg_structure" class="d-flex align-items-center mb-2">
      <span class="icon-pictos-bridgepictos_Plan-de-travail-1 mr-2"></span>
      <span class="mr-1">
        {{ acf.pays_enreg_structure }}
      </span>
    </div>
    <!-- Structure Pays -->

    <!-- Structure embed Solution -->
    <div v-if="is_terms_and_category_valid" class="d-flex align-items-baseline mt-2">
      <span class="icon-pictos-bridgepictos-02 mr-2"></span>
      
        <div style="margin-top:-5px">
          <div v-if="acf.categorie_solution" v-html="acf.categorie_solution" class="w-100">
        </div>

          <span
            class="text-pays mr-1 mt-n1"
            v-for="(item, id) in terms[0]"
            :key="'pays' + id"
          >
            <span v-if="id != 0" class="small"> | </span>
            <span class="d-inline" v-html="item.name"></span>
          </span>
        </div>
      
    </div>
    <!-- Structure embed Solution -->

    <!-- Button -->
    <p class="mt-3" v-html="resume(acf.description_solution)"></p>
    <b-button variant="light" class="more button-more" @click="showPost(data)">
      {{ $t("more") }} <span class="icon-pictos-bridgego color-orange"></span>
    </b-button>
    <!-- <a href="#" class="more" @click="showPost(data)">
      {{ $t("more") }} <span class="icon-pictos-bridgego color-orange"></span>
    </a> -->
    <!-- Button -->

    <!-- list item -->
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      acf: {},
      terms: [],
      is_terms_and_category_valid:false,
    };
  },
  mounted() {
    this.acf = this.data.acf;
    this.terms = this.data._embedded?this.data._embedded["wp:term"]:[];
    if(this.terms.length > 0 || this.acf.categorie_solution){
      this.is_terms_and_category_valid=true;
    }
  },
  computed: {},
  methods: {
    showPost(data) {
      return this.$store.commit("SHOW_POST", data);
    },
    resume(slug) {
      if(slug){
        return slug.substr(0, 130) + "...";
      }
      else
      {
        return "";
      }
    },
    getDate(datePub) {
      const date = new Date(datePub);
      let month = date.getMonth() + 1;
      month = month >= 10 ? month : '0'+month;
      return date.getDate() + "/" + month + "/" + date.getFullYear();
    },
  },
};
</script>

<style lang="scss">
.button-more{
  background-color: transparent !important;
  border:none !important;
  &:hover{
    color: orange;
    background-color: transparent !important;
  border:none !important;
  }
}
</style>
