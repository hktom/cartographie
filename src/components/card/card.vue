<template>
  <div>
    <!-- list item -->
    <div class="text-muted small">
      {{ $t("last-update") }} : {{ getDate(data.modified) }}
    </div>
    <h3 class="mb-2">{{ data.acf.titre_de_la_solution }}</h3>
    <!-- Structure Pays -->
    <div v-if="data.acf.pays_enreg_structure" class="d-flex align-items-center">
      <span class="icon-pictos-bridgepictos_Plan-de-travail-1 mr-2"></span>
      <span class="small mr-1">
        {{ data.acf.pays_enreg_structure }}
      </span>
    </div>
    <!-- Structure Pays -->
    <!-- Structure embed Solution -->
    <div
      v-if="data._embedded['wp:term'][4].length > 0"
      class="d-flex align-items-baseline mt-2"
    >
      <span class="icon-pictos-bridgepictos-02 mr-2"></span>
      <div>
        <div class="small" v-html="data.acf.categorie_solution"></div>
        <div style="margin-top:-5px">
          <span
            class="text-pays mr-1 mt-n1"
            v-for="(item, id) in data._embedded['wp:term'][4]"
            :key="'pays' + id"
          >
            <span v-if="id != 0" class="small"> | </span>
            <span class="small d-inline" v-html="item.name"></span>
          </span>
        </div>
      </div>
    </div>
    <!-- Structure embed Solution -->

    <!-- Button -->
    <p class="mt-3" v-html="resume(data.acf.description_solution)"></p>
    <a href="#!" class="more">
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
    return {};
  },
  computed: {},
  methods: {
    showPost() {
      return this.$store.dispatch("SHOW_POST", this.data);
    },
    resume(slug) {
      return slug.substr(0, 130) + "...";
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
