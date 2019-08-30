<template>
  <div>
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="icon-alixinzeng" @click="addList"></span>
    </headerTop>
  </div>
</template>

<script>
import headerTop from "@/components/headerTop";
export default {
  components: {
    headerTop
  },
  data() {
    return {
      title: "安全计划"
    };
  },
  methods: {
    // 回退
    routerBack() {
      this.$router.push({ path: "/safetyMenu" });
    },
    addList(){
        this.$router.push({path:"/addPlan"})
    }
  }
};
</script>

<style lang="less" scoped>
</style>