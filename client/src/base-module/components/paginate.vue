<template>
  <div ref="el"></div>
</template>
<script>
import { BPagination } from "bootstrap-vue";
import Vue from "vue";
const bpaginationComponent = Vue.extend(BPagination);
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    currentPage: 1,
    total: 1,
    perPage: 1,
    render: false
  }),

  computed: {
    //
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    setValues(params) {
      this.setPageOptions(params);
    },
    setPageOptions(paginated) {
      this.total = paginated.total;
      this.currentPage = paginated.current_page;
      this.perPage = paginated.per_page;
      /* Eliminar elementos hijo */
      var myNode = this.$refs.el;
      while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
      }
      /* Generar componente */
      var bpaginationInstance = new bpaginationComponent({
        propsData: {
          value: this.currentPage,
          totalRows: this.total,
          perPage: this.perPage
        }
      });
      bpaginationInstance.$on("input", (newPage) => {
        this.changePageHandler(newPage);
      });
      bpaginationInstance.$mount();
      /* agregar componente como elemento html */
      this.$refs.el.appendChild(bpaginationInstance.$el);
    },
    changePageHandler(event) {
      this.$emit("change", event);
    }
  }
};
</script>

<style scoped></style>
