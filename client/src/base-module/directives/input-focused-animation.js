import $ from "jquery";

export default {
  bind: function(
    el = new HTMLElement()
    // , binding, vnode
  ) {
    // message = 'hello'
    // v-demo:foo.a.b="message"

    // var s = JSON.stringify
    // el.innerHTML =
    // 'name: ' + s(binding.name) + '<br>' +
    // 'value: ' + s(binding.value) + '<br>' +
    // 'expression: ' + s(binding.expression) + '<br>' +
    // 'argument: ' + s(binding.arg) + '<br>' +
    // 'modifiers: ' + s(binding.modifiers) + '<br>' +
    // 'vnode keys: ' + Object.keys(vnode).join(', ')

    $(el)
      .on("focus blur", function(e) {
        $(this)
          .parents(".form-group")
          .toggleClass("focused", e.type === "focus");
      })
      .trigger("blur");
  }
};
