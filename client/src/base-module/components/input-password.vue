<template>
  <div class="input-group">
    <slot name="input-group-prepend">
      <div class="input-group-prepend">
        <span class="input-group-text"
          ><i class="ni ni-lock-circle-open"></i
        ></span>
      </div>
    </slot>
    <input
      :type="seePassword ? 'text' : 'password'"
      :autocomplete="autocomplete"
      :value="value"
      v-app-input-focused
      @input="$emit('input', $event.target.value)"
      class="form-control"
    />
    <div class="input-group-append">
      <a class="input-group-text btn" @click="seePassword = !seePassword">
        <i
          :class="{
            'fa-eye': !seePassword,
            'fa-eye-slash': seePassword
          }"
          class="far"
        ></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    value: {},
    autocomplete: { default: "current-password" }
  },

  data: () => ({
    seePassword: false
  }),

  computed: {
    //
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    //
  }
};
</script>

<style></style>
