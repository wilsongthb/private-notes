<template>
  <div class="progress">
    <div ref="bar" class="progress-bar" role="progressbar"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  mounted() {
    this.$refs.bar.style.width = this.value + "%";
  },
  watch: {
    value() {
      this.$refs.bar.style.width = this.value + "%";
    }
  }
};
</script>

<style></style>
