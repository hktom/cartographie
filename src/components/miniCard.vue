<template>
  <div>
    <div class="mt-4" v-if="option == 0 && value">
      <h5 class="st mb-2">{{ label }}</h5>
      <p v-html="value"></p>
    </div>

    <div class="mt-4 d-flex align-items-center" v-if="option == 1 && value">
      <span :class="`${icon} mr-2`"></span>
      <span class="mr-1">{{ value }}</span>
    </div>

    <div class="mt-4" v-if="option == 2 && value.length > 0">
      <h5 class="st mb-2">{{ label }}</h5>
      <span v-for="(item, id) in value" :key="'country' + id">
        <span v-if="id != 0"> | </span>
        <span class="d-inline" v-html="item"></span>
      </span>
    </div>

    <div
      class="mt-4 d-flex align-items-baseline mb-4"
      v-if="option == 3 && value.length > 0"
    >
      <span :class="`${icon} mr-2`"></span>
      <span
        class="text-pays mr-1 mt-n1"
        v-for="(item, id) in value[0]"
        :key="'terms' + id"
      >
        <span v-if="id != 0" class="small"> | </span>
        <span class="d-inline" v-html="item.name"></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
props: ["value", "label", "option", "icon"],

};
</script>

<style></style>
