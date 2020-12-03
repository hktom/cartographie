<template>
  <div>
    <a
      v-if="value"
      :href="value"
      class="link-btn-ico mr-2"
      target="_blank"
      :title="label"
    >
      <font-awesome-icon class="color-white" :icon="icon" />
    </a>
  </div>
</template>

<script>
export default {
  props: ["icon", "value", "label"],
};
</script>

<style></style>
