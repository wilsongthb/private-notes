<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-19 00:45 -->
<template>
  <div>
    <h4 class="text-center">APUNTES</h4>
    <div class="row mb-2">
      <div class="col">
        <button class="btn btn-primary" @click="createAnnotation">
          <i class="fas fa-file"></i> Anotar
        </button>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-12 col-sm">
        <label for="">Fecha</label>
        <app-datepicker
          v-model="date"
          @change="afterChangeDate"
        ></app-datepicker>
      </div>
      <div class="col-12 col-sm">
        <label for="">Tipo</label>
        <SelectType v-model="type" @change="getContent()"></SelectType>
      </div>
      <div class="col-12 col-sm">
        <label for="">Buscar</label>
        <app-input-search
          v-model="search"
          @search="
            page = 1;
            date = null;
            getContent();
          "
        ></app-input-search>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <ul>
          <li>
            <a href="javascript:void(0)" @click="seeToday"
              >ver apuntes de hoy</a
            >
          </li>
          <li>
            <a href="javascript:void(0)" @click="seeYesterday"
              >Ver apuntes de ayer</a
            >
          </li>
          <li>
            <a href="javascript:void(0)" @click="seeAll">Ver todo por fecha</a>
          </li>
          <li>
            <span>Total: {{ total }}</span>
          </li>
        </ul>
      </div>
      <div class="col-md-8">
        <div class="card mb-2" v-for="l in list" :key="l.id">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <span class="text-capitalize">
                  {{ l.date | dayOfWeek }}
                </span>
              </div>
              <div class="col" :title="l.created_at | dateTimeFormat">
                {{ l.date | dateFormat }}
              </div>
              <div class="col text-end">
                <span class="badge bg-primary">
                  {{ l.type == 1 ? "APUNTE" : "BORRADOR" }}
                </span>
                <span class="badge bg-success" v-show="l.program_name">
                  {{ l.program_name }}
                </span>
              </div>
            </div>
            <div class="card-text">
              <NumberParagraph
                v-if="l.text"
                :text="l.text"
                @click-number="clickNumberHandler"
              ></NumberParagraph>
            </div>
            <div class="mt-2">
              <button
                class="btn btn-primary me-1"
                @click="
                  $refs.elEditModal.show();
                  $refs.elEditForm.setValue(l);
                "
              >
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-danger" @click="deleteItem(l.id)">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <app-paginate
              ref="elPagination"
              @change="
                page = $event;
                getContent();
              "
            ></app-paginate>
          </div>
        </div>
      </div>
    </div>

    <app-modal-basic ref="elModalForm">
      <Form
        ref="elForm"
        :date="date"
        :see-program="true"
        :save-draft="true"
        @submitted="
          getContent();
          $refs.elModalForm.hide();
        "
      ></Form>
    </app-modal-basic>

    <app-modal-basic ref="elEditModal">
      <Form
        ref="elEditForm"
        :see-date="true"
        @submitted="
          getContent();
          $refs.elEditModal.hide();
        "
      ></Form>
    </app-modal-basic>

    <app-modal-basic ref="elNumModal">
      <CodeToCopy class="mb-2" :text="number"></CodeToCopy>
      <div class="mb-2">
        <button
          class="btn btn-primary"
          @click="
            search = number;
            type = null;
            date = null;
            getContent();
            $refs.elNumModal.hide();
          "
        >
          <i class="fas fa-search"></i> Buscar en apuntes
        </button>
      </div>
      <PhoneButtons ref="elButton" :number="number"></PhoneButtons>
    </app-modal-basic>
  </div>
</template>
<script>
import myMoment from "src/utils/myMoment";
import Form from "./Form.vue";
import BackendService from "src/BackendService";
import NumberParagraph from "../NumberParagraph.vue";
import PhoneButtons from "../PhoneButtons.vue";
import SelectType from "./SelectType.vue";
import CodeToCopy from "../CodeToCopy.vue";
export default {
  components: {
    Form,
    NumberParagraph,
    PhoneButtons,
    SelectType,
    CodeToCopy
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    date: myMoment.getCurrentDate(),
    list: [],
    page: 1,
    number: null,
    type: 1,
    search: null,
    total: 0
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getContent();
  },

  methods: {
    createAnnotation() {
      this.$refs.elModalForm.show();
      this.$refs.elForm.reset();
    },
    async getContent() {
      let result = await BackendService.getAnnotations({
        page: this.page,
        date: this.date,
        type: this.type,
        search: this.search
      });
      this.total = result.count;
      this.$refs.elPagination.setValues({
        total: result.count,
        current_page: this.page,
        per_page: 20
      });
      this.list = result.results;
    },
    afterHide() {
      if (!this.$refs.elForm.hasId()) {
        /* si no fue guardado */
        this.$refs.elForm.save(2); // guardar como borrador
      }
    },
    deleteItem(id) {
      if (window.confirm("Eliminar anotacion")) {
        BackendService.deleteAnnotation(id).then(() => {
          this.getContent();
        });
      }
    },
    clickNumberHandler(number) {
      this.$refs.elNumModal.show();
      this.number = number;
    },
    afterChangeDate() {
      this.getContent();
    },
    seeToday() {
      this.clearAnotherFilters();
      this.date = myMoment.getCurrentDate();
      this.getContent();
    },
    seeYesterday() {
      this.clearAnotherFilters();
      this.date = myMoment().add(-1, "days").getInDateFormat();
      this.getContent();
    },
    clearAnotherFilters() {
      this.date = null;
      this.search = null;
      this.type = 1;
      this.page = 1;
    },
    seeAll() {
      this.clearAnotherFilters();
      this.type = null;
      this.getContent();
    }
  }
};
</script>

<style scoped></style>
