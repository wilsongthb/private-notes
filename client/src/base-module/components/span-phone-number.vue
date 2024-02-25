<template>
  <a :href="'tel:' + number">
    <span class="text-muted">
      <i class="fa fa-phone"></i>
      {{ number }}
    </span>
  </a>
</template>

<script>
export default {
  props: {
    number: {}
  }
};
</script>

<style></style>
