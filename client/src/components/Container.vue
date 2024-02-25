<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-27 16:26 -->
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <router-link to="/">Apuntes</router-link> /
        <router-link to="/notes/">Notas</router-link> /
        <router-link to="/contacts/">Contacts</router-link> /
        <a :href="`${API_URL}admin/`">Configurar</a> /
        <a @click.prevent="logout()" href="javascript:void(0)">Cerrar Sesión</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import AuthServices from "src/auth-module/AuthServices";
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    API_URL: process.env.VUE_APP_API_URL
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    async logout() {
      AuthServices.logout();
      this.$router.push("login");
    }
  }
};
</script>

<style scoped></style>
