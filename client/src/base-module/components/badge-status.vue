<template>
  <span
    class="badge"
    :class="{ 'badge-success': value == 1, 'badge-danger': value != 1 }"
  >
    {{ value == 1 ? on : off }}
  </span>
</template>

<script>
export default {
  props: {
    value: {
      default: 1
    },
    on: {
      default: "Activo"
    },
    off: {
      default: "Inactivo"
    }
  }
};
</script>

<style></style>
