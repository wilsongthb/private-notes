<template>
  <ModalBasic ref="m" :idModal="idModal" :dialogCentered="true">
    <div>
      <slot></slot>
    </div>
    <button
      class="btn btn-primary mr-1"
      @click="
        $emit('yes');
        hide();
      "
    >
      Si
    </button>
    <button
      class="btn btn-secondary"
      @click="
        $emit('no');
        hide();
      "
    >
      No
    </button>
  </ModalBasic>
</template>

<script>
import ModalBasic from "./modal-basic";

export default {
  props: {
    idModal: {
      // required: true
    }
  },
  data() {
    return {
      val: undefined
    };
  },
  components: {
    ModalBasic
  },
  methods: {
    show() {
      this.$refs.m.show();
    },
    hide() {
      this.$refs.m.hide();
    }
  }
};
</script>
