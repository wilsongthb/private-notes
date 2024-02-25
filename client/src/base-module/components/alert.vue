<template>
  <transition name="fade">
    <div
      v-if="showChild"
      class="alert alert-dismissible fade show"
      role="alert"
    >
      <slot name="msj">
        {{ msj }}
      </slot>
      <slot></slot>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showChild = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      default: true,
      type: Boolean
    },
    msj: {
      type: String
    }
  },
  computed: {
    showChild: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      }
    }
  }
};
</script>

<style></style>
