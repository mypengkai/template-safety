<template>
  <div>
    <div class="zgList" v-for="(item,index) in contentData" :key="index">
      <p style="color:white;">{{xuhao+1}}</p>
      <ul>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>
            安全隐患
            <i style="background:#ffc300;padding:.02rem;">{{item.hdGrade}}</i>:
          </span>&nbsp;&nbsp;&nbsp;
          <span>{{item.spContent}}</span>
        </li>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>整改要求:</span>&nbsp;&nbsp;&nbsp;
          <span>{{item.srContent}}</span>
        </li>
        <xunhuanFH
          v-for="(con,lis) in item.Reply"
          :key="lis"
          :ConData="[con]"
          :xjID="BasicData.spid"
        ></xunhuanFH>
        <!-- 没有隐患或者是复核通过了应该隐藏提交复核对话框 -->
        <div class="dialogue" v-show="item.sprState===1&&item.type===1">
          <!-- <li style="margin-top:.2rem;margin-bottom:.2rem;">
            <p>
              <button @click="subParams.replayState=1" :class="{border:subParams.replayState==1}">通过</button>
            </p>
            <p>
              <button
                @click="subParams.replayState=2"
                :class="{border:subParams.replayState==2}"
              >不通过</button>
            </p>
          </li>-->
          <!-- <li style="margin-bottom:.1rem;" v-show="subParams.replayState==2">不通过原因:</li>
          <li style="margin-bottom:.1rem;" v-show="subParams.replayState==1">备注:</li>-->
          <li>备注说明：</li>
          <textarea
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
            style="border-bottom:1px dashed #ccc;border-top:1px dashed #ccc;padding-top:.2rem;margin-top:.2rem;"
          ></Attach>
          <!-- 复核成功之后需要将保存提交按钮隐藏,再次之前提交得数据也需要隐藏此按钮 -->

          <!-- <yd-button
            v-show="BasicData.spCheckUserName===userinfo.realname&&flag"
            size="large"
            type="primary"
            style="width:97%;margin-bottom:.2rem;"
            @click.native="submit(item)"
            :loading="isLoading"
            loading-txt="提交保存中..."
          >保存并提交</yd-button>-->
          <!-- :class="{border1:subParams.replayState==1}" -->
          <div class="submitButton" v-show="BasicData.spCheckUserName===userinfo.realname&&flag">
            <button @click="submit(item,'1')" >通过</button>
            <!--  :class="{border2:subParams.replayState==2}" -->
            <button @click="submit(item,'2')" >不通过</button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach.vue";
import xunhuanFH from "./xunhuanFH.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  inject:["reload"],
  props: ["contentData", "xuhao", "BasicData"],
  components: {
    Attach,
    xunhuanFH
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
      },
      isLoading: false,
      userinfo: ""
    };
  },
  created() {
    this.subParams.id = this.BasicData.spid;
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));

    this.subParams.replayUserName = JSON.parse(
      localStorage.getItem("userinfo")
    ).realname;
    this.username = this.userinfo.realname;
    this.subParams.replayUserId = JSON.parse(
      localStorage.getItem("userinfo")
    ).id;
  },

  methods: {
    async submit(item, val) {
      this.subParams.replayState = val;
      this.subParams.srId = item.srid;
      if (this.subParams.replayContent == "") {
        this.$dialog.toast({
          mes: "请输入备注说明",
          timeout: 1000
        });
        return false;
      }

      // if (!this.subParams.replayState) {
      //   this.$dialog.toast({
      //     mes: "请选择复核状态",
      //     timeout: 1000
      //   });
      //   return false;
      // }
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
        }
      });
      this.isLoading = true;
      submitResult(this.subParams).then(res => {
        if (res.success == 0) {
          this.$dialog.toast({
            mes: "复核成功",
            timeout: 3000
          });
          this.reload();
          this.isLoading = false;
          this.flag = false;
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
    width: 0.6rem;
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
          flex: 0 0 32%;
          text-align: left;
        }
        &:nth-child(2) {
          flex: 0 0 68%;
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
        // &:nth-child(1) {
        //   display: flex;
        //   p {
        //     flex: 0 0 50%;
        //     button {
        //       width: 2rem;
        //       height: 0.8rem;
        //       color: white;
        //       font-size: 0.28rem;
        //       border-radius: 0.2rem;
        //       &:nth-child(1) {
        //         background-color: green;
        //       }
        //     }
        //   }
        //   p:nth-child(2) {
        //     button:nth-child(1) {
        //       background-color: red;
        //     }
        //   }
        // }
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
// .border1 {
//   background-color: green;
//   color: white;
// }
// .border2 {
//   background-color: red;
//   color: white;
// }
.submitButton {
  display: flex;
  justify-content: space-around;
  button {
    width: 2rem;
    height: 0.8rem;
    color: white;
    font-size: 0.28rem;
    margin: 0.2rem 0;
    border-radius: 0.2rem;
    border: 1px solid #ccc;
    &:nth-child(1) {
      background-color: green;
    }
    &:nth-child(2) {
      background-color: red;
    }
  }
}
</style>