<template>
  <div class="container">
    <div class="card mb-2">
      
    </div>
    <div class="card">
      <app-table-control v-model="obj"></app-table-control>
    </div>

    <div class="mb-2 card p-2">
      <app-input-amount v-model="money"></app-input-amount>

      {{ money | money(moneyCode) }}
    </div>

    <div class="mb-2 card p-2">
      <app-daypicker v-model="date"></app-daypicker>

      <app-datepicker
        inputClass="form-control form-control-sm"
        v-model="date1"
        :disableBeforeDates="true"
      ></app-datepicker>
    </div>

    <div class="row">
      <div class="col">
        {{ 341 | money }}
      </div>
      <div class="col">
        <app-span-money :quantity="43" :moneyCode="1"></app-span-money>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <table class="table table-bordered">
          <app-tr-weekpicker ref="elWeek" :dayToBegin="5"></app-tr-weekpicker>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <app-select-currency v-model="currency"></app-select-currency>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <span class="h3" data-placement="bottom" v-app-title="'gaa'"
          >EL titulo</span
        >
      </div>
    </div>

    <app-textarea v-model="msg" :placeholder="'Gaaaa'"></app-textarea>
  </div>
</template>
<script>
import moment from "moment";
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    currency: 1,
    date: moment("2020-01-01").toDate(),
    date1: "2020-03-28",
    msg: "",
    money: 0,
    moneyCode: 23,
    obj: {}
  }),

  computed: {
    //
  },

  watch: {
    //
  },

  mounted() {
    // this.$refs.elWeek.setDate("2019-04-01", "YYYY-DD-MM");
    // setTimeout(() => {
    //   this.$refs.elWeek.setDate("2021-04-01");
    // }, 3000);
  },

  methods: {
    //
  }
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import url("https://use.fontawesome.com/releases/v5.0.7/css/all.css");
</style>
