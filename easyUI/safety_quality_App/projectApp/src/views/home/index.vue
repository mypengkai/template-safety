<template>
  <div class="home">
    <!-- 底部导航 -->
    <router-view></router-view>
    <footer>
      <yd-tabbar active-color="#2a5caa">
        <yd-tabbar-item title="消息" link="/schedule" :active="path=='#/schedule'" >
          <yd-icon name="weixin" slot="icon" size="0.54rem"></yd-icon>
          <yd-badge slot="badge" type="danger">{{leng}}</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="工作台" link="/dashboard" :active="path=='#/dashboard'">
          <yd-icon name="compose" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="组织机构" link="/contacts" :active="path=='#/contacts'">
          <yd-icon name="share1" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人信息" link="/information" :active="path=='#/information'">
          <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
      </yd-tabbar>
    </footer>
  </div>
</template>
<script>
import { pushmessage } from "@/api/request.js";
export default {
  data() {
    return {
      index: 2,
      leng:'',
      path:''
    };
  },
  created() {
    this.getMessage()
  },
  updated() {
    // 路由切换时选中对应的导航栏高亮
   this.path = window.location.hash;
  },
  mounted() {
    // 保存选中的高亮状态，避免刷新时状态丢失
    this.index = sessionStorage.getItem("active");
  },
  methods: {
    getMessage() {
      pushmessage().then(res => {
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
