<template>
  <div>
    <secteur v-if="menu == 1"></secteur>
  </div>
</template>

<script>
import Secteur from "./Secteur.vue";

export default {
  components : { Secteur } ,
  data() {
    return {
      menu : 1
    }
  },
}
</script>

<style lang="scss">
  
</style>