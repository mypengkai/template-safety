<template>
  <div id="app">
    <keep-alive :include="['safetySelfAdd','addPlan','safetyPlanAdd']">
      <router-view v-if="routerAlive" />
    </keep-alive>
  </div>
</template>

<script>
if(window.plus) plus.navigator.setStatusBarBackground("#2a5caa");
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
.g-fix-ios-prevent-scroll{
  position: relative !important;
}
</style>
