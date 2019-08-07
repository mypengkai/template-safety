<template>
  <div id="app">
    <keep-alive :include="['saferess','safeplan','rectify','ress','planRess','safezj']">
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
    // inputOnblur() {
    //   $("input,textarea").on("blur", function() {
    //     $("html,body").animate(
    //       { scrollTop: document.documentElement.clientHeight },
    //       500
    //     );
    //   });
    //   $("select").on("change", function() {
    //     window.scroll(0, document.body.scrollHeight);
    //   });
    // },
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
