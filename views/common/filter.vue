<template>
  <div class="filter">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="padd" @click="isHowCheck(formData)">确定</span>
    </headerTop>
    <div class="filterConter">
      <h3>选择日期</h3>
      <yd-cell-group v-if="isHowCH">
        <yd-cell-item arrow>
          <span slot="left">检查时间：</span>
          <yd-datetime
            type="date"
            start-date="2019-01-01"
            v-model="formData.spCreateDateTime"
            slot="right"
            :init-emit="false"
            placeholder="请选择检查时间"
          ></yd-datetime>
        </yd-cell-item>
      </yd-cell-group>
      <!-- ================================================================================ -->
      <yd-cell-group v-if="isHowZG">
        <yd-cell-item arrow>
          <span slot="left">开始时间：</span>
          <yd-datetime start-date="2019-01-01" v-model="formData.spBeginDate" slot="right" :init-emit="false"
            placeholder="请选择开始时间">请选择</yd-datetime>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">结束时间：</span>
          <yd-datetime start-date="2019-01-01" v-model="formData.spEndDate" slot="right" :init-emit="false"
            placeholder="请选择结束时间">请选择</yd-datetime>
        </yd-cell-item>
      </yd-cell-group>

      <!-- ====================================================================================== -->
      <h3>选择状态</h3>
      <ul v-if="isHowCH">
        <li
          v-for="(item,index) in options"
          :key="index"
          @click="filterState(index)"
          :class="{selected:index==active}"
        >{{item}}</li>
      </ul>
      <!-- ==================================================================== -->
      <!-- <ul v-if="isHowZG">
        <li
          v-for="(item,index) in stateZG"
          :key="index"
          :class="{selected:index==activeZG}"
          @click="zgState(index)"
        >{{item}}</li>
      </ul> -->
      <!-- ======================================================== -->
      <div class="filterFoot" v-if="isHowZG">
        <h3>是否逾期</h3>
        <ul>
          <li
            v-for="(item,index) in stateYQ"
            :key="index"
            :class="{selected:index==activeYQ}"
            @click="yqState(index)"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
export default {
  components: { headerTop },
  data() {
    return {
      title: "筛选",
      isHowZG: false,
      isHowCH: false,
      spCreateDateTime: "",
      options: ["未发整改", "通过", "整改中"],
      stateZG: ["待整改", "待复核", "通过", "未通过"], //（0---3）
      stateYQ: ["未逾期", "逾期"], //(0-1)
      activeZG: null,
      activeYQ: null,
      active: null,
      formData: {
        offset: 0, // 开始页
        limit: 10, // 每页数量
        spCreateDateTime: "", // 创建时间
        sprRectificationState: "", // 状态（-1：整改待发送 0：通过 1：整改中）
        spBeginDate: "", // 开始时间
        spEndDate: "", // 结束时间
        isOverdue: "", // 逾期 状态
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(from) // 上一页面的路由信息
      // vm 指的是当前的vue实例
      if (from.path == "/safetySelfZG") {
        vm.isHowZG = true;
        vm.isHowCH = false;
      } else if (from.path == "/safetySelfCheck") {
        vm.isHowZG = false;
        vm.isHowCH = true;
      }
    });
  },

  updated() {
    //this.formData.spCreateDateTime = this.spCreateDateTime;
    this.formData.sprRectificationState = parseInt(this.active);
    this.formData.isOverdue = parseInt(this.activeYQ);
   // this.formData.rectificationState = parseInt(this.activeZG);
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    isHowCheck(data) {
      this.$store.commit("getFilterData", data);
      this.$router.go(-1);
    },
    filterState(index) {
      this.active = index;
    },
    // zgState(index) {
    //   this.activeZG = index;
    // },
    yqState(index) {
      this.activeYQ = index;
    }
  }
};
</script>
<style lang="less" scoped>
.filter {
  padding-top: 1rem;
  ul {
    padding: 0.2rem;
    font-size: 0.3rem;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    li {
      background: #5f5f5f;
      color: #fff;
      padding: 0.1rem 0.4rem;
      border-radius: 0.3rem;
    }
  }
  .filterConter {
    h3 {
      padding: 0.2rem;
      line-height: 0.6rem;
      border-bottom: 1px solid #ccc;
      font-size: 0.3rem;
      font-weight: bold;
    }
  }
  .filterFoot {
    ul {
      padding: 0.3rem 1rem;
    }
  }
  .selected {
    background: #2a82e4 !important;
  }
}
</style>