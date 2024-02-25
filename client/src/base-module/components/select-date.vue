<template>
  <div class="input-group">
    <select :disabled="disabled" v-model="day" class="custom-select" required>
      <option :value="l" v-for="l in days" :key="l">{{ l }}</option>
    </select>
    <select :disabled="disabled" v-model="month" class="custom-select" required>
      <option value="1">ENERO</option>
      <option value="2">FEBRERO</option>
      <option value="3">MARZO</option>
      <option value="4">ABRIL</option>
      <option value="5">MAYO</option>
      <option value="6">JUNIO</option>
      <option value="7">JULIO</option>
      <option value="8">AGOSTO</option>
      <option value="9">SETIEMBRE</option>
      <option value="10">OCTUBRE</option>
      <option value="11">NOVIEMBRE</option>
      <option value="12">DICIEMBRE</option>
    </select>

    <select :disabled="disabled" v-model="year" class="custom-select" required>
      <option v-for="l in years" :value="l" :key="l">{{ l }}</option>
    </select>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    value: {},
    maxYear: {
      default: "today" // 'nextYear'
    },
    minYear: {
      default: 1900
    },
    yearsOrder: {
      default: "desc"
    },
    disabled: {
      default: false
    }
  },
  data: () => ({
    year: "",
    years: [],
    month: "",
    months: [],
    day: "",
    // days: [],
    daysInMonth: 31
  }),
  computed: {
    isValid() {
      return moment(this.getStringDate(), "YYYY-MM-DD").isValid();
    },
    days() {
      // let daysInMonth = 31
      return Array.from(Array(this.daysInMonth), (v, i) => i + 1);
    }
  },
  watch: {
    value(to) {
      if (to === undefined) {
        this.reset();
        return;
      }

      let valToDate = moment(to, "YYYY-MM-DD");
      if (
        valToDate.isValid() &&
        valToDate.format("YYYY-MM-DD") != this.getStringDate()
      ) {
        this.year = valToDate.year();
        this.month = valToDate.month() + 1;
        this.day = valToDate.date();
      }

      // this.daysInMonth = this.getMomentObj().daysInMonth();
    },
    year() {
      if (this.isValid) {
        this.$emit("input", this.getStringDate());
      }
    },
    month() {
      if (this.isValid) {
        this.$emit("input", this.getStringDate());
      }
    },
    day() {
      if (this.isValid) {
        this.$emit("input", this.getStringDate());
      }
    }
  },
  methods: {
    reset() {
      this.year = "";
      this.month = "";
      this.day = "";
    },
    getStringDate() {
      return this.year + "-" + this.month + "-" + this.day;
    },
    getMomentObj() {
      return moment(this.getStringDate(), "YYYY-MM-DD");
    }
  },
  created() {
    let today =
      this.maxYear == "today"
        ? new Date()
        : this.maxYear == "nextYear"
        ? new Date(new Date().getFullYear() + 1, 1, 1)
        : new Date(this.maxYear, 1, 1);
    // console.log(today)
    let minYear =
      this.minYear == "today" ? new Date().getFullYear() : this.minYear;
    this.years = Array.from(
      Array(today.getFullYear() + 1 - minYear),
      (v, i) => today.getFullYear() - i
    );

    if (this.yearsOrder == "asc") {
      this.years = this.years.sort((a, b) => {
        return a < b ? -1 : 1;
      });
    }

    // this.years.sort(x => {
    //   // return x
    // })
  }
};
</script>

<style></style>
