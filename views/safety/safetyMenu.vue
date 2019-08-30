<template>
  <div class="safetyMenu">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <div class="checkList">
      <ul>
        <li @click="selfList">
          <span class="icon-alizhenggaijiancha"></span>
          <span>计检</span>
        </li>
        <li @click="selfCheck">
          <span class="icon-aligerenxinxiicon-"></span>
          <span>自检</span>
        </li>
        <li @click="safetyzhengai">
          <span class="icon-alizhenggaicuoshi"></span>
          <span>整改</span>
        </li>
        <li @click="safetyFuhe">
          <span class="icon-alicz-qkjc"></span>
          <span>复核</span>
        </li>
        <li @click="safetyDone">
          <span class="icon-alizhenggaicuoshi"></span>
          <span>查询</span>
        </li>
      </ul>
    </div>
    <div class="addCheck">
      <div @click="addSafety">
        <div>
          <i class="icon-alixinzeng"></i>
        </div>
        <span>新增检查</span>
      </div>
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
    //安全列表
    selfList(){
      this.$router.push({path:"/safetyList"})
    },
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
    },
    //新增
    addSafety() {
      this.$router.push({ path: "/safetySelfAdd" });
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
      justify-content: s;
      flex-wrap: wrap;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        margin-bottom: .2rem;
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
.addCheck {
  height: 2.7rem;
  width: 100%;
  margin-top: 5rem;
  div {
    height: 100%;
    text-align: center;
    div {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 1.8rem;
      border: 0.1rem solid #a9e5fe;
      background-color: #48cafe;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(#48cafe), to(#90d7ec));
      margin: 0 auto;
      line-height: 1.68rem;
      text-align: center;
      i {
        font-size: 1rem;
        color: white;
      }
    }
    span {
      display: inline-block;
      width: 2rem;
      height: 0.5rem;
      margin-top: 0.2rem;
      font-size: 0.25rem;
    }
  }
}
</style>





