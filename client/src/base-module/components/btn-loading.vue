<template>
  <button
    class="btn btn-primary"
    @click="executeProcess()"
    :disabled="isLoading || disabled"
  >
    <slot>
      <i v-show="isLoading" class="fa fa-spinner fa-spin fa-fw"></i>
      {{ value }}
    </slot>
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
    toLoad: {
      type: Function,
      default: () => 1
    },
    value: { default: "Cargar" },
    disabled: { default: false },
    debounce: {
      default: 3000
    }
  },

  data: () => ({
    isLoading: false
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
    executeProcess() {
      this.$emit("click");
      this.isLoading = true;
      let maybePromise = this.toLoad();
      if (maybePromise && maybePromise.then) {
        // console.log("is a Promise");
        maybePromise.then((result) => {
          this.isLoading = false;
          this.$emit("then", result);
        });
      } else {
        // console.log("no is a Promise");
        setTimeout(() => {
          this.isLoading = false;
        }, this.debounce);
      }
    }
  }
};
</script>

<style></style>
