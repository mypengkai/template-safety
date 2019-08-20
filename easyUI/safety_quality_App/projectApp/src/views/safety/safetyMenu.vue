<template>
  <div class="safetyMenu">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <div class="checkList">
      <ul>
        <li @click="selfCheck">
          <span class="icon-aligerenxinxiicon-"></span>
          <span>自检</span>
        </li>
        <li @click="safetyzhengai">
          <span class="icon-alizhenggaicuoshi"></span>
          <span>整改</span>
        </li>
        <li @click="safetyFuhe">
          <span class="icon-aligerenxinxiicon-"></span>
          <span>复核</span>
        </li>
        <li @click="safetyDone">
          <span class="icon-alizhenggaicuoshi"></span>
          <span>完成</span>
        </li>
      </ul>
    </div>
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
      title: "安全"
    };
  },
  created() {},
  methods: {
    // 回退
    routerBack() {
      this.$router.push({ path: "/dashboard" });
    },
    // 自检
    selfCheck() {
      this.$router.push({ path: "/safetySelfCheck" });
    },
    //整改
    safetyzhengai() {
      this.$router.push({ path: "/safetySelfZG" });
    },
    //复核
    safetyFuhe() {
      this.$router.push({ path: "/safetySelfFH" });
    },
    //最终查询
    safetyDone() {
      this.$router.push({ path: "/safetyDoneList" });
    }
  }
};
</script>
<style lang="less" scoped>
.safetyMenu {
  padding-top: 1rem;
  width: 100%;
  height: 100%;
  .checkList {
    margin-top: 0.4rem;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          font-size: 0.36rem;
          &:nth-child(1) {
            font-size: 0.5rem;
            background: #edf6fe;
            color: #248bfd;
            padding: 0.1rem 0.2rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>





