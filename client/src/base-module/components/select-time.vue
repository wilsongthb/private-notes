<template>
  <select
    class="custom-select"
    :class="{ 'rounded-0': !rounded }"
    v-model="valueChild"
  >
    <option :value="undefined"></option>
    <option v-for="(l, i) in times" :key="i" :value="l.value"
      >{{ l.time }}
    </option>
  </select>
  <!-- <div class="input-group"> -->
  <!-- <select v-if="interval" class="custom-select" :class="{'rounded-0': !rounded}">
      <option v-for="(l, i) in times" :key="i" :value="l">{{ l }} </option>
    </select> -->
  <!-- <template v-else>
      <select class="custom-select" v-model="hour" :class="{'rounded-0': !rounded}">
        <option v-for="l in hours" :value="l" :key="l">{{ l }} </option>
      </select>
      <select class="custom-select" v-model="minute" :class="{'rounded-0': !rounded}">
        <option v-for="l in minutes" :value="l" :key="l">{{ l }} </option>
      </select>
    </template> -->
  <!-- </div> -->
</template>

<script>
import { dayTimes } from "../day-times";

// console.log(times);

export default {
  data: () => ({
    // hours: [],
    // minutes: [],
    // times: "",
    // hour: "00",
    // minute: "00",
    times: []
  }),
  props: {
    value: {},
    interval: {
      default: 1
    },
    afterHour: {
      default: null
    },
    rounded: {
      default: true
    }
  },
  created() {
    // this.hours = Array.from(Array(24), (v, i) => i);
    // this.minutes = Array.from(Array(59), (v, i) => i);
  },
  watch: {
    interval: {
      immediate: true,
      handler() {
        this.setTimes();
      }
    }
  },
  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    setTimes() {
      this.times = dayTimes.filter((x, y) => {
        return (
          y % this.interval === 0 &&
          (this.afterHour ? this.afterHour <= x.hours : true)
        );
      });
    }
  }
};
</script>

<style></style>
