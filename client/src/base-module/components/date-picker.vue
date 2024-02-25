<template>
  <v-datepicker
    v-model="valueChild"
    :language="$options.lang"
    :disabled="disabled"
    :input-class="inputClass"
    :format="formatter"
    :disabledDates="comDisabledDates"
    :placeholder="placeholder"
    :clear-button="true"
  >
  </v-datepicker>
</template>
<script>
import Datepicker from "vuejs-datepicker";

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const beforeDates = {
  from: new Date(0, 1, 1),
  to: yesterday
};

export default {
  components: {
    "v-datepicker": Datepicker
  },

  // directives
  // filters

  props: {
    placeholder: {
      default: "Fecha"
    },
    formatDate: {
      default: "L"
    },
    value: {},
    disabled: {
      type: Boolean,
      default: false
    },
    disableBeforeDates: {
      type: Boolean,
      default: false
    },
    disabledDates: {
      type: Array,
      default: () => []
    },
    inputClass: {
      default: "form-control",
      type: String
    }
  },

  data: () => ({
    lang: null,
    preview: null
  }),

  computed: {
    comDisabledDates() {
      return {
        ranges: [
          ...this.disabledDates,
          this.disableBeforeDates ? beforeDates : {}
        ]
      };
    },
    valueChild: {
      get() {
        var time = this.$options.moment(this.value);
        return time.isValid() ? time.toDate() : null;
      },
      set(val) {
        if (val == null) {
          this.$emit("input", null);
        } else {
          this.$emit(
            "input",
            this.$options.moment(val).format(this.$options.dateFormat)
          );
        }
        setTimeout(() => {
          this.$emit("change", this.value);
        }, 100);
      }
    }
  },

  watch: {
    //
  },

  created() {
    //
  },

  mounted() {
    //
  },

  methods: {
    formatter(date) {
      return this.$options.moment(date).format(this.formatDate);
    }
  }
};
</script>

<style>
.vdp-datepicker__clear-button {
  position: absolute;
  top: 5px;
  right: 11px;
}
</style>
