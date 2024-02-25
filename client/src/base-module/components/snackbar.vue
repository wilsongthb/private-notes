<template>
  <div class="app_snackbar_container" v-show="isVisible">
    <div class="mb-4 mx-auto app_snackbar d-flex shadow" ref="elSnackbar">
      <span>{{ message }}</span>
      <a
        href="javascript:void(0)"
        class="ml-auto text-reset"
        @click.prevent="hide()"
      >
        <i class="fas fa-times p-1"></i>
      </a>
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
    hideAfterDuration: { default: true },
    duration: { default: 3000 },
    baseCssClass: { default: () => [] }
  },

  data: () => ({
    cssClass: [],
    isVisible: false,
    message: "DefaultMessage",
    jobsToHide: []
  }),

  computed: {
    //
  },

  watch: {
    //
  },

  mounted() {
    for (let aclass of this.baseCssClass) {
      this.$refs.elSnackbar.classList.add(aclass);
    }
  },

  methods: {
    removeClass() {
      for (let aclass of this.cssClass) {
        this.$refs.elSnackbar.classList.remove(aclass);
      }
    },
    setCssClass(cssClass) {
      this.removeClass();
      if (typeof cssClass === "string") {
        this.cssClass = [cssClass];
      }
      for (let aclass of this.cssClass) {
        this.$refs.elSnackbar.classList.add(aclass);
      }
    },
    clearJobsToHide() {
      for (var i = 0; i < this.jobsToHide.length; i++) {
        clearTimeout(this.jobsToHide[i]);
      }
      this.jobsToHide = [];
    },
    hide() {
      this.isVisible = false;
      this.clearJobsToHide();
    },
    show(message = "") {
      this.message = message;
      this.isVisible = true;

      if (this.hideAfterDuration) {
        this.jobsToHide.push(
          setTimeout(() => {
            this.hide();
          }, this.duration)
        );
      }
    }
  }
};
</script>

<style scoped>
.app_snackbar_container {
  position: fixed;
  bottom: 0px;
  width: 100%;

  box-sizing: border-box;
  z-index: 1100;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}

.app_snackbar {
  border-radius: 4px;
  box-sizing: border-box;
  max-width: 33vw;
  min-width: 344px;
  padding: 14px 16px;
  min-height: 48px;
  transform-origin: center;
}
</style>
th
