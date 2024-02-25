<template>
  <select
    :disabled="disabled"
    class="custom-select"
    ref="elSel"
    v-model="valueChild"
    :required="required"
  >
    <option v-for="(l, i) in list" :key="i" :value="i">
      {{ verbose ? l.name : l.symbol }}
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
    value: {
      default: undefined
    },
    verbose: {
      default: true
    },
    required: {
      default: false
    },
    disabled: {
      default: false
    }
  },

  data: () => ({
    //
  }),

  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    list() {
      return this.$options.currencyList;
    }
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    setDefault() {
      this.$emit("input", this.$options.defaultCurrency);
    },
    getEl() {
      return this.$refs.elSel;
    },
    focus() {
      this.getEl().focus();
    }
  }
};
</script>

<style scoped></style>
