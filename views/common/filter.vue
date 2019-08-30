<template>
  <div class="filter">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="padd" @click="isHowCheck(formData)">确定</span>
    </headerTop>
    <div class="filterConter">
      <h3>检查日期</h3>
      <yd-cell-group v-if="isHowCH">
        <!-- <yd-cell-item arrow>
          <span slot="left">检查时间：</span>
          <yd-datetime
            type="date"
            start-date="2019-01-01"
            v-model="formData.spCreateDateTime"
            slot="right"
            :init-emit="false"
            placeholder="请选择检查时间"
          ></yd-datetime>
        </yd-cell-item>-->
        <yd-cell-item arrow>
          <span slot="left">开始时间：</span>
          <yd-datetime
            start-date="2019-01-01"
            v-model="formData.spBeginDate"
            slot="right"
            :init-emit="false"
            placeholder="请选择"
          >请选择</yd-datetime>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">结束时间：</span>
          <yd-datetime
            start-date="2019-01-01"
            v-model="formData.spEndDate"
            slot="right"
            :init-emit="false"
            placeholder="请选择"
          >请选择</yd-datetime>
        </yd-cell-item>
      </yd-cell-group>
      <!-- ================================================================================ -->
      <yd-cell-group v-if="isHowZG">
        <yd-cell-item arrow>
          <span slot="left">开始时间：</span>
          <yd-datetime
            start-date="2019-01-01"
            v-model="formData.spBeginDate"
            slot="right"
            :init-emit="false"
            placeholder="请选择开始时间"
          >请选择</yd-datetime>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">结束时间：</span>
          <yd-datetime
            start-date="2019-01-01"
            v-model="formData.spEndDate"
            slot="right"
            :init-emit="false"
            placeholder="请选择结束时间"
          >请选择</yd-datetime>
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
      <ul v-if="isHowZG">
        <li
          v-for="(item,index) in stateYQ"
          :key="index"
          :class="{selected:index==activeYQ}"
          @click="yqState(index)"
        >{{item}}</li>
      </ul>
      <ul v-if="isHowZG">
        <li
          v-for="(item,index) in state"
          :key="index"
          @click="rectification(index)"
          :class="{selected:index==formData.rectificationState}"
        >{{item}}</li>
      </ul>
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
      stateYQ: ["未逾期", "逾期"], //(0-1)
      state: ["待整改","待复检","通过","未通过"],
      activeZG: null,//整改
      activeYQ: null,//逾期
      active: null,
      formData: {
        offset: 0, // 开始页
        limit: 10, // 每页数量
        spCreateDateTime: "", // 创建时间
        sprRectificationState: "", // 状态（-1：整改待发送 0：通过 1：整改中）
        spBeginDate: "", // 开始时间
        spEndDate: "", // 结束时间
        isOverdue: "", // 逾期 状态
        rectificationState:""
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(from) // 上一页面的路由信息
      // vm 指的是当前的vue实例
      if (
        from.path == "/safetySelfZG" ||
        from.path == "/safetySelfFH" ||
        from.path == "/safetyDoneList"
      ) {
        vm.isHowZG = true;
        vm.isHowCH = false;
      } else if (from.path == "/safetySelfCheck") {
        vm.isHowZG = false;
        vm.isHowCH = true;
      }
    });
  },

  updated() {
    //di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = new Date(this.formData.spBeginDate.replace(/-/g, "/")); //将-转化为/，使用new Date
    var dateEnd = new Date(this.formData.spEndDate.replace(/-/g, "/")); //获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    if (dateDiff < 0) {
      this.$dialog.toast({
        mes: "结束时间不能在开始时间之前",
        timeout: 1500
      });
      this.formData.spBeginDate = this.getNowFormatDate();
      this.formData.spEndDate = this.getNowFormatDate();
    }
    this.date = Math.floor(dateDiff / (24 * 3600 * 1000) + 1) + "天"; //计算出相差天数
    this.formData.sprRectificationState = parseInt(this.active);
    this.formData.isOverdue = parseInt(this.activeYQ);
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
    yqState(index) {
      this.activeYQ = index;
    },
    rectification(data){
      this.formData.rectificationState=data
      console.log(this.formData.rectificationState)
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
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
      border-radius: 0.2rem;
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
  .selected {
    background: #2a82e4 !important;
  }
}
</style>