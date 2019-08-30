<template>
  <div>
    <div class="dialogue" v-for="(con,lis) in ConData" :key="lis">
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
      <li>
        <span>{{con.replayType==0?"整改结果:":"复核结果:"}}</span>&nbsp;&nbsp;&nbsp;
        <span style="color:#71ACED">{{con.replayContent}}</span>
      </li>
      <li>
        <span>{{con.replayType==0?"整改完成时间:":"复核完成时间:"}}</span>&nbsp;&nbsp;&nbsp;
        <span>{{con.replayDateTime}}</span>
      </li>
      <li  style="border-bottom: 1px dashed #ccc;">
        <span style="text-align:left;padding-left:.3rem;">{{con.replayType==0?"整改人:":"复核人:"}}</span>&nbsp;&nbsp;&nbsp;
        <span>{{con.replayUserName}}</span>
      </li>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  props: ["ConData", "xjID", "leng"],
  components: {
    Attach
  },
  data() {
    return {
      fileList: {
        files: [],
        type: "SafetyReply" // 安全
      },
      flag: true,
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
    this.$emit("hasbutton",this.ConData[0].replayState);
    console.log(this.ConData, 111);
    console.log(this.leng);
    this.subParams.id = this.xjID;
    let userinfo = localStorage.getItem("userinfo");
    this.subParams.replayUserName = JSON.parse(userinfo).realname;
    this.subParams.replayUserId = JSON.parse(userinfo).id;
  },
  methods: {
    childMethod() {
      this.$emit("hasbutton");
    },
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
          this.flag = false;
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
</style>