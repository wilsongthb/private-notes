<template>
  <div>
    <!-- <h4>{{ title }}</h4> -->
    <slot name="top">
      <div class="row mb-3">
        <slot name="tl">
          <div class="col">
            <button
              v-show="!disableBtnNew"
              @click="$emit('btnNew')"
              class="btn btn-primary"
            >
              <i class="fa fa-plus"></i> Nuevo
            </button>
            <slot name="afterNewBtn"></slot>
          </div>
        </slot>
        <div class="col">
          <div class="form-group mb-0">
            <app-input-search
              v-show="!disableSearch"
              v-model="search"
              @search="
                getListChild();
                addQueryParam('search', $event);
              "
            ></app-input-search>
          </div>
        </div>
      </div>
    </slot>
    <slot></slot>
    <div class="table-responsive shadow-sm">
      <table
        ref="table"
        class="table mb-0"
        :class="{
          'table-sm': sm,
          'table-bordered': border
        }"
      >
        <slot name="table"></slot>
      </table>
    </div>

    <div class="row" v-show="total > perPage">
      <div class="col">
        <app-paginate
          class="mt-2 "
          :class="{ 'd-print-none': !printPaginate }"
          ref="paginate"
          @change="
            page = $event;
            gl();
            addQueryParam('page', $event);
          "
        ></app-paginate>
      </div>
      <div class="col d-flex ">
        <div class="ml-auto d-none d-md-inline mt-2">
          <span>Total: {{ total }}</span>
          <span class="ml-2">filas</span>
          <input
            type="number"
            class="ml-2 form-control text-right"
            style="width: 5rem; display: inline"
            v-model.number="perPage"
            @change="
              gl();
              addQueryParam('perPage', $event.target.value);
            "
          />
        </div>
      </div>
    </div>
    <slot name="afterpaginate"></slot>
  </div>
</template>

<script>
import routeMix from "../route-mix";

export default {
  mixins: [routeMix],
  props: {
    border: {
      default: false
    },
    disableSearch: {
      default: false
    },
    disableBtnNew: {
      default: false
    },
    sm: { default: true },
    getList: {
      type: Function,
      required: true
    },
    changeRoute: {
      default: true
    },
    exeGetChildAfterMount: {
      default: true
    },
    printPaginate: {
      default: false
    }
  },
  data: () => ({
    page: 1,
    search: undefined,
    perPage: 15,
    total: 1
  }),
  created() {
    this.page = parseInt(this.$route.query.page) || 1;
    this.search = this.$route.query.search || "";
    this.perPage = parseInt(this.$route.query.perPage) || 20;
  },
  mounted() {
    if (this.exeGetChildAfterMount) {
      this.gl();
    }
  },
  methods: {
    getTableEl() {
      return this.$refs.table;
    },
    addQueryParam(key, value) {
      this.routeMixAddQueryParam(key, value);
    },
    gl() {
      return this.getListChild();
    },
    getListChild() {
      return new Promise((rsv) => {
        this.getList({
          page: this.page,
          search: this.search || undefined,
          per_page: this.perPage
        }).then((res) => {
          this.$refs.paginate.setPageOptions(res);
          this.total = res.total;
          rsv(res);
        });
      });
    }
  }
};
</script>

<style></style>
