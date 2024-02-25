<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-15 12:48 -->
<template>
  <div>
    <h4 class="text-center">NOTAS</h4>
    <div class="row">
      <!-- <div class="col-md-4"> -->
      <!--   [> <SelectEntity v-model="entity_id"></SelectEntity> <] -->
      <!-- </div> -->
      <div class="col-md-4 col-sm-6">
        <label for="">Fecha</label>
        <app-datepicker
          :value="date"
          @input="dateInputHandler"
          @change="getList()"
          placeholder="Fecha"
        ></app-datepicker>
      </div>
      <div class="col-md-4 col-sm-6">
        <label for="">Contacto</label>
        <SelectContact v-model="contact_id" @close="getList()"></SelectContact>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <button class="btn btn-primary me-1" @click="showCreateContact">
          <i class="fas fa-user-friends"></i> Registrar Contacto
        </button>
        <button class="btn btn-primary me-1" @click="showCreateNote">
          <i class="fas fa-book"></i> Anotar
        </button>
        <button
          class="btn btn-info me-1"
          @click="returnToToday"
          v-show="date != today"
        >
          Volver a Hoy
        </button>
      </div>
    </div>

    <!-- <div class="row mt-3"> -->
    <!--   <div class="col"> -->
    <!--     <Activities :activities="activities"></Activities> -->
    <!--   </div> -->
    <!-- </div> -->

    <div class="row mt-3">
      <div class="col-md-8 col-12">
        <div class="row">
          <div class="col-12" v-for="l in list" :key="l.id">
            <CardNote class="mb-2" :note="l">
              <template v-slot:title-bottom="contact">
                <!-- <pre>{{ contact }}</pre> -->
                <Buttons :contact="contact"></Buttons>
              </template>

              <template v-slot:default>
                <button
                  class="btn btn-primary me-1"
                  @click="showEditCard(l.id)"
                >
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger" @click="showEliminar(l.id)">
                  <i class="fas fa-trash"></i> Eliminar
                </button>
              </template>
            </CardNote>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <DebtsTable :debts="debts"></DebtsTable>
      </div>
    </div>

    <app-modal-basic ref="elModalForm">
      <NoteForm
        ref="elNoteForm"
        :date="date"
        @submitted="
          getList();
          $refs.elModalForm.hide();
        "
      ></NoteForm>
    </app-modal-basic>

    <app-modal-basic ref="elModalCreateNote">
      <NoteCreateForm
        ref="elNoteCreateForm"
        :date="date"
        @submitted="
          getList();
          $refs.elModalCreateNote.hide();
        "
      ></NoteCreateForm>
    </app-modal-basic>

    <app-modal-basic ref="elModalEntity">
      <EntityForm
        ref="elEntityForm"
        @submitted="$refs.elModalEntity.hide()"
      ></EntityForm>
    </app-modal-basic>

    <app-modal-basic ref="elModalContact">
      <ContactForm
        ref="elContactForm"
        @submitted="$refs.elModalContact.hide()"
      ></ContactForm>
    </app-modal-basic>
  </div>
</template>
<script>
import EntityForm from "src/components/entities/Form.vue";
import BackendService from "src/BackendService";
// import SelectEntity from "./entities/Select.vue";
import myMoment from "src/utils/myMoment";
import NoteForm from "src/components/notes/Form.vue";
import NoteCreateForm from "../notes/CreateForm.vue";
import CardNote from "../notes/Card.vue";
import ContactForm from "../contacts/Form.vue";
import routeMixin from "src/utils/routeMixin";
import SelectContact from "../contacts/SelectAsync.vue";
import Buttons from "../contacts/Buttons.vue";
import _ from "lodash";
import DebtsTable from "../payments/DebtsTable.vue";
const today = myMoment().getCurrentDate();
export default {
  mixins: [routeMixin],

  components: {
    DebtsTable,
    NoteCreateForm,
    // SelectEntity,
    Buttons,
    NoteForm,
    EntityForm,
    CardNote,
    ContactForm,
    SelectContact
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    entity_id: null,
    list: [],
    date: null,
    activities: [],
    today,
    contact_id: null,
    debts: []
  }),

  computed: {
    //
  },

  // watch: {},

  created() {
    /* get date from route or set current date */
    this.date = this.$route.query.date || myMoment().getCurrentDate();
  },

  mounted() {
    this.getList();
  },

  methods: {
    returnToToday() {
      this.dateInputHandler(today);
      this.getList();
    },
    getActivities() {
      BackendService.getNoteActivities({
        date: this.date ?? today
      }).then((res) => {
        // console.log("act", res.results);
        this.activities = res.results;
      });
    },
    dateInputHandler(event) {
      this.date = event;
      this.setQueryParam("date", event);
    },
    async getList() {
      /* traer las actividades del dia */
      // this.getActivities();
      let res = await BackendService.getNotes({
        date: this.date ?? today,
        contact_id: this.contact_id
      });
      this.list = res.results;
      let debtsResponse = await BackendService.getNotes({
        debts: 1
      });
      this.debts = _.orderBy(debtsResponse.results, ["id", "asc"]);
    },
    showCreateNote() {
      this.$refs.elModalCreateNote.show();
      console.log("ref", this.$refs.elNoteCreateForm);
      this.$refs.elNoteCreateForm.reset();
    },
    showEditCard(noteId) {
      this.$refs.elModalForm.show();
      BackendService.getNote(noteId).then((res) =>
        this.$refs.elNoteForm.setValue(res)
      );
    },
    showCreateContact() {
      this.$refs.elModalContact.show();
      this.$refs.elContactForm.reset();
    },
    async showEliminar(noteId) {
      if (window.confirm("Eliminar nota?")) {
        await BackendService.deleteNote(noteId);
        this.getList();
      }
    }
  }
};
</script>

<style scoped></style>
