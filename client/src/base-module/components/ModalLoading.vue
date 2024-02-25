<template>
  <div class="modal fade show" tabindex="-1" :class="{ modal_show: visible }">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <!-- <div class="modal-header"> -->
        <!--   <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5> -->
        <!--   <button -->
        <!--     type="button" -->
        <!--     class="close" -->
        <!--     data-dismiss="modal" -->
        <!--     aria-label="Close" -->
        <!--   > -->
        <!--     <span aria-hidden="true">×</span> -->
        <!--   </button> -->
        <!-- </div> -->
        <div class="modal-body text-center">
          <div class="fa-3x">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          Cargando
        </div>
        <!-- <div class="modal-footer"> -->
        <!--   <button type="button" class="btn btn-secondary" data-dismiss="modal"> -->
        <!--     Close -->
        <!--   </button> -->
        <!--   <button type="button" class="btn btn-primary">Save changes</button> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
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
    visible: false
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
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.modal_show {
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
