<template>
  <button
    class="btn"
    :disabled="disabled || loading"
    @click.prevent="disableTemp($event)"
  >
    <slot>
      <span v-show="loading">
        <i class="fa fa-spinner fa-spin"></i>&nbsp;
      </span>
      {{ text }}
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    debounce: {
      default: 2000
    },
    disabled: {
      default: false
    },
    text: {
      default: "Guardar"
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    disableTemp(e) {
      if (!this.loading) {
        this.$emit("click", e);
        if (this.debounce > 0) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, this.debounce);
        }
      }
    }
  }
};
</script>

<style></style>
