<template>
  <div class="btn-group btn-block app_ctrl">
    <button
      class="btn btn-secondary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm }"
      @click="handleNavigateClick(-1)"
    >
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </button>
    <button
      v-for="(l, i) in dateList"
      :key="i"
      class="btn btn-secondary text-nowrap text-uppercase"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: l == date }"
      @click.prevent="setValue(l)"
    >
      {{ l }}
    </button>
    <button
      class="btn btn-secondary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm }"
      @click="handleNavigateClick(1)"
    >
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </button>
  </div>
</template>
<script>
// import { Observable } from "rxjs";
// import { debounceTime } from "rxjs/operators";
// import { myMoment } from "src/utilsmoment";

export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    sm: {
      default: false
    },
    disabled: {
      default: false
    }
  },

  data: () => ({
    dateList: [],
    date: ""
    // year: 0,
    // month: 0,
    // valueChanges: new Subject()
  }),

  computed: {
    //
  },

  watch: {
    // year() {
    //   this.valueChanges.next(this.getValue());
    // },
    // month() {
    //   this.valueChanges.next(this.getValue());
    // }
  },

  created() {
    let moment = this.$options.moment;
    this.date = moment().format("YYYY-MMM");
    this.makeList();

    // this.year = moment().year();
    // this.month = moment().month() + 1;

    // this.valueChanges.pipe(debounceTime(500)).subscribe(x => {
    //   this.$emit("input", x);
    // });
  },

  mounted() {
    this.$emit("mounted");
    this.$emit("input", this.getValue());
  },

  methods: {
    makeList() {
      let moment = this.$options.moment;
      this.dateList = [];

      for (let i = 0; i < 12; i++) {
        this.dateList.push(
          moment(this.date, "YYYY-MMM")
            .add(i, "month")
            .format("YYYY-MMM")
        );
      }
    },

    setValue(val) {
      this.date = val;
      this.makeList();
      this.$emit("input", this.getValue());
    },

    handleNavigateClick(val) {
      // var currentTime = myMoment(`${this.year}-${this.month}-1`, "YYYY-M-D");
      // var newTime = currentTime.clone().add(val, "months");
      // this.year = newTime.year();
      // this.month = newTime.month() + 1;
      let moment = this.$options.moment;
      this.date = moment(this.date, "YYYY-MMM")
        .add(val, "month")
        .format("YYYY-MMM");
      this.makeList();
      this.$emit("input", this.getValue());
    },
    getValue() {
      let moment = this.$options.moment;
      let oTime = moment(this.date, "YYYY-MMM");
      return {
        year: oTime.year(),
        month: parseInt(oTime.format("M"))
      };
    }
  }
};
</script>

<style scoped>
.app_ctrl {
  overflow-x: auto;
  /* overflow:  */
  /* overflow-y: hidden; */
}
</style>
