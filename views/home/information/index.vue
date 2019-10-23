<template>
  <div class="information">
    <headerTop :title="title"></headerTop>
    <div class="imgBox">
        <img src="@/assets/img/timg.jpg" alt />
    </div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left" class="font-span">姓名</span>
        <span slot="right">{{userinfo.realname}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">账号</span>
        <span slot="right">{{userinfo.username}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">手机</span>
        <span slot="right">{{userinfo.mobilePhone}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">邮箱</span>
        <span slot="right">{{userinfo.email}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">组织机构</span>
        <span slot="right">{{userinfo.departname}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="font-span">分部分项</span>
        <span slot="right">{{userinfo.projectName}}</span>
      </yd-cell-item>
      <yd-cell-item @click.native="version">
        <yd-icon slot="icon" name="download" color="#d71345" size="0.4rem"></yd-icon>
        <span slot="left">检查更新</span>
        <yd-badge type="danger" slot="right">{{currentVersion}}</yd-badge>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button type="danger" size="large" @click.native="goBack">退出登录</yd-button>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import { checkVersion } from "@/api/pgrApi.js";
//import { checkVersion } from "@/api/sdk.js";
import { mapGetters } from "vuex";
export default {
  components: {
    headerTop
  },
  data() {
    return {
      title: "个人信息",
      currentVersion: "1.0",
      userinfo: {}
    };
  },
  created() {
   


    let user = localStorage.getItem("userinfo");
    this.userinfo = JSON.parse(user);
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
      location.reload() 
      this.$router.push({ path: "/login" });
      sessionStorage.removeItem("token");
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
  .imgBox{
      width:2rem;
      height:2rem;
      // background:pink;
      margin:0 auto;
      img{
         width:100%;
         height:100%;
      }
  }
}
</style>
