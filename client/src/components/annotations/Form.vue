<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-19 00:46 -->
<template>
  <form @submit.prevent="save(1)">
    <div class="mb-3" v-show="seeDate">
      <label for="">Fecha</label>
      <app-datepicker v-model="childDate"></app-datepicker>
    </div>
    <div class="mb-3">
      <label for="">Anotacion</label>
      <app-textarea
        ref="elTextArea"
        maxlength="500"
        v-model="text"
        @blur="afterBlur"
      ></app-textarea>
      <app-form-errors :errors="errors.text"></app-form-errors>
    </div>
    <div class="mb-3" v-show="seeProgram">
      <label for="">Asunto <small class="text-muted">(opcional)</small></label>
      <SelectProgram v-model="program_id"></SelectProgram>
    </div>
    <app-button-submit :disabled="errors"></app-button-submit>
  </form>
</template>
<script>
import validator from "src/utils/validator";
import SelectProgram from "../programs/Select.vue";
import BackendService from "src/BackendService";
import myMoment from "src/utils/myMoment";
const formRules = {
  text: {
    presence: { allowEmpty: false },
    length: { maximum: 500 }
  }
};
export default {
  components: {
    SelectProgram
  },

  // directives
  // filters

  props: {
    saveDraft: {
      default: false
    },
    date: {
      default: null
    },
    seeDate: {
      default: false
    },
    seeProgram: {
      default: false
    }
  },

  data: () => ({
    id: null,
    text: null,
    program_id: null,
    childDate: null
  }),

  computed: {
    errors() {
      return validator(this.$data, formRules);
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
      this.program_id = null;
      this.childDate = null;
    },
    setValue(item) {
      this.id = item.id;
      this.text = item.text;
      this.childDate = item.date;
      // this.program_id = item.program_id;
    },
    focusText() {
      this.$refs.elTextArea.focus();
    },
    async save(type) {
      let result = await BackendService.saveAnnotation({
        ...this.$data,
        type,
        date: this.date || this.childDate || myMoment.getCurrentDate(),
        user_id: this.$store.state.user.id
      });
      this.setValue(result);
      this.$emit("submitted", result);
    },
    hasId() {
      return !!this.id;
    },
    afterBlur() {
      setTimeout(() => {
        if (this.saveDraft && this.id == null) {
          BackendService.saveAnnotation({
            date: myMoment.getCurrentDate(),
            type: 2,
            user_id: this.$store.state.user.id,
            text: this.text,
            id: this.id
          }).then((result) => {
            this.id = result.id;
          });
        }
      }, 3000);
    }
  }
};
</script>

<style scoped></style>
