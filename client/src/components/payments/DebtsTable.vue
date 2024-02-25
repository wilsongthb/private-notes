<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-30 15:55 -->
<template>
  <table class="table table-sm table-bordered">
    <tbody>
      <!-- <tr> -->
      <!--   <th></th> -->
      <!--   <th>MONTO</th> -->
      <!--   <th>PAGADO</th> -->
      <!-- </tr> -->
      <tr v-for="l in debts" :key="l.id">
        <td>
          <router-link class="d-block" :to="`/contacts/${l.contact.id}`">
            {{ l.contact.name }}
          </router-link>
          <span>
            <b>Monto:</b> {{ l.amount }} <b>Pagado: </b>
            {{ l.amount_paid }}
          </span>
        </td>
        <!-- <td>{{ l.amount }}</td> -->
        <!-- <td>{{ l.amount_paid }}</td> -->
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    debts: {
      default: () => []
    }
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
    //
  }
};
</script>

<style scoped></style>
