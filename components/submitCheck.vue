<template>
  <div>
    <div class="zgList" v-for="(item,index) in contentData" :key="index">
      <p v-show="item.srUserName" style="color:white;">{{xuhao+1}}</p>
      <ul v-show="item.srUserName">
        <li style="border-bottom: 1px dashed #ccc;">
          <span>
            安全隐患&nbsp;
            <i style="background:#ffc300;padding:.04rem;color:white;font-size:.1rem;border-radius:.1rem;">{{item.hdGrade}}</i>:
          </span>&nbsp;&nbsp;&nbsp;
          <span>{{item.spContent}}</span>
        </li>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>整改要求:</span>&nbsp;&nbsp;&nbsp;
          <span>{{item.srContent}}</span>
        </li>
        <xunhuanZG
          v-for="(con,lis) in item.Reply"
          :key="lis"
          :ConData="[con]"
          :xjID="BasicData.spid"
          :leng="(item.Reply.length-1)==lis"
          @hasbutton="hasSubmit"
        ></xunhuanZG>
        <div class="dialogue" v-show="hasButton">
          <li>
            <span>整改完成时间:</span>&nbsp;&nbsp;&nbsp;
            <span>{{item.srFinishDate}}</span>
          </li>
          <li>
            <span style="text-align:left;">整改人:</span>&nbsp;&nbsp;&nbsp;
            <span>{{item.srUserName}}</span>
          </li>
          <li>
            <span>整改结果:</span>&nbsp;&nbsp;&nbsp;
            <textarea v-model="subParams.replayContent"></textarea>
          </li>
          <!-- 文件附件 -->
          <Attach
            :attachList="fileList.files"
            :delAttachList="delProgressList"
            :readonly="false"
            :sourceType="3"
            style="border-bottom:1px dashed #ccc;border-top:1px dashed #ccc;padding-top:.2rem"
          ></Attach>
          <yd-button
            v-show="flag"
            size="large"
            type="primary"
            style="width:97%;"
            @click.native="submit(item)"
          >保存并提交</yd-button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach.vue";
import xunhuanZG from "./xunhuanZG.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  props: ["contentData", "xuhao", "BasicData"],
  components: {
    Attach,
    xunhuanZG
  },
  data() {
    return {
      fileList: {
        files: [],
        type: "SafetyReply" // 安全
      },
      flag: true,
      hasButton: true,
      delProgressList: [],
      subParams: {
        id: "", //安全巡检id
        replayUserId: "", //回复人员id
        replayUserName: "", //恢复人员name
        srId: "", //整改内容id
        replayType: 0, //回复类型
        replayState: 0, //回复状态
        replayContent: "", //回复内容
        filesId: "" //上传文件id
      }
    };
  },
  created() {
    console.log(this.contentData);
    let userinfo = localStorage.getItem("userinfo");
    this.subParams.replayUserName = JSON.parse(userinfo).realname;
    this.username = JSON.parse(userinfo).realname;
    this.subParams.replayUserId = JSON.parse(userinfo).id;
  },
  methods: {
    hasSubmit(data) {
      if (data == 1) {
        this.hasButton = false;
      }
    },
    async submit(item) {
      this.subParams.id = this.BasicData.spid;
      this.subParams.srId = item.srid;
      if (this.subParams.replayContent == "") {
        this.$dialog.toast({
          mes: "请输入整改结果",
          timeout: 2000
        });
        return false;
      }
      // await this.upResult();
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
            mes: "整改成功",
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
    width: 92%;
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
          text-align: left;
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
            text-align: left;
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
</style>