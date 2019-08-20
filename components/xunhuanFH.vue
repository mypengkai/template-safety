<template>
  <div>
    <div class="dialogue" v-for="(con,lis) in ConData" :key="lis">
      <li>
        <span>附件:</span>
        <div class="imgFile">
          <h6>
            <viewer :images="con.files2">
              <img v-for="(src,index) in con.files2" :src="FilePath" :key="index" />
            </viewer>
          </h6>
        </div>
      </li>
      <li style="border-bottom: 1px dashed #ccc;">
        <span>整改结果:</span>&nbsp;&nbsp;&nbsp;
        <span style="color:#71ACED">{{con.replayContent}}</span>
      </li>
      <li>
        <span>整改完成时间:</span>&nbsp;&nbsp;&nbsp;
        <span>{{con.replayDateTime}}</span>
      </li>
      <li>
        <span style="text-align:left;padding-left:.3rem;">整改人:</span>&nbsp;&nbsp;&nbsp;
        <span>{{con.replayUserName}}</span>
      </li>
      <!-- 文件附件 -->
      <Attach
        :attachList="fileList.files"
        :delAttachList="delProgressList"
        :readonly="false"
        :sourceType="3"
        style="border-bottom:1px dashed #ccc;"
      ></Attach>
      <li style="margin-top:.2rem;margin-bottom:.2rem;">
        <p>
          <button @click="subParams.replayState=1" :class="{border:subParams.replayState==1}">通过</button>
        </p>
        <p>
          <button @click="subParams.replayState=2" :class="{border:subParams.replayState==2}">不通过</button>
        </p>
      </li>
      <li style="margin-bottom:.1rem;">不通过原因:</li>
      <textarea
        name
        id
        cols="57"
        rows="5"
        placeholder="点击输入文字..."
        class="text"
        v-model="subParams.replayContent"
      ></textarea>
      <!-- 文件附件 -->
      <Attach
        :attachList="fileList.files"
        :delAttachList="delProgressList"
        :readonly="false"
        :sourceType="3"
        style="border-bottom:1px dashed #ccc;"
      ></Attach>
      <yd-button size="large" type="primary" style="width:97%;" @click.native="submit(con)">保存并提交</yd-button>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  props: ["ConData", "xjID"],
  components: {
    Attach
  },
  data() {
    return {
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
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
      await this.upResult();
      submitResult(this.subParams).then(res => {
        if (res.success == 0) {
          this.$dialog.toast({
            mes: "整改成功",
            timeout: 3000
          });
          this.$router.push({ path: "/safetySelfZG" });
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
        padding-left: 0.5rem;
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
  border-radius: 0.2rem;
  margin-left: 0.1rem;
  width: 6.2rem;
}
.border {
  border: 2px solid #e0861a;
}

</style>