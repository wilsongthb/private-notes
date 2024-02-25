<template>
  <input
    type="tel"
    class="form-control"
    v-model="valueChild"
    pattern="[+51]{3}[0-9]{9}"
  />
</template>

<script>
export default {
  props: { value: {} },
  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set() {
        this.$emit("input");
      }
    }
  }
};
</script>

<style></style>
