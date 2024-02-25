<!-- <template> -->
<!--   <div class="input-group"> -->
<!--     <div class="input-group-prepend"> -->
<!--       <app-select-currency -->
<!--         style="border-radius: 0.25rem 0rem 0rem 0.25rem" -->
<!--         ref="elSelCurr" -->
<!--         :disabled="disabled || disableCurrency" -->
<!--         :required="required" -->
<!--         v-model="currencyChild" -->
<!--       ></app-select-currency> -->
<!--     </div> -->

<!--     <input -->
<!--       type="number" -->
<!--       class="form-control" -->
<!--       v-model="valueChild" -->
<!--       :disabled="disabled" -->
<!--       :required="required" -->
<!--       ref="elInpQua" -->
<!--       lang="en" -->
<!--       step="0.01" -->
<!--     /> -->
<!--   </div> -->
<!-- </template> -->

<!-- <script> -->
<!-- export default { -->
<!--   components: { -->
<!--     // -->
<!--   }, -->

<!--   // directives -->
<!--   // filters -->

<!--   props: { -->
<!--     value: {}, -->
<!--     quantity: {}, -->
<!--     floatValue: { -->
<!--       default: true -->
<!--     }, -->
<!--     currency: { -->
<!--       default: 1 -->
<!--     }, -->
<!--     required: { -->
<!--       default: false -->
<!--     }, -->
<!--     disabled: { -->
<!--       default: false -->
<!--     }, -->

<!--     /** -->
<!--      * -->
<!--      * Desactivar seleccionar moneda -->
<!--      * -->
<!--      */ -->
<!--     disableCurrency: { -->
<!--       default: false -->
<!--     } -->
<!--   }, -->

<!--   data: () => ({ -->
<!--     // -->
<!--   }), -->

<!--   computed: { -->
<!--     valueChild: { -->
<!--       get() { -->
<!--         return this.valuea; -->
<!--       }, -->
<!--       set(val) { -->
<!--         this.$emit("input", this.floatValue ? parseFloat(val) : val); -->
<!--       } -->
<!--     }, -->

<!--     currencyChild: { -->
<!--       get() { -->
<!--         return this.currency; -->
<!--       }, -->
<!--       set(val) { -->
<!--         this.$emit("update:currency", val); -->
<!--       } -->
<!--     } -->
<!--   }, -->

<!--   watch: { -->
<!--     // -->
<!--   }, -->

<!--   mounted() { -->
<!--     // -->
<!--   }, -->

<!--   methods: { -->
<!--     setDefault() { -->
<!--       this.$emit("update:currency", 0); -->
<!--       this.$refs.selectMoney.setDefault(); -->
<!--     } -->
<!--     // focus(target = INPUT_TARGET) { -->
<!--     //   if (target == INPUT_TARGET) this.$refs.elInpQua.focus(); -->
<!--     //   else if (target == CURRENCY_TARGET) this.$refs.elSelCurr.focus(); -->
<!--     // } -->
<!--   } -->
<!-- }; -->
<!-- </script> -->

<!-- <style scoped></style> -->

<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">S/</span>
    </div>
    <input
      type="number"
      class="form-control"
      step="0.01"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
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
      //
    },
    placeholder: {
      default: ""
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
