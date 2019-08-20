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
<<<<<<< .mine
        <span>{{dataObj.spxjname}}</span>
||||||| .r14115
        <span>AQXJ20190807_001</span>
=======
        <span>{{BasicData.spxjname}}</span>
>>>>>>> .r14124
      </li>
      <li>
        <span>所属部门:</span>&nbsp;&nbsp;&nbsp;
<<<<<<< .mine
        <span>{{dataObj.departname}}</span>
||||||| .r14115
        <span>安质部</span>
=======
        <span>{{BasicData.departname}}</span>
>>>>>>> .r14124
      </li>
      <li>
        <span>巡检位置:</span>&nbsp;&nbsp;&nbsp;
<<<<<<< .mine
        <span>{{dataObj.projectName}}</span>
||||||| .r14115
        <span>花果山隧道洞口</span>
=======
        <span>{{BasicData.projectName}}</span>
>>>>>>> .r14124
      </li>
      <!-- <li>
        <span>检查性质:</span>&nbsp;&nbsp;&nbsp;
        <span>自检</span>
      </li>-->
      <li>
        <span>检查人:</span>&nbsp;&nbsp;&nbsp;
<<<<<<< .mine
        <span>{{dataObj.spCheckUserName}}</span>
||||||| .r14115
        <span>AQXJ20190807_001</span>
=======
        <span>{{BasicData.spCheckUserName}}</span>
>>>>>>> .r14124
      </li>
      <li>
        <span>检查时间:</span>&nbsp;&nbsp;&nbsp;
        <span>{{BasicData.spCreateDateTime}}</span>
      </li>
    </ul>
    <h3>
      <i class="icon-alishapes-"></i>&nbsp;&nbsp;整改内容
    </h3>

    <submitFH v-for="(item,index) in CheckContent" :key="index" :contentData="CheckContent" :BasicData="BasicData" :xuhao="index"></submitFH>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">
          <i class="icon-alitouxiang"></i>&nbsp;&nbsp;通知人
        </span>
        <span slot="right">{{dataObj.spNotifierName}}</span>
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
      delProgressList: [],
      dataObj: {},
      dataList: [],
      options:["通过","不通过"],
      active:null,
      subParams: {
        id: "", //安全巡检id
        replayUserId: "", //回复人员id
        replayUserName: "", //恢复人员name
        srId: "", //整改内容id
        replayType: 0, //回复类型
        replayState: 0, //回复状态
        replayContent: "", //回复内容
        filesId: "", //上传文件id
      }
    };
  },
  created(){
    this.id=this.$route.query.id
    this.getData()
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    getData() {
      selfCheck({ id: this.id }).then(res => {
        console.log(res)
        this.BasicData = res.attributes;
        this.CheckContent = res.rows;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
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
      .dialogue {
        li {
          display: flex;
          padding: 0.2rem 0.1rem;
          padding-right: 0.3rem;
          align-items: center; //子元素垂直居中
          &:nth-child(6) {
            display: flex;
            p {
              flex: 0 0 50%;
              button {
                width: 2rem;
                height: 0.8rem;
                color: white;
                font-size: 0.28rem;
                border-radius: 0.2rem;
                &:nth-child(1) {
                  background-color: green;
                }
              }
            }
            p:nth-child(2) {
              button:nth-child(1) {
                background-color: red;
              }
            }
          }
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
        }
      }
      textarea {
        padding: 0.2rem;
        border-radius: 0.1rem;
        margin-left: 0.1rem;
        width: 6.2rem;
      }
    }
    .imgBox {
      width: 100%;
      height: 100%;
      overflow: hidden;
      h6 {
        width: 1.2rem;
        height: 1.2rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .zgConent {
      ol {
        li{
            border-bottom: 1px dashed #ccc;
        }
      }
      .stateLi {
        ul {
          display: flex;
          justify-content: space-between;
          li{
             border: 1px solid #ccc;
             text-align: center;
             padding: 0.2rem 0.4rem;
             font-size: 0.28rem;
             border-radius: 0.1rem;
          }
        }
      }
    }
  }
  .imgFile {
    width: 100%;
    overflow: hidden;
    h6 {
      width: 1.2rem;
      height: 1.2rem;
      display: inline-block;
      img {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
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
