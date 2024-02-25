<template>
  <div class>
    <!-- <app-input-number></app-input-number> -->
    <p class="form-control">{{ value }}</p>
    <div class>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(1)"
      >
        1
      </button>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(2)"
      >
        2
      </button>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(3)"
      >
        3
      </button>
    </div>
    <div>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(4)"
      >
        4
      </button>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(5)"
      >
        5
      </button>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(6)"
      >
        6
      </button>
    </div>
    <div>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(7)"
      >
        7
      </button>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(8)"
      >
        8
      </button>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(9)"
      >
        9
      </button>
    </div>
    <div>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal('C')"
      >
        C
      </button>
      <button
        class="btn btn-lg btn-light border-0 rounded-0"
        @click="updateVal(0)"
      >
        0
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {}
  },
  methods: {
    updateVal(val) {
      if (val == "C") {
        this.$emit("input", 0);
      } else {
        var newVal = Number.isInteger(this.value)
          ? this.value
          : parseInt(this.value.toString());
        this.$emit("input", newVal * 10 + val);
      }
    }
  }
};
</script>

<style></style>
