<template>
  <div>
    <a
      v-if="data"
      :href="data"
      class="link-btn-ico mr-2"
      target="_blank"
      :title="label"
    >
      <font-awesome-icon class="color-white" :icon="icon" v-if="!custom" />
      <span :class="custom_icon" v-if="custom"></span>
    </a>
  </div>
</template>

<script>
export default {
  props: ["icon", "data", "label", "custom", "custom_icon"],
};
</script>

<style></style>
