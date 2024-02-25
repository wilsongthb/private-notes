<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-17 14:42 -->
<template>
  <Multiselect
    v-model="valueChild"
    deselect-label="Can't remove this value"
    track-by="id"
    label="name"
    placeholder="Seleccionar"
    :options="options"
    :searchable="true"
    :internal-search="false"
    :allow-empty="false"
    :loading="loading"
    @search-change="find"
    @open="openHandler"
    @input="$emit('input', $event.id)"
    @close="$emit('close', valueChild)"
  >
    <template slot="singleLabel" slot-scope="{ option }">
      {{ option.name }}
    </template>
  </Multiselect>
</template>
<script>
import BackendService from "src/BackendService";
import Multiselect from "vue-multiselect";
import _ from "lodash";
export default {
  components: {
    Multiselect
  },

  // directives
  // filters

  props: {
    value: {
      default: null
    }
  },

  data: () => ({
    options: [],
    valueChild: null,
    loading: false
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    // this.getOptions();
  },

  methods: {
    async setValue(id) {
      this.valueChild = await BackendService.getContact(id);
    },
    reset() {
      this.valueChild = null;
    },
    getOptions(search = null) {
      BackendService.getContacts({
        search
      }).then((result) => {
        this.options = result.results;
      });
    },
    find(search) {
      if (search) this.asyncFind(search, this);
    },
    asyncFind: _.debounce((search, vm) => {
      vm.getOptions(search);
    }, 350),
    openHandler() {
      if (this.options.length == 0 || this.options.length == 1) {
        this.getOptions();
      }
    }
  }
};
</script>

<style scoped></style>
