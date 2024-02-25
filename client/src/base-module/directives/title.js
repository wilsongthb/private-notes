import $ from "jquery";

const directiveDefinition = function(hookFunction) {
  return function(el = new HTMLElement(), binding) {
    // console.log(hookFunction, binding.value);
    if (binding.value === undefined) {
      return;
    }

    el.title = binding.value;
    // $(el).attr("title", binding.value || "no se");

    switch (hookFunction) {
      case "bind":
        $(el).tooltip();
        break;
      case "update":
        $(el)
          .tooltip("dispose")
          .tooltip();
    }
  };
};

export default {
  bind: directiveDefinition("bind"),
  // inserted: directiveDefinition("inserted"),
  update: directiveDefinition("update")
  // componentUpdated: directiveDefinition("componentUpdated"),
  // unbind: directiveDefinition("unbind")
};
