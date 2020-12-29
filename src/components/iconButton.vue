<template>
  <div>
    <a
      v-if="data"
      :href="data"
      :class="`mr-2 mini-fiche-link-icon-button p-2 ${size}`"
      target="_blank"
      :title="label"
    >
      <span :class="icon"></span>
    </a>
  </div>
</template>

<script>
export default {
  props: ["icon", "data", "label", "custom", "custom_icon"],
  data(){
    return{
      size:window.button_icon_size
    }
  }
};
</script>

<style></style>
