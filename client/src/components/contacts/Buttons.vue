<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-27 16:35 -->
<template>
  <div>
    <div class="mb-2">
      <span class="badge bg-primary">
        Cel: {{ contact && contact.phone_number }}
      </span>
    </div>
    <a :href="whatsappLink" class="me-1 btn btn-success">
      <i class="fab fa-whatsapp"></i>
    </a>
    <a :href="phoneLink" class="me-1 btn btn-primary">
      <i class="fas fa-phone"></i>
    </a>
    <a :href="phoneSmsLink" class="me-1 btn btn-primary">
      <i class="fas fa-sms"></i>
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
    contact: {
      default: () => ({})
    }
  },

  data: () => ({
    //
  }),

  computed: {
    phoneSmsLink() {
      /* numeros de 9 digitos */
      if (
        this.contact &&
        this.contact.phone_number &&
        this.contact.phone_number.length >= 5
      ) {
        return `sms:${this.contact.phone_number}`;
      }
      return "";
    },
    phoneLink() {
      /* numeros de 9 digitos */
      if (
        this.contact &&
        this.contact.phone_number &&
        this.contact.phone_number.length >= 5
      ) {
        return `tel:${this.contact.phone_number}`;
      }
      return "";
    },
    whatsappLink() {
      /* numeros de 9 digitos */
      if (
        this.contact &&
        this.contact.phone_number &&
        this.contact.phone_number.length == 9
      ) {
        return `https://api.whatsapp.com/send?phone=51${this.contact.phone_number}`;
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
