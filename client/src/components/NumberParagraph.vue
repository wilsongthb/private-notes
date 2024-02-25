<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-19 16:00 -->
<template>
  <p ref="el"></p>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    text: {
      //
    }
  },

  data: () => ({
    //
  }),

  computed: {
    //
  },

  watch: {
    text(to) {
      this.generateContent(to);
    }
  },

  mounted() {
    this.generateContent();
  },

  methods: {
    // updateContent(to) {
    //   console.log("called", to);
    // },
    generateContent() {
      if (this._uid && this.text && this.text.length > 0) {
        // console.log(this);
        var result = this.text.replace(/([0-9])\w+/g, (str) => {
          return `<a class="num_${this._uid}" href="javascript:void(0)">${str}</a>`;
        });
        this.$refs.el.innerHTML = result;
        document.querySelectorAll(`.num_${this._uid}`).forEach((item) => {
          item.addEventListener("click", () => {
            this.$emit("click-number", item.innerHTML);
          });
        });
      }
    }
  }
};
</script>

<style scoped></style>
