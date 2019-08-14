<template>
  <div class="safetySelfCheck">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="icon-alixinzeng iconBack" @click="addSafetySelf"></span>
    </headerTop>
    <search @search="searchCheck"></search>
    <div class="safetySelfConent">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
        <ul v-for="(item,index) in formList" :key="index" @click="safetyDetail(item.id)">
          <li>{{index+1}}</li>
          <li>
            <span>巡检名称：{{item.spxjname}}</span>
            <span v-if="item.RectificationState =='-1'" style="background:#464547">未发整改</span>
            <span v-if="item.RectificationState =='0'" style="background:#45b97c">通过</span>
            <span v-if="item.RectificationState =='1'" style="background:##f26522">整改中</span>
          </li>
          <li>所属部门：{{item.departname}}</li>
          <li>巡检性质：{{item.ipName}}</li>
          <li>检查人：{{item.spCheckUserName}}</li>
          <li>检查时间：{{item.spCreateDateTime}}</li>
          <li>
            <span>检查总数：{{item.checkCount}}</span>
            <span>安全：{{item.safetyCount}}项</span>
            <span>有隐患：{{item.hiddenCount}}项</span>
          </li>
          <li>整改数量/整改完成数量({{item.RectificationCount}}/{{item.passCount}})</li>
        </ul>
      </scroller>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
import search from "@/components/search.vue";
import { safetySelfList } from "@/api/request.js";
import { mapGetters } from "vuex";
export default {
  name: "safetySelfCheck",
  components: {
    headerTop,
    search
  },
  data() {
    return {
      title: "自主查询",
      formList: [],
      formData: {
        offset: 0, // 开始页
        limit: 10, // 每页数量
        spCreateDateTime: "", // 创建时间
        spxjname: "", // 巡检名称
        sprRectificationState: "" // 状态（-1：整改待发送 0：待整改 1：待复核 2：通过 3：不通过）
      },
      noDate: false
    };
  },
  created() {
    this.getInit();
    if (Object.keys(this.filterData).length > 0) {
      this.formData.spCreateDateTime = this.filterData.spCreateDateTime;
      this.formData.sprRectificationState = this.filterData.sprRectificationState;
    }
  },
  computed: {
    ...mapGetters(["filterData"])
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    addSafetySelf() {
      this.$router.push({ path: "/safetySelfAdd" });
    },
    safetyDetail(id) {
      this.$router.push({ path: "/safetyzgxf" ,query:{id:id}});
    },
    //初始化数据
    getInit() {
      let that = this;
      safetySelfList(this.formData).then(res => {
        console.log(res);
        if (res.success == 0) {
          if (that.formData.offset == 1) {
            that.formList = res.rows;
          } else {
            that.formList = that.formList.concat(res.rows);
          }
          //这一步是判断你当前请求的这一页数据是不是最后一页，如果是最后一页就不能请求了（这个根据后端给的接口判断，只要能判断出就行了，如果是最后一页给that.noDate=true）
          that.noDate = that.formList.length == res.total;
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 2000
          });
          return false;
        }
      });
    },
    // 下拉刷新
    refresh() {
      this.formData.offset = 1; //重置页数刷新每次页数都是第一页
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
  beforeDestroy(){
       this.$store.commit("getFilterData",'')
  }
};
</script>
<style lang="less" scoped>
.safetySelfCheck {
  padding-top: 1rem;
  height: 100%;
  background-color: #efeff4;
  .safetySelfConent {
    margin:0.2rem;
    margin-top: 1.2rem;
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
          display: flex;
          justify-content: space-between;
          span:first-child {
            color: #5B9FEA;
            font-weight: bold;
          }
          span:last-child {
            width: 1.2rem;
            height: 0.5rem;
            margin-top: 0.2rem;
            line-height: 0.5rem;
            text-align: center;
            background: #FF8D1A;
            color: #fff;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            border-radius: 6px;
          }
        }
        &:nth-child(7) {
          span:first-child {
            color: #5B9FEA;
            font-weight: bold;
          }
          span:nth-child(2) {
            background: #45b97c;
            color: #fff;
            margin-left: 0.4rem;
            padding: 0.1rem;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
          span:last-child {
            background: #ed1941;
            color: #fff;
            margin-left: 0.4rem;
            padding: 0.1rem;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
        }
        &:last-child {
          color: #FFB365;
        }
      }
    }
  }
}
</style>
