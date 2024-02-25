<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <app-select-currency
        style="border-radius: 0.25rem 0rem 0rem 0.25rem"
        ref="elSelCurr"
        :disabled="disabled || disableSelectCurrency"
        :required="required"
        v-model="moneyCodeChild"
      ></app-select-currency>
    </div>

    <input
      type="number"
      class="form-control"
      v-model="quantityChild"
      :disabled="disabled"
      :required="required"
      ref="elInpQua"
      lang="en"
      step="0.01"
    />
  </div>
</template>

<script>
const CURRENCY_TARGET = 1;
const INPUT_TARGET = 2;

export default {
  props: {
    quantity: {},
    moneyCode: {},
    required: {
      default: false
    },
    disabled: {
      default: false
    },

    /**
     *
     * Desactivar seleccionar moneda
     *
     */
    disableSelectCurrency: {
      default: false
    }
  },
  methods: {
    parseFloat,
    setDefault() {
      this.$emit("update:quantity", 0);
      this.$refs.elSelCurr.setDefault();
    },
    focus(target = INPUT_TARGET) {
      if (target == INPUT_TARGET) this.$refs.elInpQua.focus();
      else if (target == CURRENCY_TARGET) this.$refs.elSelCurr.focus();
    }
  },
  computed: {
    quantityChild: {
      get() {
        return this.quantity;
      },
      set(val) {
        this.$emit("update:quantity", val);
      }
    },
    moneyCodeChild: {
      get() {
        return this.moneyCode;
      },
      set(val) {
        this.$emit("update:moneyCode", val);
      }
    }
  }
};
</script>

<style></style>
