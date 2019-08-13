<template>
  <div id="app">
    <keep-alive :include="['safetySelfAdd']">
      <router-view v-if="routerAlive" />
    </keep-alive>
  </div>
</template>

<script>
// import $ from "jquery";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      routerAlive: true
    };
  },
  created() {},
  methods: {
    reload() {
      this.routerAlive = false;
      this.$nextTick(function() {
        this.routerAlive = true;
      });
    }
  }
};
</script>
<style>
#app {
  height: 100%;
}
</style>
