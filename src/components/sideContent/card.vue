<template>
  <div>
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
    <div v-if="terms.length > 0" class="d-flex align-items-baseline mt-2">
      <span class="icon-pictos-bridgepictos-02 mr-2"></span>
      
        <!-- <div
          v-if="acf.categorie_solution != `- Select a category `"
          v-html="acf.categorie_solution"
        ></div> -->

        <div style="margin-top:-5px">
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
    <a href="#!" class="more" @click="showPost(data)">
      {{ $t("more") }} <span class="icon-pictos-bridgego color-orange"></span>
    </a>
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
    };
  },
  mounted() {
    this.acf = this.data.acf;
    this.terms = this.data._embedded?this.data._embedded["wp:term"]:[];
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
      month = month.length > 1 ? month : "0" + month;
      return date.getDate() + "/" + month + "/" + date.getFullYear();
    },
  },
};
</script>

<style></style>
