<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-20 13:01 -->
<template>
  <select
    class="form-select"
    aria-label="Default select example"
    v-model="valueChild"
    @change="$emit('change', $event)"
  >
    <option value="">{{ nullValue }}</option>
    <option v-for="l in types" :key="l.value" :value="l.value">
      {{ l.label }}
    </option>
  </select>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    value: {},
    nullValue: {
      default: "TODOS"
    }
  },

  data: () => ({
    types: [
      { value: 1, label: "APUNTES" },
      { value: 2, label: "BORRADORES" }
    ]
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
    //
  },

  methods: {
    //
  }
};
</script>

<style scoped></style>
