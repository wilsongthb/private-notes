<template>
  <select class="custom-select" v-model="valueChild">
    <option :value="undefined"></option>
    <option :value="10">10 Minutos</option>
    <option :value="20">20 Minutos</option>
    <option :value="30">30 Minutos</option>
    <option :value="40">40 Minutos</option>
    <!-- <option :value="50">50 Minutos</option> -->
    <option :value="60">60 Minutos</option>
    <!-- <option :value="70">70 Minutos</option> -->
    <option :value="80">80 Minutos</option>
    <option :value="90">90 Minutos</option>
    <!-- <option :value="100">100 Minutos</option> -->
    <option :value="120">120 Minutos</option>
  </select>
</template>

<script>
export default {
  props: {
    value: {},
    interval: {}
  },
  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style></style>
