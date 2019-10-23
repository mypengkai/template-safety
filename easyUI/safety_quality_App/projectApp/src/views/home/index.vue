<template>
  <div class="home">
    <!-- 底部导航 -->
    <router-view></router-view>
    <footer>
      <router-link id="routerCheck" :class="{selected:path=='#/schedule'}" to="/schedule">
        <span
          style="background:red;color:white;position: absolute;border-radius: .1rem .1rem .1rem 0;padding:0 .05rem;left:1.1rem"
        >{{leng}}</span>
        <p>
          <i class="icon-aliicon--"></i>
        </p>
        <p>消息</p>
      </router-link>
      <router-link id="routerCheck" :class="{selected:path=='#/dashboard'}" to="/dashboard">
        <p>
          <i class="icon-aligongzuotai"></i>
        </p>
        <p>工作台</p>
      </router-link>
      <router-link id="routerCheck" :class="{selected:path=='#/contacts'}" to="/contacts">
        <p>
          <i class="icon-alizuzhijigou"></i>
        </p>
        <p>组织机构</p>
      </router-link>
      <router-link id="routerCheck" :class="{selected:path=='#/information'}" to="/information">
        <p>
          <i class="icon-aligerenxinxiicon-"></i>
        </p>
        <p>个人信息</p>
      </router-link>
    </footer>
  </div>
</template>
<script>
import { pushmessage } from "@/api/request.js";
export default {
  data() {
    return {
      index: 2,
      leng: "",
      path: "#/dashboard",
      form: {
        limit: 1000,
        offset: 0
      }
    };
  },
  created() {
    this.getMessage();
  },
  updated() {
    // 路由切换时选中对应的导航栏高亮
    this.path = window.location.hash;
    sessionStorage.setItem("path", this.path);
  },
  mounted() {
    // 保存选中的高亮状态，避免刷新时状态丢失
    this.path = sessionStorage.getItem("path");
  },
  methods: {
    getMessage() {
      pushmessage(this.form).then(res => {
        this.leng = res.data.rows.length;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  background: #f6f5ec;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .top {
    height: 1rem;
  }
  footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.3rem;
    text-align: center;
    background: #fff;
    color: #333;
    border-top: 0.01rem solid #ccc;
    z-index: 999;
    #routerCheck {
      float: left;
      width: 25%;
      height: 100%;
      i {
        font-size: 0.54rem;
      }
    }
  }
  .selected {
    color: #248bfd;
  }
}
</style>
