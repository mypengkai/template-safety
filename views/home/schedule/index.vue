<template>
  <div class="schedule">
    <!-- <h2>消息列表</h2> -->
    <headerTop :title="title"></headerTop>
    <ul>
      <li v-for="(item,index) in msgList" :key="index" @click="skip(item.type,item.receiverid)" :class="{complete:index==active}">
        <p>
          <i class="icon-alixiaoxi"></i>
        </p>
        <span>{{item.sendMsg}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
//import { pushmessage } from "@/api/request.js";
import headerTop from "@/components/headerTop.vue"
export default {
  components:{headerTop},
  data() {
    return {
      title:'消息列表',
      msgList: [],
      active:-1,
    };
  },
  created() {
    //this.getMessage();
  },
  methods: {
    dothis(index){
     this.active=index
    },
    getMessage() {
      pushmessage().then(res => {
        console.log(res.data.rows);
        this.msgList = res.data.rows;
      });
    },
    skip(flag, argu = "") {
      if (flag == "跳到质量计划列表") {
        this.$router.push({ path: "/planCheck" });
      } else if (flag == "跳到质量待我检查页面") {
        this.$router.push({ path: "/waitCheck" });
      } else if (flag == "跳到安全计划列表") {
        this.$router.push({ path: "/safetyplanCheck" });
      } else if (flag == "跳到安全待我检查页面") {
        this.$router.push({ path: "/safetywalitcheck" });
      } else if (flag == "跳计检列表") {
        this.$router.push({ path: "/check" });
      } else if (
        flag == "跳这条消息的整改列表" ||
        flag == "跳这条消息的处理页面"
      ) {
        this.$router.push({
          path: "/AuremeMenu",
          query: { id: argu.split(",")[0], sprid: argu.split(",")[1] }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>

.schedule {
  padding-top: 1rem;
  height: 100%;
  background: #fff;
  ul {
    padding: 1.2rem 0.2rem 0 0.2rem;
    li {
      position: relative;
      background-color: white;
      color: black;
      min-height: 1.4rem;
      font-size: 0.28rem;
      margin-bottom: 0.2rem;
      border-radius: 0.2rem;
      padding: 0.1rem;
      p {
        float: left;
        height: 1.2rem;
        width: 6%;
        line-height: 1.2rem;
        text-align: center;
        color: #2b79ed;
      }
      span{
        position: absolute;
        left: 10%;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 .2rem;
      }
    }
  }
}
.complete{
  background-color: #45b97c !important;
}
</style>
