<template>
  <div class="custom-file">
    <input
      type="file"
      ref="if"
      class="custom-file-input"
      :id="id"
      lang="es"
      @change="$emit('change', $event.target.files)"
    />
    <label class="custom-file-label" :for="id">Seleccionar Archivo</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      default: "customFile"
    }
  },
  methods: {
    getEl() {
      return this.$refs.if;
    }
  }
};
</script>

<style></style>
