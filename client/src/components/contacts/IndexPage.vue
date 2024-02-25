<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-01 10:56 -->
<template>
  <div>
    <h4 class="text-center">CONTACTOS</h4>
    <div class="mb-3">
      <label for="">Buscar</label>
      <app-input-search v-model="search" @search="getList"></app-input-search>
    </div>
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th>NOMBRE</th>
          <th>DNI</th>
          <th>TELEFONO</th>
        </tr>
        <tr v-for="l in list" :key="l.id">
          <td>
            <router-link :to="`/contacts/${l.id}`">{{ l.name }}</router-link>
          </td>
          <td>{{ l.dni }}</td>
          <td>{{ l.phone_number }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
    search: null,
    list: []
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getList();
  },

  methods: {
    async getList() {
      let result = await BackendService.getContacts({ search: this.search });
      this.list = result.results;
    }
  }
};
</script>

<style scoped></style>
