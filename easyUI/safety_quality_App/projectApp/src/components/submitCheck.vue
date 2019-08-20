<template>
  <div>
    <div class="zgList" v-for="(item,index) in contentData" :key="index">
      <p style="color:white;">{{xuhao+1}}</p>
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
          <textarea v-model="subParams.replayContent"></textarea>
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
        <yd-button size="large" type="primary" @click.native="submit(item)">保存并提交</yd-button>
      </ul>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  props:{
      contentData:{
         type:Array
      },
      xuhao:{
         type:Number,
      },
      BasicData:{
         type:Object
      }
  },
  components: {
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
      subParams: {
        id: "", //安全巡检id
        replayUserId: "", //回复人员id
        replayUserName: "", //恢复人员name
        srId: "", //整改内容id
        replayType: 0, //回复类型
        replayState: 0, //回复状态
        replayContent: "", //回复内容
        filesId: "" //上传文件id
      },
      delProgressList: []
    };
  },
  created(){
      
  },
  methods: {
    //保存
    async submit(item) {
      this.subParams.id = this.BasicData.spid;
      this.subParams.srId = item.srid;
      await this.upResult();
      submitResult(this.subParams).then(res => {
        if (res.success == 0) {
          this.$dialog.toast({
            mes: "整改成功",
            timeout: 3000
          });
          this.$router.push({path:"/safetySelfFH"})
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 3000
          });
        }
      });
    },
    //文件上传
    upResult() {
      let formData = new FormData();
      formData.append("type", this.fileList.type);
      if (this.fileList.files.length > 0) {
        for (let key in this.fileList.files) {
          formData.append("file", this.fileList.files[key].file);
        }
      }
      safetyAddResult(formData).then(res => {
        if (res.success == 0) {
          this.subParams.filesId = res.obj;
          this.$dialog.toast({
            mes: "上传成功",
            timeout: 2000
          });
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 2000
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
      border-radius: 0.1rem;
      width: 100%;
      border: 1px solid #ccc;
    }
  }
}
</style>