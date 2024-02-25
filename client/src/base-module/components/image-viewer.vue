<template>
  <img :src="src" ref="el" :alt="alt" @click="handleClick()" />
</template>

<script>
import ModalBasic from "./modal-basic";
import Vue from "vue";

export default {
  props: {
    showZoom: {
      default: true
    },
    src: {
      default: undefined
    },
    fileId: {
      default: undefined
    },
    alt: {
      default: ""
    },
    showModal: {
      default: true
    },
    width: { default: "50rem" },
    height: { default: "50rem" }
  },
  methods: {
    handleClick() {
      if (!this.showZoom) {
        return;
      }

      if (!this.showModal) {
        return;
      }
      if (this.$refs.modal) {
        this.$refs.modal.show();
        return;
      }
      // console.log("mount modal");
      var ModalBasicComponent = Vue.extend(ModalBasic);
      var modalBasicInstance = new ModalBasicComponent({
        propsData: { lg: true }
      });
      modalBasicInstance.$mount();
      var node = document.createElement(`img`);
      node.classList.add("img-fluid");
      node.src = this.urlToFile;
      modalBasicInstance.$refs.body.appendChild(node);
      this.$refs.el.parentElement.appendChild(modalBasicInstance.$el);
      modalBasicInstance.show();
      this.$refs.modal = modalBasicInstance;
    }
  }
};
</script>

<style></style>
