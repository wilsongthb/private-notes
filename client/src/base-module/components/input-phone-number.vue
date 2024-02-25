<template>
  <div class="input-group">
    <input
      type="tel"
      ref="el"
      class="form-control"
      :disabled="disabled"
      v-model="val"
      name="phone_number"
    />
  </div>
</template>

<script>
// import * as intTelInput from "intl-tel-input/build/js/intlTelInput";

export default {
  watch: {
    value(to) {
      if (to != this.getNumber() && to !== undefined) {
        this.$options.iti.setNumber(to);
        return;
      }

      if (to === undefined) {
        this.val = "";
        this.$options.iti.setNumber("");
      }
    },
    val() {
      // console.log("num Change");
      this.$emit("input", this.getNumber());
    }
  },
  data: () => ({
    val: ""
  }),
  iti: {},
  changeCountry: {},
  props: {
    value: {},
    disabled: {
      default: false
    }
  },
  beforeDestroy() {
    this.$options.iti.destroy();
    this.$options.changeCountry = {};
  },
  methods: {
    getNumber() {
      let val = this.$options.iti.getSelectedCountryData();
      let cVal = this.$refs.el.value + "";
      if (cVal.indexOf("+" + val.dialCode) == -1) {
        cVal = "+" + val.dialCode + cVal;
      }
      return cVal;
    },
    setNumber() {}
  },
  mounted() {
    // this.$options.iti = intTelInput(this.$refs.el, {
    //   initialCountry: "PE"
    //   // geoIpLookup: function(callback) {
    //   //   $.get("https://ipinfo.io", function() {}, "jsonp").always(function(
    //   //     resp
    //   //   ) {
    //   //     var countryCode = resp && resp.country ? resp.country : "";
    //   //     callback(countryCode);
    //   //   });
    //   // }
    // });
    // this.$options.changeCountry = this.$refs.el.addEventListener(
    //   "countrychange",
    //   () => {
    //     this.$emit("input", this.getNumber());
    //   }
    // );
  }
};
</script>

<style></style>
