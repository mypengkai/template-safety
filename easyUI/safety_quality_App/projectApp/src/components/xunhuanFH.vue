<template>
  <div>
    <div class="dialogue" v-for="(con,lis) in ConData" :key="lis" >
      <li>
        <span>附件:</span>
        <div class="imgFile">
          <h6>
            <viewer :images="con.files2">
              <img v-for="(src,index) in con.files2" :src="fileURL+ src.FilePath" :key="index" />
            </viewer>
          </h6>
        </div>
      </li>
      <li style="border-bottom: 1px dashed #ccc;">
        <span>{{con.replayType==0?"整改结果:":"复核结果:"}}</span>&nbsp;&nbsp;&nbsp;
        <span style="color:#71ACED">{{con.replayContent}}</span>
      </li>
      <li>
        <span>整改完成时间:</span>&nbsp;&nbsp;&nbsp;
        <span>{{con.replayDateTime}}</span>
      </li>
      <li>
        <span style="text-align:left;">整改人:</span>&nbsp;&nbsp;&nbsp;
        <span>{{con.replayUserName}}</span>
      </li>
      <li style="margin-top:.2rem;margin-bottom:.2rem;" v-show="leng&&flag">
        <p>
          <button @click="subParams.replayState=1" :class="{border:subParams.replayState==1}">通过</button>
        </p>
        <p>
          <button @click="subParams.replayState=2" :class="{border:subParams.replayState==2}">不通过</button>
        </p>
      </li>
      <li style="margin-bottom:.1rem;" v-show="subParams.replayState==2">不通过原因:</li>
      <li style="margin-bottom:.1rem;" v-show="subParams.replayState==1">备注:</li>
      <textarea
        cols="57"
        rows="5"
        placeholder="点击输入文字..."
        class="text"
        v-model="subParams.replayContent"
        v-show="subParams.replayState==1||subParams.replayState==2"
      ></textarea>
      <!-- 文件附件 -->
      <Attach
      v-show="leng&&flag"
        :attachList="fileList.files"
        :delAttachList="delProgressList"
        :readonly="false"
        :sourceType="3"
        style="border-bottom:1px dashed #ccc;"
      ></Attach>
      <!-- 复核成功之后需要将保存提交按钮隐藏,再次之前提交得数据也需要隐藏此按钮 -->
      <yd-button size="large" type="primary" style="width:97%;margin-bottom:.2rem;" @click.native="submit(con)" v-show="leng&&flag">保存并提交</yd-button>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  props: ["ConData", "xjID","leng"],
  components: {
    Attach
  },
  data() {
    return {
      fileList: {
        files: [],
        type: "SafetyReply" // 安全
      },
      flag:true,
      delProgressList: [],
      subParams: {
        id: "", //安全巡检id
        replayUserId: "", //回复人员id
        replayUserName: "", //恢复人员name
        srId: "", //整改内容id
        replayType: 1, //回复类型
        replayState: "", //回复状态
        replayContent: "", //回复内容
        filesId: "" //上传文件id
      }
    };
  },
  created() {
    console.log(this.leng)
    this.subParams.id = this.xjID;
    let userinfo = localStorage.getItem("userinfo");
    this.subParams.replayUserName = JSON.parse(userinfo).realname;
    this.subParams.replayUserId = JSON.parse(userinfo).id;
  },
  methods: {
    async submit(item) {
      this.subParams.srId = item.srId;
      if (!this.subParams.replayState) {
        this.$dialog.toast({
          mes: "请选择复核状态",
          timeout: 1000
        });
        return false;
      }
      //文件上传
      let formData = new FormData();
      formData.append("type", this.fileList.type);
      if (this.fileList.files.length > 0) {
        for (let key in this.fileList.files) {
          formData.append("file", this.fileList.files[key].file);
        }
      }
      await safetyAddResult(formData).then(res => {
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
      submitResult(this.subParams).then(res => {
        if (res.success == 0) {
          this.$dialog.toast({
            mes: "复核成功",
            timeout: 3000
          });
        this.flag=false //复核成功之后需要将保存提交按钮隐藏
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 3000
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.dialogue {
  li {
    display: flex;
    padding: 0.2rem 0.1rem;
    padding-right: 0.3rem;
    align-items: center; //子元素垂直居中
    span{
      &:nth-child(1){
        text-align: left !important;
      }
    }
    &:nth-child(5) {
      display: flex;
      p {
        flex: 0 0 50%;
        padding-left: 0.5rem;
        button {
          width: 2rem;
          height: 0.8rem;
          color: white;
          font-size: 0.28rem;
          border-radius: 0.2rem;
          &:nth-child(1) {
            background-color: #00a6ac;
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
  border-radius: 0.2rem;
  margin-left: 0.1rem;
  width: 6.2rem;
}
.border {
  border: 2px solid #525f42;
}
.imgFile {
  width: 100%;
  overflow: hidden;
  h6 {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    overflow: hidden;
    img {
      width: 1.2rem;
      height: 1.2rem;
      display: block;
    }
  }
}
/deep/.att_num_tip{
  padding-left: 0 !important;
}
</style>