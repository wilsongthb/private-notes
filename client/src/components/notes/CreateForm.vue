<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-09 09:39 -->
<template>
  <form @submit.prevent="save">
    <ContactForm ref="elContactForm" :no-submit="true"></ContactForm>

    <!-- <div class="mb-3"> -->
    <!--   <label for="">Contacto</label> -->
    <!--   <SelectContact -->
    <!--     ref="elSelectContact" -->
    <!--     v-model="contact_id" -->
    <!--     :disabled="disabled" -->
    <!--   ></SelectContact> -->
    <!--   <app-form-errors :errors="errors.contact_id"></app-form-errors> -->
    <!-- </div> -->
    <div class="mb-3">
      <label for="">Asunto</label>
      <SelectProgram v-model="program_id" :disabled="disabled"></SelectProgram>
    </div>
    <div class="mb-3">
      <label for="">Nota</label>
      <app-textarea v-model="text" :disabled="disabled"></app-textarea>
    </div>
    <div class="mb-3">
      <label for="">Monto Relacionado Total</label>
      <input
        class="form-control"
        type="number"
        step="0.01"
        v-model="amount"
        :disabled="disabled"
      />
    </div>

    <div class="mb-3" v-show="id == null">
      <label for="">
        Monto Inicial <small class="text-muted">(opcional)</small></label
      >
      <input
        class="form-control"
        type="number"
        step="0.01"
        v-model="amount_initial"
        :disabled="disabled"
      />
    </div>

    <app-button-submit
      :disabled="errors"
      v-show="!disabled"
      :loading="sending"
    ></app-button-submit>
  </form>
</template>
<script>
import BackendService from "src/BackendService";
// import SelectEntity from "../entities/Select.vue";
// import SelectContact from "../contacts/SelectAsync.vue";
import SelectProgram from "../programs/Select.vue";
import validator from "src/utils/validator";
import ContactForm from "../contacts/Form.vue";
export default {
  components: {
    // SelectEntity
    // SelectContact,
    ContactForm,
    SelectProgram
  },

  // directives
  // filters

  props: {
    date: {
      // type: String,
      default: null
    },
    disabled: {
      default: false
    }
  },

  data: () => ({
    id: null,
    text: null,
    contact_id: null,
    amount: null,
    program_id: null,
    sending: false,
    amount_initial: null
  }),

  computed: {
    errors() {
      return validator(this.$data, {
        // contact_id: { presence: { allowEmpty: false } }
      });
    }
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    reset() {
      this.id = null;
      this.text = null;
      this.contact_id = null;
      this.amount = null;
      this.amount_initial = null;
      this.program_id = null;
      this.sending = false;
      this.$refs.elContactForm.reset();
    },
    setValue(value) {
      this.id = value.id;
      this.text = value.text;
      this.contact_id = value.contact_id;
      this.amount = value.amount;
      this.amount_initial = null;
      this.program_id = value.program_id;
      this.sending = false;
      this.$refs.elSelectContact.setValue(value.contact_id);
    },
    async save() {
      this.sending = true;
      try {
        var contact = await this.$refs.elContactForm.save();
        this.contact_id = contact.id;
        let result = await BackendService.saveNote({
          ...this.$data,
          init_at: this.date ? `${this.date}T00:00` : null
        });
        if (this.amount_initial && this.amount_initial > 0) {
          await BackendService.savePayment({
            amount: this.amount_initial,
            description: "Monto inicial dejado",
            contact_id: this.contact_id,
            note_id: result.id
          });
        }
        this.$emit("submitted", result);
      } catch (e) {
        //
      }
      this.sending = false;
    }
  }
};
</script>

<style scoped></style>
