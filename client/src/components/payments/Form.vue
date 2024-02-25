<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-28 16:50 -->
<template>
  <form @submit.prevent="save">
    <div class="mb-3">
      <label for="">Monto devuelto</label>
      <input class="form-control" v-model="amount" type="number" step="0.01" />
    </div>
    <div class="mb-3">
      <label for="">
        Descripcion
        <small class="text-muted">(opcional)</small>
      </label>
      <app-textarea v-model="description"></app-textarea>
    </div>
    <app-button-submit :loading="sending"></app-button-submit>
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
    note_id: {
      required: true
    },
    contact_id: {
      required: true
    }
  },

  data: () => ({
    description: null,
    amount: null,
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
    reset() {
      this.description = null;
      this.amount = null;
      this.sending = false;
    },
    async save() {
      this.sending = true;
      let result = await BackendService.savePayment({
        ...this.$data,
        note_id: this.note_id,
        contact_id: this.contact_id
      });
      this.$emit("submitted", result);
      this.sending = false;
    }
  }
};
</script>

<style scoped></style>
