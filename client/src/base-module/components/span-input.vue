<template>
  <div>
    <input
      v-show="editing"
      type="text"
      ref="inputEl"
      @blur="endEdit()"
      @keyup.enter="endEdit()"
      @keyup.esc="dontEdit($event)"
      v-model="val"
      class="form-control text-center app_w_150px"
      :class="{ 'form-control-sm': sm, 'd-inline': editing }"
    />
    <span @click="beginEdit()" v-show="!editing">
      <slot>{{ value }}</slot>
      <span v-show="disabled">
        <span class="d-print-none">
          &nbsp;
          <i class="fa fa-lock"></i>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    sm: {
      default: false
    },
    disabled: {
      default: false
    }
  },
  data: () => ({
    editing: false,
    val: ""
  }),
  methods: {
    beginEdit() {
      if (this.disabled) return;
      this.editing = true;
      this.val = this.value;
      setTimeout(() => {
        this.$refs.inputEl.focus();
      }, 100);
    },
    endEdit() {
      this.editing = false;
      this.$emit("input", this.val);
      // this.valueChild = this.val;
    },
    // keyHandler(e) {
    //   console.log(e);
    // },
    dontEdit() {
      // console.log("gogogogo");
      this.editing = false;
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
  }
};
</script>

<style>
.app_w_150px {
  max-width: 100px;
}
</style>
