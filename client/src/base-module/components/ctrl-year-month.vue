<template>
  <div class="btn-group btn-block app_ctrl">
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm }"
      @click="handleNavigateClick(-1)"
    >
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm }"
    >
      {{ year }}
    </button>

    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm }"
      @click="handleNavigateClick(1)"
    >
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 1 }"
      @click="month = 1"
    >
      ENE
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 2 }"
      @click="month = 2"
    >
      FEB
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 3 }"
      @click="month = 3"
    >
      MAR
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 4 }"
      @click="month = 4"
    >
      ABR
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 5 }"
      @click="month = 5"
    >
      MAY
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 6 }"
      @click="month = 6"
    >
      JUN
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 7 }"
      @click="month = 7"
    >
      JUL
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 8 }"
      @click="month = 8"
    >
      AGO
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 9 }"
      @click="month = 9"
    >
      SET
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 10 }"
      @click="month = 10"
    >
      OCT
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 11 }"
      @click="month = 11"
    >
      NOV
    </button>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      :class="{ 'btn-sm': sm, active: month == 12 }"
      @click="month = 12"
    >
      DIC
    </button>
  </div>
</template>
<script>
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

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
    year: 0,
    month: 0,
    valueChanges: new Subject()
  }),

  computed: {
    //
  },

  watch: {
    year() {
      this.valueChanges.next(this.getValue());
    },
    month() {
      this.valueChanges.next(this.getValue());
    }
  },

  created() {
    let moment = this.$options.moment;
    this.year = moment().year();
    this.month = moment().month() + 1;

    this.valueChanges.pipe(debounceTime(500)).subscribe((x) => {
      this.$emit("input", x);
    });
  },

  mounted() {
    this.$emit("mounted");
  },

  methods: {
    handleNavigateClick(val) {
      let moment = this.$options.moment;
      var currentTime = moment(`${this.year}-${this.month}-1`, "YYYY-M-D");
      var newTime = currentTime.clone().add(val, "months");
      this.year = newTime.year();
      this.month = newTime.month() + 1;
    },
    getValue() {
      return {
        year: this.year,
        month: this.month
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
