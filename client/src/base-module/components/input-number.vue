<template>
  <!-- <input
    type="number"
    class="form-control"
    :min="min"
    max="999999999.99"
    step="0.01"
    v-model="valueChild"
    ref="el"
    lang="en"
    @change="sendValueByChange($event.target.value)"
  >-->
  <input
    type="number"
    class="form-control"
    :min="min"
    :max="max"
    v-model="valueChild"
    :step="step"
    ref="el"
    lang="en"
  />
</template>

<script>
export default {
  components: {},
  props: {
    step: { default: "0.01" },
    min: {
      default: -99999999
    },
    value: {
      default: null,
      required: true
    },
    max: {
      default: 99999999
    }
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
  },
  methods: {
    focus() {
      this.$refs.el.focus();
    }
  }
};
</script>

<style></style>
