<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<template>
  <tr>
    <td :colSpan="colspan" class="text-center">
      <i class="fas fa-spinner fa-spin mr-1"></i> Cargando ...
    </td>
  </tr>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    colspan: {
      default: 1
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

<style scoped>
tr {
  height: 300px;
}
</style>
