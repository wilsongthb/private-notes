/**
 * usar mixins no es recomendable
 * por el problema para el debuggin
 * usar solo en casos simples
 */

export default {
  props: {
    value: {}
  },
  data: () => ({
    styles: {
      defaultInput: "form-control"
    }
  }),
  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    boldenSuggestion(scope) {
      if (!scope) return scope;
      const { suggestion, query } = scope;
      let result = this.$refs.suggestComponent.displayProperty(suggestion);
      if (!query) return result;
      const texts = query.split(/[\s-_/\\|.]/gm).filter((t) => !!t) || [""];
      return result.replace(
        new RegExp("(.*?)(" + texts.join("|") + ")(.*?)", "gi"),
        "$1<b>$2</b>$3"
      );
    },
    reset() {
      this.$refs.suggestComponent.setText("");
    },
    setText(val) {
      this.$refs.suggestComponent.setText(val);
    }
  }
};
