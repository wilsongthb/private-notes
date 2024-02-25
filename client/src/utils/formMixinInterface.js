const formMixinInterface = {
  mounted() {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    let badgeError = `[App - ${this.$options._componentTag}] `;

    const showErrorInConsole = function(message, isWarn = false) {
      if (isWarn) {
        console.warn(badgeError, message);
      } else console.error(badgeError, message);
    };

    if (typeof this.reset !== "function") {
      showErrorInConsole("Agregar un metodo reset al formulario");
    }
    if (typeof this.save !== "function") {
      showErrorInConsole("Agregar un metodo save para guardar el formulario");
    }
    if (typeof this.setValue !== "function") {
      showErrorInConsole(
        "Agregar un metodo setValue para guardar el formulario"
      );
    }
    if (this._props.disabled === undefined) {
      showErrorInConsole("Agregar una propiedad disabled para el formulario");
    }
    if (this._computedWatchers.errors === undefined) {
      showErrorInConsole(
        "Agregar un computed: {errors} que valide el formulario"
      );
    }
  }
};

export default formMixinInterface;
