<template>
  <div>
    <div class="mt-4" v-if="option == 0 && data">
      <div class="mb-2 mini-fiche-label">{{ label }}</div>
      <div class="mini-fiche-content" v-html="data"></div>
    </div>

    <div class="mt-4 d-flex align-items-center" v-if="option == 1 && data">
      <div :class="`terms-icon-style ${size}`"><span :class="`${icon} mr-2`"></span></div>
      <span class="mr-1 mini-fiche-content">{{ data }}</span>
    </div>

    <div class="mt-4" v-if="option == 2 && data.length > 0">
      <div class="mb-2 mini-fiche-label">{{ label }}</div>
      <span v-for="(item, id) in data" :key="'country' + id">
        <span v-if="id != 0" class="mini-fiche-content"> | </span>
        <span class="d-inline mini-fiche-content" v-html="item"></span>
      </span>
    </div>

    <div
      v-if="option == 3 && data.length > 0"
      class="mt-4 d-flex align-items-baseline mb-4"
    >
      <div :class="`terms-icon-style ${size}`"><span :class="`${icon} mr-2`"></span></div>

      <div v-if="is_terms_and_category_valid">

        <div class="mini-fiche-content w-100" v-if="acf.categorie_solution" v-html="acf.categorie_solution">
        </div>

        <span
        class="text-pays mr-1 mt-n1"
        v-for="(item, id) in data[termIndex]"
        :key="'terms' + id"
      >
        <span v-if="id != 0" class="mini-fiche-content"> | </span>
        <span class="d-inline mini-fiche-content" v-html="item.name"></span>
      </span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
props: ["data", "label", "option", "icon", "termIndex", "acf"],
data(){
  return{
    is_terms_and_category_valid:false,
    size:window.mini_fiche_terms_icon_size,
  }
},
mounted(){
  if(this.option==3){
    if(this.data.length > 0 || this.acf.categorie_solution){
      this.is_terms_and_category_valid=true;
    }
  }
  
}

};
</script>

<style>
/* iframe.wp-embedded-content {
    display: none !important;
}
.html-render *{
  color:black !important;
} */
</style>
