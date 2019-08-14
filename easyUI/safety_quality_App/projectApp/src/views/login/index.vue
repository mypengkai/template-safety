<template>
  <div class="login">
    <div class="header">
      <span>
        <img src="@/assets/img/shtoone.png" alt />
      </span>
      <h6>安全巡检系统</h6>
    </div>
    <div class="content">
      <p>
        <span class="icon-aliyonghu"></span>
        <input type="text" placeholder="用户" v-model="from.username" />
      </p>
      <p>
        <span class="icon-aliquerenmima"></span>
        <input type="password" placeholder="密码" v-model="from.password" />
      </p>
      <yd-button type="primary" @click.native="logInto">登 录</yd-button>
    </div>
    <div class="footer">
      <p>版权@上海同望信息技术有限公司</p>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/api/request.js";
// import { messagePush } from "../../assets/plus/push";
export default {
  data() {
    return {
      from: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    //进入页面先获取存储的用户信息
    let loginInfo = localStorage.getItem("loginInfo");
    if (loginInfo) {
      this.from = JSON.parse(loginInfo);
    }
  },
  methods: {
    //登录
    logInto() {
      if (this.from.username == "") {
        this.$dialog.toast({
          mes: "请输入用户名",
          timeout: 1500
        });
        return false;
      }
      if (this.from.password == "") {
        this.$dialog.toast({
          mes: "请输入密码",
          timeout: 1500
        });
        return false;
      }
      //将最新的用户信息存储到本地
      // localStorage.setItem("loginInfo", JSON.stringify(this.from));
      getToken(this.from)
        .then(res => {
          // console.log(res.success);
          if (res.success == 0) {
            let token = res.obj.token;
            localStorage.setItem("token", token);
            this.$router.push({ path: "/" });
          } else {
            this.$dislog.toast({
              mes: res.msg,
              timeout: 2000
            });
            return false;
          }
        })
        .catch(err => {
          this.$dialog.toast({
            mes: "网络连接异常",
            timeout: 1500
          });
          return false;
        });
    }
    //个推
    // registerGetui() {
    //   messagePush("getClientId", null, null, null, res => {
    //     initGetui(
    //       {
    //         clientId: res.clientid,
    //         imei: res.imei,
    //         imsi: res.imsi,
    //         model: res.model,
    //         vendor: res.vendor,
    //         uuid: res.uuid,
    //         phoneType: res.phoneType
    //       }
    //     ).then(res=>{

    //     });
    //   });
    // }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #fff;
  .header {
    padding-top: 1rem;
    text-align: center;
    span {
      display: block;
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    h6 {
      font-size: 0.36rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }
  }
  .content {
    text-align: center;
    margin-top: 1rem;
    p {
      margin: 0.2rem 0;
      position: relative;
      width: 6.5rem;
      height: 0.8rem;
      margin: 0 auto;
      margin-bottom: 0.2rem;
      input {
        width: 6.5rem;
        height: 0.8rem;
        border-radius: 0.5rem;
        border: 0.03rem solid #ccc;
        text-indent: 0.7rem;
      }
      span {
        position: absolute;
        height: 0.8rem;
        line-height: 0.8rem;
        left: 0.25rem;
        top: 0rem;
        color: black;
        font-size: 0.4rem;
      }
    }
    button {
      margin-top: 0.3rem;
      width: 6.2rem;
      height: 0.8rem;
      border-radius: 0.5rem;
      color: white;
      font-size: 0.36rem;
    }
  }
  .footer {
    text-align: center;
    margin-top: 2rem;
    p {
      font-size: 0.18rem;
    }
  }
  /deep/.yd-btn-primary:not(.yd-btn-loading) {
    background-color: blue;
  }
}
</style>

