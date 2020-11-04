<template>
  <div>
      <h2>Publications</h2>  
      <ul class="list-group">
        <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
         Je suis Thythy
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
}
</script>


<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
  }
</style>