<template>
  <span>{{ quantity | money(moneyCode) }}</span>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    moneyCode: {
      required: true
    },
    quantity: {
      required: true
    }
  },

  data: () => ({
    //
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
