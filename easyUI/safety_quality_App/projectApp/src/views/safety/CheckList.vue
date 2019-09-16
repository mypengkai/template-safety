<template>
  <div style="height:100%">
    <headerTop :title="title">
      <span
        slot="topLeft"
        class="icon-aliarrow-left- iconBack"
        @click="$router.push({path:'/safetyPlanMenu'})"
      ></span>
      <span slot="topRight" class="padd" @click="addplancheck">保存</span>
    </headerTop>
     <search @search="searchCheck"></search>
    <div style="position: relative;height:100%;">
      <scroller :on-refresh="refresh" :on-infinite="infinite" infinite-scroll-disabled="busy" ref="myscroller">
        <ul class="planList">
          <li @click="planDetail(item.id)" v-for="( item ,index) in planList" :key="index">
            <p>{{item.qppName}}</p>
            <!-- <p>分部分项: {{item.projectName}}</p> -->
            <p>
              检查人:
              <span>{{item.qppCheckUserName}}</span>
            </p>
            <p>
              检查项:
              <!-- <span>{{item.qppContent}}</span> -->
              <ul v-for="(value,index) in (item.qppContent||'').split(',')" :key="index" style="padding-left:.2rem">{{++index+':'+value}}</ul>
            </p>
            <p>
              巡检部门:
              <!-- <span>{{item.qppDepartmentName}}</span> -->
              <ul v-for="(value,index) in (item.qppDepartmentName||'').split(',')" :key="index" style="padding-left:.2rem">{{++index+':'+value}}</ul>
            </p>
            <p>
              填报日期:
              <span>{{item.qppCreateDateTime|dateformat}}</span>
            </p>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import search from "@/components/search.vue";
import qs from "qs";
import { mapGetters } from "vuex";
import { addCheck, addCheckResult, remePlanDataWU } from "@/api/request.js";
export default {
  components: { headerTop, search },
  data() {
    return {
      flag: true,
      title: "质量计划",
      searchResult: "",
      noDate: false, //这是一个判断是否加载的开关
      total: "",
      planList: [],
      formData: {
        offset: -5,
        //单页
        limit: 5,
        qppName: "",
        qppBeginDate: "",
        qppEndDate: ""
      }
    };
  },
  computed: {
    ...mapGetters(["searchformData"])
  },
  created() {
    if (this.searchformData.length != 0) {
      this.formData = this.searchformData;
    }
    // this.getList();
  },

  methods: {
    addPlan() {
      this.$router.push({ path: "QaddPlan" });
    },
    planDetail(id) {
      this.$router.push({ name: "planDetail", params: { id: id } });
    },
    addCheck() {
      this.$router.push({ path: "addCheck" });
    },
    // 搜索(从第一页开始搜)
    searchCheck(data) {
      this.formData.spxjname = data;
      this.formData.offset = 0;
      this.getList();
    },
    // 获取数据
    getList() {
      this.$nextTick(()=>{
        this.formData.qppBeginDate="",
        this.formData.qppEndDate=""
      })
      var that = this;
      remePlanDataWU(that.formData).then(function(data) {
        if (data.msg == "成功") {
          //这一步是判断你当前请求的这一页数据是不是最后一页，如果是最后一页就不能请求了（这个根据后端给的接口判断，只要能判断出就行了，如果是最后一页给that.noDate=true）
          // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
          if (that.formData.offset == 0) {

            that.planList = data.rows;
          } else {
            that.planList = that.planList.concat(data.rows);
          }
          that.noDate = that.planList.length >= data.total;
        }
      })
        
    },
    // 下拉刷新
    refresh() {

      this.formData.offset = 0; //重置页数刷新每次页数都是第一页
      this.noDate = false; //重置数据判断
      setTimeout(
        function() {
          this.getList();
          this.$refs.myscroller.finishPullToRefresh(); //刷新完毕关闭刷新的转圈圈
        }.bind(this),
        1700
      );
    },
    // 上拉加载
    infinite(done) {
      // this.$refs.myscroller.finishInfinite(2);

      let that=this

      if (that.noDate) {
        that.$refs.myscroller.finishInfinite(true); //这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈

      } else {
        setTimeout(() => {
          that.formData.offset += that.formData.limit; //下拉一次页数+1

          that.getList();

          done(true); //进行下一次加载操作
        }, 1500);
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.yd-back-icon {
  color: white !important;
}
/deep/.yd-navbar-center-title {
  color: white !important;
}
/deep/.yd-badge {
  float: right;
  border-bottom-left-radius: 0 !important;
  background: -webkit-linear-gradient(to right, #56b7fe, #74a3fe);
  background: -o-linear-gradient(to right, #56b7fe, #74a3fe);
  background: -moz-linear-gradient(to right, #56b7fe, #74a3fe);
  background: linear-gradient(to right, #56b7fe, #74a3fe);
}
.shaixuan {
  float: right;
  height: 1rem;
  width: 20%;
  text-align: center;
  line-height: 1rem;
  background-color: #efeff4;
  span {
    font-size: 0.3rem;
    i {
      color: skyblue;
      font-size: 0.4rem;
    }
  }
}
.planList {
  background-color: #efeff4;
  padding: 0.2rem;

  li {
    background-color: white;
    border-radius: 0.1rem;
    margin-bottom: 0.2rem;
    p:nth-child(1) {
      color: skyblue;
      font-weight: 400;
      font-size: 0.32rem;
    }
    p:nth-child(2) {
      color: black;
      font-size: 0.25rem;
    }
    p {
      padding: 0.16rem 0.2rem;
      font-size: 0.25rem;
    }
  }
}
</style>
