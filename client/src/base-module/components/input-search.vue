<template>
  <div class="input-group input-group-alternative">
    <input
      class="form-control form-control-alternative"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup="keyUpHandler"
      v-app-input-focused
    />
    <span class="input-group-text" @click.prevent="search()">
      <i class="fas fa-search"></i>
    </span>
  </div>
</template>

<script>
// import { debounce } from "lodash";

// const LIST_KEY_CONTROLS_NO_SPECTED = [37, 38, 39, 40, 18, 17, 9, 16];
const KEY_CODE_ENTER = 13;
// const DELAY_ON_PRESS_WORDS = 750;

export default {
  props: {
    placeholder: {
      type: String,
      default: "Buscar ..."
    },
    value: {
      default: ""
    }
  },
  methods: {
    keyUpHandler(e) {
      // if (LIST_KEY_CONTROLS_NO_SPECTED.includes(e.keyCode)) {
      //   return;
      // }
      if (e.keyCode == KEY_CODE_ENTER) {
        this.search(e.target.value);
        return;
      }
      // this.asyncKeyUpHandler(e.target.value, this);
    },
    // asyncKeyUpHandler: debounce((v, vm) => {
    //   vm.search(v);
    // }, DELAY_ON_PRESS_WORDS),
    search() {
      this.$emit("search", this.value);
    }
  }
};
</script>

<style></style>
