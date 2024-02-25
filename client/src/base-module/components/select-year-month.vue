<template>
  <div class="input-group">
    <select class="custom-select" v-model="year">
      <option v-for="l in years" :value="l" :key="l">{{ l }}</option>
    </select>
    <select class="custom-select" v-model="month">
      <option :value="1">ENERO</option>
      <option :value="2">FEBRERO</option>
      <option :value="3">MARZO</option>
      <option :value="4">ABRIL</option>
      <option :value="5">MAYO</option>
      <option :value="6">JUNIO</option>
      <option :value="7">JULIO</option>
      <option :value="8">AGOSTO</option>
      <option :value="9">SETIEMBRE</option>
      <option :value="10">OCTUBRE</option>
      <option :value="11">NOVIEMBRE</option>
      <option :value="12">DICIEMBRE</option>
    </select>
  </div>
</template>

<script>
import { debounce } from "lodash";

export default {
  props: {
    minYear: {
      default: 2016
    },
    maxYear: {
      default: 2025
    }
    // value: {
    //   required: true
    // },
    // initiated: {
    //   default: false
    // }
  },
  data() {
    return {
      year: "",
      month: "",
      years: []
    };
  },
  watch: {
    year(to, from) {
      if (from != "") this.emitVal();
    },
    month(to, from) {
      if (from != "") this.emitVal();
    }
  },
  created() {
    this.years = Array.from(
      Array(this.maxYear + 1 - this.minYear),
      (v, i) => i + this.minYear
    );
  },
  mounted() {
    // if (this.initiated) {
    //   this.setDefault();
    // }
  },
  methods: {
    setDefault() {
      var now = new Date();
      this.year = now.getFullYear();
      this.month = now.getMonth() + 1;
      this.emitVal();
    },
    asyncEmitVal: debounce((vm) => {
      vm.$emit("input", {
        year: vm.year,
        month: vm.month
      });
    }, 800),
    emitVal() {
      this.asyncEmitVal(this);
    }
  }
};
</script>

<style></style>
