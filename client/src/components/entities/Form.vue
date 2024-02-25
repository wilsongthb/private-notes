<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-17 00:52 -->
<template>
  <form @submit.prevent="save">
    <div class="mb-3">
      <label for="">DNI</label>
      <input class="form-control" type="text" v-model="dni" maxlength="8" />
    </div>
    <div class="mb-3">
      <label for="">Nombre Completo</label>
      <input class="form-control" type="text" v-model="name" />
    </div>
    <div class="mb-3">
      <label for="">Numero de Celular/Telefono</label>
      <input class="form-control" type="text" v-model="phone_number" />
    </div>
  </form>
</template>
<script>
import BackendService from "src/BackendService";
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
    id: null,
    name: null,
    dni: null,
    phone_number: null
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    reset() {
      this.id = null;
      this.name = null;
      this.dni = null;
      this.phone_number = null;
    },
    setValue(value) {
      this.id = value.id;
      this.name = value.name;
      this.dni = value.dni;
      this.phone_number = value.phone_number;
    },
    async save() {
      // this.sending
      let result = await BackendService.saveEntity(this.$data);
      this.$emit("submitted", result);
    }
  }
};
</script>

<style scoped></style>
