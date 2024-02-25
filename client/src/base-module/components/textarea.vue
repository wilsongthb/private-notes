<template>
  <div>
    <textarea
      ref="el"
      class="form-control"
      :required="required"
      :rows="rows"
      :maxlength="maxlength"
      v-model="valueChild"
      :disabled="disabled"
      :placeholder="placeholder"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
    ></textarea>
    <small class="form-text text-muted" v-if="value"
      >{{ value.length }}/{{ maxlength }}
    </small>
  </div>
</template>

<script>
export default {
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
  props: {
    rows: {
      default: 3
    },
    value: {
      default: ""
    },
    maxlength: {
      default: 255
    },
    required: {
      default: false
    },
    disabled: {
      default: false
    },
    placeholder: { default: "" }
  },
  methods: {
    focus() {
      this.$refs.el.focus();
    }
  }
};
</script>

<style></style>
