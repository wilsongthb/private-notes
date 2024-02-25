<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div
      class="modal-dialog"
      :class="{
        'modal-lg': lg,
        'modal-xl': xl,
        'modal-sm': sm,
        'modal-dialog-centered': dialogCentered
      }"
    >
      <div class="modal-content">
        <div class="modal-header">
          <slot name="title">
            <h5 class="modal-title">{{ modalTitle }}</h5>
          </slot>

          <button
            type="button"
            class="btn-close"
            @click="hide()"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="modal" ref="modal" tabindex="-1" role="dialog"> -->
  <!--   <div -->
  <!--     class="modal-dialog" -->
  <!--     :class="{ -->
  <!--       'modal-lg': lg, -->
  <!--       'modal-xl': xl, -->
  <!--       'modal-sm': sm, -->
  <!--       'modal-dialog-centered': dialogCentered -->
  <!--     }" -->
  <!--     role="document" -->
  <!--   > -->
  <!--     <div class="modal-content"> -->
  <!--       <div class="modal-header"> -->
  <!--         <slot name="title"> -->
  <!--           <h5 class="modal-title">{{ modalTitle }}</h5> -->
  <!--         </slot> -->
  <!--         <button -->
  <!--           @click="hide()" -->
  <!--           type="button" -->
  <!--           class="close" -->
  <!--           data-dismiss="modal" -->
  <!--           aria-label="Close" -->
  <!--         > -->
  <!--           <span aria-hidden="true">&times;</span> -->
  <!--         </button> -->
  <!--       </div> -->
  <!--       <div class="modal-body" ref="body"> -->
  <!--         <slot></slot> -->
  <!--       </div> -->
  <!--     </div> -->
  <!--   </div> -->
  <!-- </div> -->
</template>

<script>
// import $ from 'jquery'

export default {
  data() {
    return {
      /** para guardar valores temporales */
      values: {},
      canSee: false
    };
  },
  routeQuery: {},
  props: {
    modalTitle: {
      default: undefined
    },
    dialogCentered: {
      default: false
    },

    /**
     *
     * keyToRoute
     *
     * Es una clave para agregar en la ruta de la aplicacion de manera que el usuario al
     * presionar el boton atras, cierra el modal :D
     *
     */
    ktr: {
      default: undefined
    },
    lg: {
      default: false
    },
    xl: {
      default: false
    },
    sm: {
      default: false
    },
    hideIfClickBackground: {
      default: true
    }
  },
  mounted() {
    if (this.hideIfClickBackground) {
      this.$refs.modal.onclick = (e) => {
        if (e.target.classList.contains("modal")) {
          this.hide();
        }
      };
    }
  },
  watch: {
    //
  },
  methods: {
    show() {
      this.canSee = true;
      this.$refs.modal.classList.add("show");
      this.$refs.modal.style.display = "block";
      this.$refs.modal.style.overflowY = "auto";
    },
    hide() {
      this.canSee = false;
      this.$refs.modal.classList.remove("show");
      this.$refs.modal.style.display = "none";
      this.$emit("hidden");
    }
  }
};
</script>

<style>
.modal {
  background-color: #00000080;
}
</style>
