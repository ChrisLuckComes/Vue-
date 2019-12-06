import Vue from "./vue";

let a = new Vue({
  el: "app",
  data: {
    a: 1,
    arr: [1, 2, 3]
  },
  computed: {
    aPlusOne: function() {
      return this.a + 1;
    }
  },
  methods: {
    changeValue: function() {
      this.arr[0] = 5;
    }
  }
});
