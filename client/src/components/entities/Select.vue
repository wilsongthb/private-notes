<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-15 12:52 -->
<template>
  <select
    class="form-select"
    aria-label="Default select example"
    v-model="valueChild"
  >
    <option :value="undefined"></option>
    <option v-for="l in options" :key="l.id" :value="1">{{ l.name }}</option>
  </select>
</template>
<script>
import BackendService from "src/BackendService.js";
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    value: { required: true }
  },

  data: () => ({
    options: []
  }),

  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },

  // watch: {},

  mounted() {
    BackendService.getEntities().then((res) => {
      this.options = res.results;
    });
  },

  methods: {
    //
  }
};
</script>

<style scoped></style>
