<template>
  <div class="information">
    <headerTop :flag="flag" :title="title"></headerTop>
    <div class="conentBox">
      <div class="conentLeft">
        <h2>{{form.realname}}</h2>
        <!-- <p></p> -->
      </div>
      <!-- <div class="conentRight">
        <img src="@/images/home.png" alt>
      </div>-->
    </div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left" class="font-span">性别</span>
        <span slot="right">{{form.sex}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">手机</span>
        <span slot="right">{{form.mobilePhone}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">公司</span>
        <span slot="right">{{form.departfullname}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">账号</span>
        <span slot="right">{{form.username}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">部门</span>
        <span slot="right">{{form.departname}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">职务</span>
        <span slot="right"></span>
      </yd-cell-item>
      <yd-cell-item @click.native="version">
        <span slot="left">检查更新</span>
        <yd-badge type="danger" slot="right">{{currentVersion}}</yd-badge>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button type="danger" size="large" @click.native="goBack">退出登录</yd-button>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
//import { userXX } from "@/api/request.js";
import { checkVersion } from "@/api/pgrApi.js";
export default {
  components: {
    headerTop
  },
  data() {
    return {
      flag: false,
      title: "个人信息",
      currentVersion: "1.0",
      form: {}
    };
  },
  created() {
    //this.getuser();
    if (this.$store.state.argument.updateTip) {
      checkVersion();
    }
    if (window.plus) {
      this.getCurrentVersion();
    } else {
      document.addEventListener("plusready", this.getCurrentVersion, false);
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/login" });
      localStorage.removeItem("token");
      localStorage.removeItem("departname"); // 部门名称
      localStorage.removeItem("departId"); // 部门id
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
    },
    getuser() {
      userXX().then(res => {
        if (res.success == 0) {
          this.form = res.rows[0];
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    },
    version() {
      checkVersion(() => {
        this.$dialog.toast({
          mes: "暂无版本更新",
          timeout: 2000
        });
      });
    },
    //获取当前版本号
    getCurrentVersion() {
      this.currentVersion = plus.runtime.version;
    }
  }
};
</script>

<style lang="less" scoped>
.information {
  padding: 0 0.2rem;
  height: 94vh;
  box-sizing: border-box;
  background: #fff;
  .conentBox {
    margin-top: 0.75rem;
    overflow: hidden;
    padding-top: 0.4rem;
    border-bottom: 0.01rem solid #ccc;
    .conentLeft {
      float: left;
      h2 {
        font-size: 0.36rem;
        height: 0.8rem;
        display: inline-block;
      }
      span {
        width: 0.6rem;
        height: 0.6rem;
        vertical-align: middle;
        display: inline-block;
        margin-left: 0.1rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      p {
        font-size: 0.3rem;
        height: 0.6rem;
      }
    }
    .conentRight {
      float: right;
      border-radius: 50%;
      width: 1.2rem;
      height: 1.2rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .yd-cell-item {
    border-bottom: 0.01rem solid #ccc;
  }
  .yd-btn {
    margin-bottom: 0.2rem;
  }
}
</style>
