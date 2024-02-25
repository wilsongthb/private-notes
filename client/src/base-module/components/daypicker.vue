<template>
  <div class="text-center text-nowrap">
    <div class="text-uppercase">{{ dayOfWeek }}</div>
    <div class="h1">
      <a href="#" @click.prevent="lastday()"
        ><i class="fa fa-chevron-left"></i>
      </a>
      <span class="mx-2 display-3">{{ day }}</span>
      <a href="#" @click.prevent="nextDay()"
        ><i class="fa fa-chevron-right"></i>
      </a>
    </div>
    <div class="text-uppercase">{{ monthAndYear }}</div>
  </div>
</template>
<script>
export default {
  // moment -> $options.moment

  components: {
    //
  },

  // directives
  // filters

  props: {
    value: {
      type: Date
    }
    // setTodayAfterMounted: {
    //   default: false
    // }
  },

  data: () => ({
    day: 0,
    monthAndYear: "",
    dayOfWeek: ""
  }),

  computed: {
    //
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        this.setValues();
      }
    }
  },

  mounted() {
    // if (this.setTodayAfterMounted)
    // this.$emit("input", this.$options.moment().toDate());
    // this.setValues(this.$options.moment());
  },

  methods: {
    setValues() {
      // console.log("pill");

      let val = this.$options.moment(this.value);
      this.day = val.format("DD");
      this.monthAndYear = val.format("MMMM [de] YYYY");
      this.dayOfWeek = val.format("dddd");
    },

    lastday() {
      // ayer
      let val = this.$options.moment(this.value);
      val.add(-1, "day");
      this.$emit("input", val.toDate());
      // this.setValues();
    },
    nextDay() {
      // maniana
      let val = this.$options.moment(this.value);
      val.add(1, "day");
      this.$emit("input", val.toDate());
      // this.setValues();
    }
    // emitValue(val) {
    //   // this.4
    //   // if (this.useDate) this.$emit("input", val.toDate());
    //   // else this.$emit("input", val.format("YYYY-MM-DD"));
    // }
  }
};
</script>

<style></style>
