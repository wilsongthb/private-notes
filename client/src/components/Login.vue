<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-15 02:09 -->
<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-4">
        <Login :autocomplete="false" @logued="loguedHandler"></Login>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "src/auth-module/Login.vue";
import redirectAction from "src/auth-module/redirectAction";
export default {
  components: {
    Login
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    //
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    loguedHandler() {
      redirectAction(this);
    }
  }
};
</script>

<style scoped></style>
