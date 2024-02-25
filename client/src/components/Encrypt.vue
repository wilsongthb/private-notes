<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-27 17:06 -->
<template>
  <div class="container">
    <h5>BLOQUEAR ACCESO</h5>
    <div class="alert alert-info">
      <badge class="badge bg-info"><i class="fas fa-info"></i></badge>
      La informacion se quedara bloqueada, puede solicitar una copia, requiere
      obligatoriamente el archivo llave para poder recuperar la informacion.
    </div>
    <button @click="confirmation" class="btn btn-danger">Proteger</button>
  </div>
</template>
<script>
import http from "src/utils/http";
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
    confirmation() {
      if (window.confirm("Estas completamente seguro(a)?")) {
        http.post("api/encrypt").then(() => {
          location.reload();
        });
      }
    }
  }
};
</script>

<style scoped></style>
