<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-27 17:24 -->
<template>
  <div class="container">
    <div class="row">
      <div class="col col-md-6">
        <form @submit.prevent="send">
          <div class="mb-3">
            <label for="">Llave*</label>
            <input class="form-control" type="file" ref="elInputFile" />
          </div>
          <app-button-submit :loading="sending">Recuperar</app-button-submit>
        </form>
      </div>
    </div>
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
    sending: false
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    async send() {
      var formData = new FormData();
      if (this.$refs.elInputFile.files.length == 0) {
        window.alert("selecciona un archivo");
        return;
      }
      formData.append("key", this.$refs.elInputFile.files[0]);
      try {
        await http.post("api/restore", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        this.$router.push({ name: "login" });
      } catch (e) {
        window.alert(
          "Parece que algo salio mal 😐, quizas no es la llave correcta"
        );
      }
    }
  }
};
</script>

<style scoped></style>
