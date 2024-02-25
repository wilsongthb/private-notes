<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-17 15:17 -->
<template>
  <div class="card">
    <!-- <img -->
    <!--   src="https://picsum.photos/200/170" -->
    <!--   class="card-img-top" -->
    <!--   alt="..." -->
    <!-- /> -->
    <div class="card-body">
      <div class="d-flex">
        <h5 class="card-title d-inline-block">
          <router-link :to="`/contacts/${note.contact.id}`">
            {{ note.contact.name }}
          </router-link>
        </h5>
        <h5 class="ms-auto text-success">
          {{ note.program_slug || note.type_label }}
        </h5>
      </div>
      <slot name="title-bottom" v-bind="note.contact"></slot>
      <!-- <Buttons :contact="note.contact"></Buttons> -->
      <small class="text-muted" :title="note.created_at | dateTimeFormat">
        {{ note.init_at | dateFormat }} - registrado
        {{ note.created_at | relativeTime }}
      </small>
      <p class="card-text">
        {{ note.text }}
      </p>
      <p class="text-info" v-show="note.amount > 0">
        <span>Acordado: {{ note.amount }} </span> |
        <span class="text-success">Pagado: {{ note.amount_paid }}</span> |
        <span class="text-danger">
          Diferencia: {{ note.amount - note.amount_paid }}
        </span>
      </p>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import Buttons from "../contacts/Buttons.vue";
export default {
  components: {
    // Buttons
  },

  // directives
  // filters

  props: {
    note: {
      default: () => ({})
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
