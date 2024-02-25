<template>
  <div class="custom-control custom-checkbox">
    <input
      type="checkbox"
      class="custom-control-input"
      v-model="valueChild"
      :id="idCB"
      :disabled="disabled"
    />
    <label class="custom-control-label" :for="idCB">
      <slot>
        {{ placeholder }}
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {},
    id: {},
    placeholder: {
      default: ""
    },
    disabled: {
      default: false
    }
  },
  data: () => ({
    idCB: ""
  }),
  mounted() {
    // console.log(this._uid)
    this.idCB = this._uid.toString() + "cb";
  },
  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", !!val);
      }
    }
  }
};
</script>

<style></style>
