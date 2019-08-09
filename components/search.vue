<template>
  <div class="screen">
    <yd-search v-model="value" :on-submit="submitHandler" cancel-text placeholder="搜索"></yd-search>
    <div class="shaixuan" @click="filtercheck">
      <span>
        <i class="icon-alishaixuan"></i>
      </span>
      <span>筛选</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    // 筛选按钮
    filtercheck() {
      if (this.title == "安全计划检查" || this.title == "安全自主检查") {
        this.$router.push({ path: "/safetyfilter" });
      }
      if (this.title == "安全计划" || this.title == "待我检查") {
        this.$router.push({ path: "/safetyjihuaFilter" });
      }
      if (this.title == "安全整改") {
        this.$router.push({ path: "/safetyplanFliter" });
      }
    },
    submitHandler(value) {
      this.$emit("search", value);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.yd-search {
  float: left;
  width: 85%;
}
/deep/.yd-search-input > .search-input {
  border-radius: 22px !important;
}
.screen {
  height: 1rem;
  width: 100%;
  position: fixed;
  z-index: 99;
  overflow: hidden;
}
.shaixuan {
  float: right;
  height: 50px;
  width: 15%;
  text-align: center;
  line-height: 50px;
  background-color: #efeff4;
  span {
    font-size: 12px;
    font-family: arial, sans-serif;
    i {
      color: skyblue;
      font-size: 16px;
    }
  }
}
</style>


