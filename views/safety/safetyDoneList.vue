<template>
  <div class="safetySelfCheck">
    <headerTop :title="title">
      <span
        slot="topLeft"
        class="icon-aliarrow-left- iconBack"
        v-if="isHow"
        @click="$router.push({ path: '/safetyMenu' })"
      ></span>
      <span
        slot="topLeft"
        class="icon-aliarrow-left- iconBack"
        v-if="!isHow"
        @click="$router.push({ path: '/safetyPlanMenu' })"
      ></span>
    </headerTop>
    <search @search="searchCheck" v-if="isHow"></search>
    <Plansearch @search="searchCheck" v-if="!isHow"></Plansearch>
    <div class="safetySelfConent">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
        <ul v-for="(item,index) in formList" :key="index" @click="safetyDetail(item.id)">
          <li>{{index+1}}</li>
          <li>
            <span>巡检名称：{{item.spxjname}}</span>
            <!-- <span v-if="item.safe ==0" style="background:#ffc20e">待整改</span>
            <span v-if="item.safe ==1" style="background:#f26522">待复核</span>
            <span v-if="item.safe ==2" style="background:#45b97c">通过</span>
            <span v-if="item.safe ==3" style="background:#ed1941">未通过</span>-->
          </li>
          <li>所属部门：{{item.departname}}</li>
          <li>巡检位置：{{item.projectName}}</li>
          <li>检查人：{{item.spCheckUserName}}</li>
          <li>创建时间：{{item.spCreateDateTime}}</li>
          <li>巡检性质:{{item.ipName}}</li>
          <li>
            <span>整改数量:{{item.done}}</span>
            <span>待整改:{{item.undone}}项</span>
            <span>待复核:{{item.uncheck}}项</span>
          </li>
          <li class="yuqiLi">
            是否逾期：
            <span v-if="item.overdue ==1" style="background:#ed1941;">逾期</span>
            <span v-if="item.overdue ==0" style="background:#45b97c;">未逾期</span>
          </li>
          <li>未完成数量/已完成数量({{item.unfinish}}/{{item.finish}})</li>
          <!-- <li>{{item.spxjresult==0?"通过":item.spxjresult==1?"未整改通过":"整改通过"}}</li> -->
          <li v-if="item.RectificationState==0" style="background:#1d953f;padding-left:1.4rem;">通过</li>
          <li v-if="item.RectificationState==1" style="background:#ef4136;">整改中</li>
          <li v-if="item.RectificationState==-1" style="background:#45b97c;">未发整改</li>
        </ul>
      </scroller>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
