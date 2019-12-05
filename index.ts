import Vue from "./vue";

let a = new Vue({
  el: "app",
  data: {
    a: 1
  },
  methods: {
    changeValue: function() {
      this.a = "5";
    }
  }
});
