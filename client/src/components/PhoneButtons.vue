<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-20 12:52 -->
<template>
  <div>
    <div class="alert alert-info" v-show="!validNumber">
      <span class="badge bg-info"><i class="fas fa-info"></i></span>
      Quizas el numero no es un numero de telefono.
    </div>

    <a :href="whatsappLink" class="me-1 btn btn-success">
      <i class="fab fa-whatsapp"></i> Whastapp
    </a>
    <a :href="phoneLink" class="me-1 btn btn-primary">
      <i class="fas fa-phone"></i> Llamar
    </a>
    <a :href="phoneSmsLink" class="me-1 btn btn-primary">
      <i class="fas fa-sms"></i> Mensajear
    </a>
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
    number: {
      //
    }
  },

  data: () => ({
    //
  }),

  computed: {
    validNumber() {
      if (this.number) {
        return this.number.length == 9;
      }
      return false;
    },
    phoneSmsLink() {
      /* numeros de 9 digitos */
      if (this.number && this.number.length >= 5) {
        return `sms:${this.number}`;
      }
      return "";
    },
    phoneLink() {
      /* numeros de 9 digitos */
      if (this.number && this.number.length >= 5) {
        return `tel:${this.number}`;
      }
      return "";
    },
    whatsappLink() {
      /* numeros de 9 digitos */
      if (this.number && this.number.length == 9) {
        return `https://api.whatsapp.com/send?phone=51${this.number}`;
      }
      return "";
    }
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    //
  }
};
</script>

<style scoped></style>
