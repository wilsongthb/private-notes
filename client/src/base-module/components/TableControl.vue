<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<template>
  <table class="table table-sm table-bordered w-auto">
    <slot></slot>
    <tr v-for="(l, i) in value" :key="i">
      <th class="text-right">{{ i }}</th>
      <td>
        <template v-if="disabled">
          {{ l }}
        </template>
        <template v-else>
          <input
            type="text"
            class="app_td_input"
            :value="l"
            @change="changeValueHandler(i, $event.target.value)"
            maxlength="100"
          />
        </template>
      </td>
      <td v-show="!disabled">
        <a class="btn btn-danger btn-sm" @click="previewRemoveRow(i)">
          <i class="fas fa-times"></i>
        </a>
      </td>
    </tr>
    <tr v-show="rowFormVisibility">
      <td class="text-right">
        <input
          type="text"
          class="app_td_input"
          v-model="rowKey"
          ref="elInputRowKey"
          maxlength="15"
          :disabled="disabled"
        />
      </td>
      <td>
        <input
          type="text"
          class="app_td_input"
          v-model="rowValue"
          @change="
            changeValueHandler(rowKey, $event.target.value);
            resetRowForm();
          "
          maxlength="100"
          :disabled="disabled"
        />
      </td>
    </tr>
    <tr v-show="!disabled">
      <td colspan="2" class="text-center">
        <button
          @click="addRow()"
          class="btn btn-success btn-sm"
          style="cursor: pointer"
        >
          <i class="fas fa-plus"></i> Agregar fila
        </button>
      </td>
    </tr>

    <app-modal-yn ref="elPreDelRow" @yes="removeRow($refs.elPreDelRow.val)"
      >Eliminar la fila?
    </app-modal-yn>
  </table>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    disabled: {
      default: false
    },
    value: {
      default: () => ({})
    }
  },

  data: () => ({
    rowKey: "",
    rowValue: "",
    rowFormVisibility: false
    //disabled: true,
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
    previewRemoveRow(row) {
      this.$refs.elPreDelRow.show();
      this.$refs.elPreDelRow.val = row;
    },
    addRow() {
      this.rowFormVisibility = true;
      setTimeout(() => {
        this.$refs.elInputRowKey.focus();
      }, 100);
    },
    changeValueHandler(key, value) {
      let newValue = JSON.parse(JSON.stringify(this.value));
      newValue[key] = value;
      this.$emit("input", newValue);
    },
    resetRowForm() {
      this.rowKey = "";
      this.rowValue = "";
      this.rowFormVisibility = false;
    },
    removeRow(key) {
      let newValue = JSON.parse(JSON.stringify(this.value));
      delete newValue[key];
      this.$emit("input", newValue);
    }
  }
};
</script>

<style scoped lang="scss">
td,
th {
  vertical-align: baseline;
}

.app_td_input {
  outline: none;
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.app_td_input:focus {
  border-width: 1px;
  border-color: var(--blue);
  border-style: solid;
}
</style>
