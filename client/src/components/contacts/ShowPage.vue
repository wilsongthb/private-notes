<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-27 16:23 -->
<template>
  <div>
    <h3>CONTACTO: {{ contact.name }}</h3>
    <Buttons
      class="mb-3"
      v-if="contact.phone_number"
      :contact="contact"
    ></Buttons>
    <div class="row">
      <div class="col col-md-6">
        <div class="card mb-3">
          <div class="card-body">
            <Form ref="elForm" @submitted="afterSave"></Form>
          </div>
        </div>
      </div>
    </div>
    <!-- <h4 class="text-danger">Monto Total: {{ amount | number }}</h4> -->
    <h4>NOTAS REGISTRADAS</h4>
    <div class="row mt-3">
      <div class="col-md-8">
        <div class="row">
          <div class="col-12 col-md-12" v-for="l in list" :key="l.id">
            <CardNote class="mb-2" :note="l"></CardNote>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h4>NOTAS CON MONTOS</h4>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th></th>
              <th>MONTO</th>
              <th>PAGADO</th>
              <th>DIFERENCIA</th>
              <th></th>
            </tr>
            <tr v-for="l in note_debts" :key="`a_${l.id}`">
              <td>{{ l.text }}</td>
              <td class="text-end">{{ l.amount }}</td>
              <td class="text-end">{{ l.amount_paid }}</td>
              <td class="text-end">{{ l.amount - l.amount_paid }}</td>
              <td class="p-1">
                <button
                  class="btn btn-primary btn-sm"
                  @click="
                    $refs.elPaymentModal.show();
                    $refs.elPaymentForm.reset();
                    note_id = l.id;
                  "
                >
                  <i class="fas fa-plus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <h4>PAGOS RECIBIDOS</h4>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>FECHA</th>
              <th>MONTO</th>
              <th></th>
            </tr>
            <tr v-for="l in payments" :key="`__${l.id}`">
              <td>{{ l.created_at | dateTimeFormat }}</td>
              <td>{{ l.amount }}</td>
              <td class="p-1">
                <button
                  class="btn btn-sm btn-danger"
                  @click="preDeletePay(l.id)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <app-modal-basic ref="elPaymentModal">
      <PaymentForm
        ref="elPaymentForm"
        :note_id="note_id"
        :contact_id="id"
        @submitted="
          $refs.elPaymentModal.hide();
          reload();
        "
      ></PaymentForm>
    </app-modal-basic>
  </div>
</template>
<script>
import BackendService from "src/BackendService";
import Buttons from "./Buttons.vue";
import CardNote from "../notes/Card.vue";
import Form from "./Form.vue";
import PaymentForm from "../payments/Form.vue";
export default {
  components: {
    PaymentForm,
    Buttons,
    CardNote,
    Form
  },

  // directives
  // filters

  props: {
    id: {
      required: true
    }
  },

  data: () => ({
    contact: {},
    list: [],
    amount: 0,
    note_debts: [],
    note_id: null,
    payments: []
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    BackendService.getContact(this.id).then((result) => {
      this.contact = result;
      this.$refs.elForm.setValue(result);
    });
    this.reload();
  },

  methods: {
    reload() {
      BackendService.getNotes({ contact_id: this.id }).then((result) => {
        this.list = result.results;
        this.note_debts = result.results.filter(
          (x) => parseFloat(x.amount) > 0
        );
        this.amount =
          result.results
            .map((x) => parseFloat(x.amount))
            .reduce((p, c) => p + c, 0) || 0;
      });
      BackendService.getPayments({ contact_id: this.id }).then((result) => {
        this.payments = result.results;
      });
    },
    afterSave() {
      window.alert("Cambios guardados.");
      location.reload();
    },
    async preDeletePay(payId) {
      if (window.confirm("Seguro de eliminar este pago?")) {
        await BackendService.deletePayment(payId);
        this.reload();
      }
    }
  }
};
</script>

<style scoped></style>
