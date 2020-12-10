<template>
  <div>
    <div class="mt-4" v-if="option == 0 && data">
      <h5 class="st mb-2">{{ label }}</h5>
      <p v-html="data"></p>
    </div>

    <div class="mt-4 d-flex align-items-center" v-if="option == 1 && data">
      <span :class="`${icon} mr-2`"></span>
      <span class="mr-1">{{ data }}</span>
    </div>

    <div class="mt-4" v-if="option == 2 && data.length > 0">
      <h5 class="st mb-2">{{ label }}</h5>
      <span v-for="(item, id) in data" :key="'country' + id">
        <span v-if="id != 0"> | </span>
        <span class="d-inline" v-html="item"></span>
      </span>
    </div>

    <div
      v-if="option == 3 && data.length > 0"
      class="mt-4 d-flex align-items-baseline mb-4"
    >
      <span :class="`${icon} mr-2`"></span>

      <div v-if="is_terms_and_category_valid">

        <div v-if="acf.categorie_solution" v-html="acf.categorie_solution" class="w-100">
        </div>

        <span
        class="text-pays mr-1 mt-n1"
        v-for="(item, id) in data[termIndex]"
        :key="'terms' + id"
      >
        <span v-if="id != 0" class="small"> | </span>
        <span class="d-inline" v-html="item.name"></span>
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

<style></style>
