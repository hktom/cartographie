<template>
  <div @click="showPost(data)">
    <!-- list item -->
    <div class="mb-1 mini-fiche-title">{{ acf.titre_de_la_solution }}</div>
    <div class="text-muted mb-2 mini-fiche-date">
      {{ $t("last-update") }} : {{ getDate(data.modified) }}
    </div>
    <!-- Structure Pays -->
    <div v-if="acf.pays_enreg_structure" class="d-flex align-items-center mb-2">
      <div :class="`terms-icon-style ${icon_size}`">
        <span :class="`${country_registrement_icon} mr-2`"></span>
      </div>
      <div class="mr-1 mini-fiche-content">
        {{ acf.pays_enreg_structure }}
      </div>
    </div>
    <!-- Structure Pays -->

    <!-- Structure embed Solution -->
    <div
      v-if="is_terms_and_category_valid"
      class="d-flex align-items-baseline mt-2"
    >
      <div :class="`terms-icon-style ${icon_size}`">
        <span :class="`${category_icon} mr-2`"></span>
      </div>

      <div style="margin-top:-5px">
        <div
          v-if="acf.categorie_solution"
          class="small mini-fiche-content w-100"
          v-html="acf.categorie_solution"
        ></div>

        <span
          class="text-pays mr-1 mt-n1"
          v-for="(item, id) in terms[0]"
          :key="'pays' + id"
        >
          <span v-if="id != 0" class="mini-fiche-content"> | </span>
          <span class="d-inline mini-fiche-content" v-html="item.name"></span>
        </span>
      </div>
    </div>
    <!-- Structure embed Solution -->

    <!-- Button -->
    <p
      class="mt-3 mini-fiche-content"
      v-html="resume(acf.description_solution)"
    ></p>
    <b-button
      variant="light"
      class="button-more mini-fiche-more-button"
      @click="showPost(data)"
    >
      {{ $t("more") }}
      <span :class="more_button_icon_size">
        <span :class="`${more_button_icon} ml-2`"></span>
      </span>
    </b-button>
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
      is_terms_and_category_valid: false,
      country_registrement_icon: window.country_registrement_icon,
      category_icon: window.category_icon,
      icon_size: window.mini_fiche_terms_icon_size,
      more_button_icon: window.more_button_icon,
      more_button_icon_size: window.more_button_icon_size,
    };
  },
  mounted() {
    this.acf = this.data.acf;
    this.terms = this.data._embedded["wp:term"]
      ? this.data._embedded["wp:term"]
      : [];

    if (this.terms.length > 0 || this.acf.categorie_solution) {
      this.is_terms_and_category_valid = true;
    }
  },
  computed: {},
  methods: {
    showPost(data) {
      return this.$store.commit("SHOW_POST", data);
    },
    resume(slug) {
      if (slug) {
        return slug.substr(0, 130) + "...";
      } else {
        return "";
      }
    },
    getDate(datePub) {
      const date = new Date(datePub);
      let month = date.getMonth() + 1;
      month = month >= 10 ? month : "0" + month;
      return date.getDate() + "/" + month + "/" + date.getFullYear();
    },
  },
};
</script>

<style lang="scss">
.button-more {
  background-color: transparent !important;
  border: none !important;
  &:hover {
    //color: orange;
    background-color: transparent !important;
    border: none !important;
  }
}
</style>
