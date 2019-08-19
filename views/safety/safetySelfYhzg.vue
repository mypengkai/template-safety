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
    <div class="zgList" v-for="(item,index) in CheckContent" :key="index">
      <p style="color:white;">{{++index}}</p>
      <ul>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>
            隐患&nbsp;
            <i style="color:#ffc300;padding:.02rem;">{{"("+item.hdGrade+")"}}</i>:
          </span>&nbsp;&nbsp;&nbsp;
          <span>{{item.spContent}}</span>
        </li>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>整改要求:</span>&nbsp;&nbsp;&nbsp;
          <span>{{item.srContent}}</span>
        </li>
        <li style="height:1.5rem;border-bottom: 1px dashed #ccc;">
          <span>整改结果:</span>&nbsp;&nbsp;&nbsp;
          <span style="color:#71ACED">{{item.Reply.replayContent}}</span>
        </li>
        <li>
          <span>整改完成时间:</span>&nbsp;&nbsp;&nbsp;
          <span>{{item.Reply.replayDateTime}}</span>
        </li>
        <li style="margin-bottom:.2rem;">
          <span style="text-align:left;padding-left:.3rem;">整改人:</span>&nbsp;&nbsp;&nbsp;
          <span>{{item.Reply.replayUserName}}</span>
        </li>
        <!-- 文件附件 -->
        <Attach
          :attachList="fileList.files"
          :delAttachList="delProgressList"
          :readonly="false"
          :sourceType="3"
        ></Attach>
        <yd-button size="large" type="primary" @click="submit">保存并提交</yd-button>
      </ul>
    </div>

    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">
          <i class="icon-alitouxiang"></i>&nbsp;&nbsp;通知人
        </span>
        <span slot="right">右边内容一</span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import Attach from "@/components/Attach.vue";

import { selfCheck, submitResult } from "@/api/request.js";
export default {
  components: {
    headerTop,
    Attach
  },
  data() {
    return {
      title: "自检隐患整改",
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
      id: "", //整改列表页携带过来的ID
      BasicData: "",
      CheckContent: "",
      params: {
        offset: 1,
        limit: 2,
        orgcode: "",
        spBeginDate: "",
        spEndDate: "",
        rectificationState: "",
        isOverdue: ""
      },
      subParams: {
        id: "", //安全巡检id
        replayUserId: "", //回复人员id
        replayUserName: "", //恢复人员name
        srId: "", //整改内容id
        replayType: "", //回复类型
        replayState: "", //回复状态
        replayContent: "", //回复内容
        filesId: "" //上传文件id
      },
      delProgressList: []
    };
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    getData() {
      selfCheck({ id: this.id }).then(res => {
        this.BasicData = res.attributes;
        this.CheckContent = res.rows;
      });
    },
    //保存
    submit() {
      submitResult().then(res => {});
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
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
        padding: 0.1rem;
        padding-right: 0.3rem;
        align-items: center; //子元素垂直居中
        &:nth-child(7) {
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
            flex: 0 0 30%;
            text-align: center;
          }
          &:nth-child(2) {
            flex: 0 0 70%;
          }
        }
        &:nth-child(8) {
          font-size: 0.28rem;
          font-weight: 600;
        }
      }
      textarea {
        padding: 0.2rem;
        border-radius: 0.2rem;
        margin-left: 0.1rem;
      }
    }
  }
  .zgList2 {
    background-color: #a6a6a6;
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
        padding: 0.1rem;
        padding-right: 0.3rem;
        align-items: center; //子元素垂直居中
        &:nth-child(7) {
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
            flex: 0 0 30%;
            text-align: center;
          }
          &:nth-child(2) {
            flex: 0 0 70%;
          }
        }
        &:nth-child(8) {
          font-size: 0.28rem;
          font-weight: 600;
        }
      }
      textarea {
        padding: 0.2rem;
        border-radius: 0.2rem;
        margin-left: 0.1rem;
      }
    }
  }
}
/deep/.yd-btn-block {
  width: 94% !important;
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
  background-color: #2a82e4;
}
/deep/.yd-cell-box {
  margin-bottom: 0 !important;
}
/deep/.yd-cell:after {
  height: 0px !important;
}
</style>
