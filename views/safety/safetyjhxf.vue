<template>
  <div class="safetyZgxf">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <div class="content">
      <h3>
        <i class="icon-aliwocanyude"></i>&nbsp;&nbsp;基础信息
      </h3>
      <div class="information">
        <p>
          <span>巡检名称:</span>
          <span>{{BasicData.spxjname}}</span>
        </p>
        <p>
          <span>所属部门:</span>
          <span>{{BasicData.departname}}</span>
        </p>
        <p>
          <span>巡检位置:</span>
          <span>{{BasicData.projectName}}</span>
        </p>
        <p>
          <span>检查性质:</span>
          <span>{{BasicData.ipName}}</span>
        </p>
        <p>
          <span>检查人:</span>
          <span>{{BasicData.spCheckUserName}}</span>
        </p>
        <p>
          <span>检查时间:</span>
          <span>{{BasicData.spCreateDateTime}}</span>
        </p>
      </div>
      <h3>
        <i class="icon-alishapes-"></i>&nbsp;&nbsp;整改内容
      </h3>

      <div ref="mychild" id="mychild" style="margin: 0 .1rem;">
        <zgxf
          v-for="(item,index) in CheckContent"
          :key="index"
          :itData="[item]"
          :xuhao="index"
          :BasicData="BasicData"
          ref="childUpload"
        ></zgxf>
      </div>
      <!-- <h3> -->
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">通知人</span>
          <span slot="right">{{BasicData.spNotifierName}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <!-- </h3> -->
      <yd-button
        v-show="flag&&state==-1"
        size="large"
        type="primary"
        style="background:#2A82E4"
        @click.native="DownCheck"
        :loading="isLoading" loading-txt="保存下发中..."
      >保存并下发</yd-button>
    </div>
    <!-- <ZGren :show="show"></ZGren> -->
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import zgxf from "@/components/zgxf";
import { CheckSelfListDetail, DownCheck } from "@/api/request.js";
import { mapGetters } from "vuex";
import ZGren from "@/views/common/ZGren";
export default {
  components: {
    headerTop,
    zgxf
  },
  data() {
    return {
      title: "自检整改单下发",
      datetime7: "",
      offsetTop: "", //获取滚动位置，下次进来的时候，设置滚动高度为这个值
      username: "", // 登录用户
      id: "", //列表页传递过来的参数
      BasicData: {}, //基础信息内容
      CheckContent: [], //整改内容
      paramsArr: [],
      flag: true,
      states: [], // 状态
      state: "",
      isLoading:false
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.state = this.$route.query.state;
    this.getData();
    let userinfo = localStorage.getItem("userinfo");
    this.username = JSON.parse(userinfo).realname;
  },
  activated() {
    // keep-alive组件 页面进入的时候设置滚动高度
    document.getElementById("mychild").scrollTop = this.offsetTop;
  },
  deactivated() {
    //keep-alive 组件停用时调用（简单理解为组件离开的时候）。
    // 获取页面滚动高度，这个钩子有可能会拿不到数据，因为这个钩子执行的慢，可以用beforeRouteLeave代替
    this.offsetTop = document.getElementById("mychild").scrollTop;
  },
  methods: {
    //页面回退
    routerBack() {
      this.$router.go(-1);
    },
    //获取页面数据
    getData() {
      CheckSelfListDetail({ id: this.id }).then(res => {
        if (res.success == 0) {
          this.BasicData = res.obj;
          this.CheckContent = res.rows;
          this.CheckContent.forEach(element => {
            this.states.push(element.sprState);
          });
          let state = this.states.some(item => {
            return item == 1;
          });
          if (state && this.username == this.BasicData.spCheckUserName) {
            this.flag = true;
          } else {
            this.flag = false;
          }
        } 
      });
    },
    DownCheck() {
      let arr = this.$refs.mychild.children;
      let list = [];
      for (let i = 0; i < arr.length; i++) {
        //判断检查状态,是否需要继续下发整改
        if (arr[i].__vue__.CheckState) {
          list.push(arr[i].__vue__.params);
        }
      }
      this.paramsArr = list;
      console.log(this.paramsArr);
      for (let key in this.paramsArr) {
        if (this.paramsArr[key].srFinishDate == "") {
          this.$dialog.toast({
            mes: "请选择整改时间",
            timeout: 2000
          });
          return false;
        }
        if (
          this.paramsArr[key].srUserName == "" ||
          this.paramsArr[key].srUserName == undefined ||
          this.paramsArr[key].srUserName == null
        ) {
          this.$dialog.toast({
            mes: "请选择整改人",
            timeout: 2000
          });
          return false;
        }
      }
      this.isLoading=true
      DownCheck(this.paramsArr).then(res => {
        if (res.success == 0) {
          this.$dialog.toast({
            mes: "下发整改成功",
            timeout: 2000
          });
          this.isLoading=false
          this.flag = false;
          this.$router.push({ path: "/safetySelfZG" });
        } 
      });
    }
  }
};
</script>
<style lang="less" scoped>
.safetyZgxf {
  background-color: #f5f5f5;
  padding-top: 1rem;
}
.content {
  padding: 0.2rem 0;
  h3 {
    padding-left: 0.4rem;
    font-size: 0.28rem;
    font-weight: 600;
    color: black;
    line-height: 0.6rem;
  }
  .information {
    margin: 0.1rem 0.1rem;
    border: 1px solid #ccc;
    padding-left: 0.7rem;
    background: #fff;
    box-shadow: 1px 1px 5px #888888;
    p {
      color: black;
      padding: 0.1rem 0;
    }
  }
  ul {
    position: relative;
    background: #fff;
    behavior: url(/PIE.htc);
    margin-bottom: 0.2rem;

    li {
      display: flex;

      &:first-child {
        width: 0.6rem;
        height: 100%;
        text-align: center;
        background: #ffc300;
        position: absolute;
        // left: 0.1rem;
        justify-content: center; //子元素水平居中
        align-items: center; //子元素垂直居中
        display: -webkit-flex;
        color: white;
      }
      &:not(:first-child) {
        // margin-left: 1rem;
        padding: 0.1rem 0.2rem;
        align-items: center;
        display: -webkit-flex;
        border-bottom: 1px dashed #ccc;

        p:first-child {
          flex: 0 0 32%;
        }
        p:last-child {
          flex: 0 0 68%;
        }
      }
      &:nth-child(2) {
        position: relative;
        span {
          position: absolute;
          bottom: 0.1rem;
          right: 0.3rem;
          background-color: #ffc300;
          border-radius: 0.1rem;
          padding: 0.01rem;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  /deep/.yd-cell-left {
    font-size: 12px;
  }
  /deep/.yd-cell-right {
    font-size: 12px;
    // padding-left: 2.2rem;
  }
  /deep/.yd-cell:after {
    height: 0;
  }
}
</style>
