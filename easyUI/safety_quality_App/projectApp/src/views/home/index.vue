<template>
  <div class="home">
    <!-- 底部导航 -->
    <router-view></router-view>
    <footer>
      <router-link
        id="routerCheck"
        :class="{selected:index == active}"
        :to="item.path"
        v-for="(item,index) in navList"
        :key="index"
        @click.native="go(index)"
      >
        <p>
          <i :class="item.icon"></i>
        </p>
        <p>{{item.title}}</p>
      </router-link>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      navList: [
        { path: "/schedule", icon: "icon-aliicon--", title: "消息"},
        { path: "/dashboard", icon: "icon-aligongzuotai", title: "工作台" },
        {
          path: "/contacts",
          icon: "icon-alizuzhijigou",
          title: "组织机构"
        },
        {
          path: "/information",
          icon: "icon-aligerenxinxiicon-",
          title: "个人信息"
        }
      ]
    };
  },
  updated() {         // 路由切换时选中对应的导航栏高亮
    let test = window.location.hash; 
    //console.log(this.$router.options.routes)  获取所有路由文件
    if (test === "#/schedule") {
      this.active = 0;
    }
    if (test === "#/dashboard") {
      this.active = 1;
    }
    if (test === "#/contacts") {
      this.active = 2;
    }
    if (test === "#/information ") {
      this.active = 3;
    }
  },
  mounted() {        // 保存选中的高亮状态，避免刷新时状态丢失
     this.active = sessionStorage.getItem("active");
  },
  methods: {
    go(index) {
      this.active = index;
      sessionStorage.setItem("active", this.active);      
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
