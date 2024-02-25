<template>
  <button
    type="submit"
    class="btn btn-primary"
    :disabled="loading || disabled"
    @click="$emit('click')"
  >
    <i v-show="loading" class="fas fa-spinner fa-spin mr-1"></i>
    <slot>Guardar</slot>
  </button>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    loading: {
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
    //
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    //
  }
};
</script>

<style scoped></style>