import search from "@/components/search.vue";
import Plansearch from "@/components/Plansearch.vue";
import { getZGlist } from "@/api/request.js";
import { mapGetters } from "vuex";
export default {
  name: "safetySelfCheck",
  components: {
    headerTop,
    search,
    Plansearch
  },
  data() {
    return {
      title: "自检查询",
      formList: [],
      formData: {
        offset: 0, // 开始页
        limit: 10, // 每页数量
        spxjname: "", // 巡检名称
        spBeginDate: "", // 开始时间
        spEndDate: "", // 结束时间
        isOverdue: "", // 逾期 状态
        rectificationState: "" // 整改状态（0待整改1待复检）
      },
      noDate: false,
      isHow: true
    };
  },
  created() {
    this.getInit();
    if (Object.keys(this.filterData).length > 0) {
      this.formData.spBeginDate = this.filterData.spBeginDate;
      this.formData.spEndDate = this.filterData.spEndDate;
      this.formData.isOverdue = this.filterData.isOverdue;
      this.formData.rectificationState = this.filterData.rectificationState;
    }
  },
  computed: {
    ...mapGetters(["filterData"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(from) // 上一页面的路由信息
      // vm 指的是当前的vue实例
      if (
        from.path == "/safetyPlanMenu" ||
        from.path == "/safetyDetailSeeJH" ||
        from.path == "/Planfilter"
      ) {
        vm.isHow = false;
      } else {
        vm.isHow = true;
      }
    });
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    safetyDetail(id) {
      if (!this.isHow) {
        this.$router.push({ path: "/safetyDetailSeeJH", query: { id: id } });
      } else {
        this.$router.push({ path: "/safetyDetailSee", query: { id: id } });
      }
    },
    //初始化数据
    getInit() {
      let that = this;
      getZGlist(this.formData).then(res => {
        if (res.success == 0) {
          if (that.formData.offset == 0) {
            that.formList = res.rows;
          } else {
            that.formList = that.formList.concat(res.rows);
          }
          //这一步是判断你当前请求的这一页数据是不是最后一页，如果是最后一页就不能请求了（这个根据后端给的接口判断，只要能判断出就行了，如果是最后一页给that.noDate=true）
          that.noDate = that.formList.length == res.total;
        }
      });
    },
    // 下拉刷新
    refresh() {
      this.formData.offset = 0; //重置页数刷新每次页数都是第一页
      this.noDate = false; //重置数据判断
      setTimeout(
        function() {
          this.getInit();
          this.$refs.myscroller.finishPullToRefresh(); //刷新完毕关闭刷新的转圈圈
        }.bind(this),
        1700
      );
    },
    // 上拉加载
    infinite(done) {
      if (this.noDate) {
        this.$refs.myscroller.finishInfinite(true); //这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
      } else {
        setTimeout(() => {
          this.formData.offset += this.formData.limit; //下拉一次页数+1
          this.getInit();
          done(true); //进行下一次加载操作
        }, 1500);
      }
    },
    // 搜索(从第一页开始搜)
    searchCheck(data) {
      this.formData.spxjname = data;
      this.formData.offset = 0;
      this.getInit();
    }
  },
  beforeDestroy() {
    this.$store.commit("getFilterData", "");
  }
};
</script>
<style lang="less" scoped>
.safetySelfCheck {
  padding-top: 1rem;
  height: 100%;
  background-color: #efeff4;
  .safetySelfConent {
    margin: 0.2rem;
    margin-top: 1rem;
    position: relative;
    height: 100%;
    ul {
      position: relative;
      background: #fff;
      border: 1px solid #ccc;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      -webkit-box-shadow: #666 0px 0px 10px;
      -moz-box-shadow: #666 0px 0px 10px;
      box-shadow: #666 0px 0px 10px;
      behavior: url(/PIE.htc);
      margin-bottom: 0.2rem;
      overflow: hidden;
      li {
        height: 0.6rem;
        line-height: 0.6rem;
        &:first-child {
          width: 0.4rem;
          height: 100%;
          text-align: center;
          background: #ccc;
          position: absolute;
          left: 0.1rem;
          justify-content: center; //子元素水平居中
          align-items: center; //子元素垂直居中
          display: -webkit-flex;
        }
        &:not(:first-child) {
          margin-left: 0.5rem;
          padding: 0 0.4rem;
        }
        &:nth-child(2) {
          span:first-child {
            color: #5b9fea;
            font-weight: bold;
            overflow: hidden;
          }
        }
        &:nth-child(8) {
          span:first-child {
            color: #5b9fea;
            font-weight: bold;
          }
          span:nth-child(2) {
            background: #ffc20e;
            color: #fff;
            margin-left: 0.4rem;
            padding: 0.1rem;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
          span:last-child {
            background: #f26522;
            color: #fff;
            margin-left: 0.4rem;
            padding: 0.1rem;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
        }
        &:nth-child(10) {
          color: #ff8d1a;
        }
        &:last-child {
          color: white;
          position: absolute;
          width: 4rem;
          left: 4rem;
          bottom: 0.8rem;
          transform: rotate(-45deg);
          padding-left: 1rem;
        }
      }
    }
    .yuqiLi {
      span {
        color: #fff;
        padding: 0.1rem 0.3rem;
        border-radius: 0.1rem;
      }
    }
  }
  /deep/._v-container > ._v-content {
    padding-top: 0.1rem;
  }
}
</style>
