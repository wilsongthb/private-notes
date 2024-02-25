<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-07-20 14:03 -->
<template>
  <div>
    <div class="bg-light p-3 mb-2">
      <code class="text-body" :id="uniqueIdentity">
        <strong>{{ text }}</strong>
      </code>
    </div>
    <button @click="copy" class="btn btn-light shadow">
      <i class="fas fa-check" v-show="copied">&nbsp;</i>
      <i class="fas fa-clone"></i>&nbsp;
      <span v-show="!copied">{{ textButton }}</span>
      <span v-show="copied">Copiado</span>
    </button>
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
    text: {},
    textButton: {
      default: "Copiar"
    }
  },

  data: () => ({
    copied: false
  }),

  computed: {
    uniqueIdentity() {
      return `uniq_copy_${this._uid}`;
    }
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    copy() {
      //select the element with ID = "CopyMeID", can be a div, p, or a span, possibly others
      var textToCopy = document.getElementById(this.uniqueIdentity);

      //you can target the same element using querySelector() as well
      //example below:
      //var textToCopy = document.querySelector('.CopyMeClass');

      //check and see if the user had a text selection range
      var currentRange;
      if (document.getSelection().rangeCount > 0) {
        //the user has a text selection range, store it
        currentRange = document.getSelection().getRangeAt(0);
        //remove the current selection
        window.getSelection().removeRange(currentRange);
      } else {
        //they didn't have anything selected
        currentRange = false;
      }

      //create a selection range
      var CopyRange = document.createRange();
      //choose the element we want to select the text of
      CopyRange.selectNode(textToCopy);
      //select the text inside the range
      window.getSelection().addRange(CopyRange);
      //copy the text to the clipboard
      document.execCommand("copy");

      //remove our selection range
      window.getSelection().removeRange(CopyRange);

      //return the old selection range
      if (currentRange) {
        window.getSelection().addRange(currentRange);
      }

      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.custom-float {
  position: relative;
  right: 0;
}
</style>
