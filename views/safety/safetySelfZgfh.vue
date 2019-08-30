<template>
  <div class="content">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <h3>
      <i class="icon-aliwocanyude"></i>&nbsp;&nbsp;基础信息
    </h3>
    <ul class="information">
      <li>
        <span>巡检名称:</span>&nbsp;&nbsp;&nbsp;
        <span>{{BasicData.spxjname}}</span>
      </li>
      <li>
        <span>所属部门:</span>&nbsp;&nbsp;&nbsp;
        <span>{{BasicData.departname}}</span>
      </li>
      <li>
        <span>巡检位置:</span>&nbsp;&nbsp;&nbsp;
        <span>{{BasicData.projectName}}</span>
      </li>
      <li>
        <span>检查性质:</span>&nbsp;&nbsp;&nbsp;
        <span>自检</span>
      </li>
      <li>
        <span>检查人:</span>&nbsp;&nbsp;&nbsp;
        <span>{{BasicData.spCheckUserName}}</span>
      </li>
      <li>
        <span>检查时间:</span>&nbsp;&nbsp;&nbsp;
        <span>{{BasicData.spCreateDateTime}}</span>
      </li>
    </ul>
    <h3>
      <i class="icon-alishapes-"></i>&nbsp;&nbsp;整改内容
    </h3>

    <submitFH v-for="(item,index) in CheckContent" :key="index" :contentData="[item]" :BasicData="BasicData" :xuhao="index"></submitFH>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">
          <i class="icon-alitouxiang"></i>&nbsp;&nbsp;通知人
        </span>
        <span slot="right">{{BasicData.spNotifierName}}</span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import Attach from "@/components/Attach.vue";
import submitFH from "@/components/submitFH.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  components: {
    headerTop,
    submitFH,
    Attach
  },
  data() {
    return {
      title: "自检整改复核",
      id:"",//列表页携带过来的ID
      BasicData: {},
      CheckContent: [],
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
      delProgressList: []
    };
  },
  created(){
    this.id=this.$route.query.id
    this.getData()
  },
  methods: {
    routerBack() {
      // this.$router.go(-1);
      this.$router.push({path:"/safetySelfFH"})
    },
    getData() {
      selfCheck({ id: this.id }).then(res => {
        this.BasicData = res.attributes;
        this.CheckContent = res.rows;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  // padding: 0 0.1rem;
  padding-top: 1.2rem;
  background-color: #f5f5f5;
  h3 {
    padding-left: 0.5rem;
    font-size: 0.28rem;
    font-weight: 600;
  }
  .information {
    padding-left: 0.5rem;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 5px #888888;
    margin: 0.2rem 0.1rem;
    li {
      padding: 0.1rem 0;
    }
  }
  .zgList {
    background-color: #ffc300;
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    p {
      width: 0.8rem;
      //   background-color: #ffc300;
      height: 100%;
      float: left;
      text-align: center;
    }
    ul {
      background-color: #fff;
      width: 100%;
      padding-left: 0.2rem;
      li {
        display: flex;
        padding: 0.2rem 0.1rem;
        padding-right: 0.3rem;
        align-items: center; //子元素垂直居中
        span {
          display: inline-block;

          &:nth-child(1) {
            flex: 0 0 28%;
            text-align: center;
          }
          &:nth-child(2) {
            flex: 0 0 72%;
            padding: 0.1rem;
          }
        }
        &:nth-child(8) {
          font-size: 0.28rem;
          font-weight: 600;
        }
      }
    
    }
  }
  
}
/deep/.yd-cell-box {
  margin-bottom: 0 !important;
}
/deep/.yd-cell:after {
  height: 0px !important;
}
</style>
