<template>
  <!-- <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" v-model="valueChild" :id="idCB" :disabled="disabled">
    <label class="custom-control-label" :for="idCB">
      <slot>
        {{ placeholder }}
      </slot>
    </label>
  </div>-->

  <div class="custom-control custom-switch">
    <input
      type="checkbox"
      class="custom-control-input"
      v-model="valueChild"
      :disabled="disabled"
      :id="idCB"
    />
    <label class="custom-control-label" :for="idCB">
      <slot>{{ placeholder }}</slot>
    </label>
  </div>

  <!-- <bFormCheckBox

  ><slot>{{ placeholder }}</slot> </bFormCheckBox>-->
</template>

<script>
// import bFormCheckBox from "bootstrap-vue/es/components/form-checkbox";

// node_modules\bootstrap-vue\es\components\form-checkbox

export default {
  components: {
    // bFormCheckBox
  },
  props: {
    value: {},
    placeholder: {
      type: String,
      default: "Activo"
    },
    id: {
      // required: true
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
