<template>
  <div class="information">
    <headerTop :title="title"></headerTop>
    <yd-cell-group>
       <yd-cell-item>
        <span slot="left" class="font-span">姓名</span>
        <span slot="right"></span>
      </yd-cell-item>
       <yd-cell-item>
        <span slot="left" class="font-span">账号</span>
        <span slot="right">{{form.username}}</span>
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
      localStorage.removeItem("token")
    },
    getuser() {
      userXX().then(res => {
        if (res.success == 0) {
          this.form = res.rows[0];
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
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  .yd-cell-item {
    border-bottom: 1px solid #ccc;
  }
  .yd-btn {
    margin-bottom: 0.2rem;
  }
}
</style>
