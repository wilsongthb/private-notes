<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-17 00:52 -->
<template>
  <form @submit.prevent="save">
    <div class="mb-3">
      <label for="">DNI</label>
      <input
        class="form-control"
        type="text"
        v-model="dni"
        maxlength="15"
        @change="searchDni"
      />
    </div>
    <div class="mb-3">
      <label for="">Nombre Completo</label>
      <input
        ref="elInputName"
        class="form-control"
        type="text"
        v-model="name"
        maxlength="255"
      />
    </div>
    <div class="mb-3">
      <label for="">Numero de Celular/Telefono</label>
      <input
        class="form-control"
        type="text"
        v-model="phone_number"
        maxlength="9"
      />
    </div>
    <app-button-submit v-if="!noSubmit" :loading="sending"></app-button-submit>
  </form>
</template>
<script>
import BackendService from "src/BackendService";
import searchDni from "src/DniService";
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    noSubmit: {
      default: false
    }
  },

  data: () => ({
    id: null,
    name: null,
    dni: null,
    phone_number: null,
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
    async searchDni() {
      try {
        this.$refs.elInputName.disabled = true;
        this.$refs.elInputName.placeholder = "Buscando ...";
        let backresult = await BackendService.getContacts({
          search: this.dni
        });
        if (backresult.results.length > 0) {
          this.setValue(backresult.results[0]);
        } else {
          let result = await searchDni(this.dni);
          this.name = result.nombre;
        }
      } catch (e) {
        if (e.response.status == 404) {
          this.$refs.elInputName.placeholder = "Sin resultados";
        }
      }
      this.$refs.elInputName.disabled = false;
    },
    reset() {
      this.id = null;
      this.name = null;
      this.dni = null;
      this.phone_number = null;
      this.sending = false;
    },
    setValue(value) {
      this.id = value.id;
      this.name = value.name;
      this.dni = value.dni;
      this.phone_number = value.phone_number;
    },
    async save() {
      this.sending = true;
      try {
        var result = await BackendService.saveContact(this.$data);
        this.$emit("submitted", result);
      } catch (e) {
        //
      }
      this.sending = false;
      return result;
    }
  }
};
</script>

<style scoped></style>
