<template>
  <vSelect
    class="custom-v-select"
    :value="valueChild"
    :options="colors"
    :filter="filter"
    :disabled="disabled"
  >
    <template slot="selected-option" slot-scope="{ name, color }">
      <span :style="`background-color: ${color};`">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      &nbsp;
      {{ name }}
    </template>
    <template slot="option" slot-scope="{ name, color }">
      <div class="w-100" @click="userClick({ name, color })">
        <span :style="`background-color: ${color};`">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        &nbsp;
        {{ name }}
      </div>
    </template>
  </vSelect>
</template>

<script>
import vSelect from "vue-select";

import { es } from "../colors";

const colors = es.map((x) => {
  return {
    ...x,
    value: x.color
  };
});

export default {
  components: {
    vSelect
  },

  props: {
    disabled: {
      default: false
    },
    value: {}
  },

  data: () => ({
    colors,
    valueChild: {}
  }),

  watch: {
    value(to) {
      if (this.valueChild.color !== to) {
        let result = colors.filter((x) => x.color == to);
        this.valueChild = result.length > 0 && result[0];
      }
    }
  },

  computed: {
    //
  },

  methods: {
    filter(options, search) {
      return colors.filter((x) => {
        return x.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
    },
    userClick(colorProfile) {
      this.valueChild = colorProfile;
      this.$emit("input", colorProfile.color);
    }
  }
};
</script>

<style></style>
