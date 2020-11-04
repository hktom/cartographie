<template>
  <div>
      <h2>Publications</h2>  
      <ul class="list-group">
        <li class="list-group-item list-group-item-action" 
            v-for="(data, i) in solutions" :key="i">
            <span v-html="data.acf.chapeau"></span>
            <div class="text-muted small">Date de mise à jour : {{getDate(data.modified)}}</div>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props : ['solutions'] ,  
  components : { 
  } ,
  mounted() {
      console.log('nous sommes dans publication component', this.solutions)
  },
  data() {
    return {
      
    }
  },
methods: {
    getDate(datePub){
        const date = new Date(datePub)
        return date.getDate() + "," + (date.getMonth() + 1) + "," + date.getFullYear()
        
    } 
  },


}
</script>


<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
  }
</style>