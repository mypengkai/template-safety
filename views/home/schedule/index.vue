<template>
  <div class="schedule">
    <headerTop :title="title"></headerTop>
    <ul style="margin-bottom:1.3rem;">
      <router-link tag="li" to="/safetySelfZG" v-for="(item,index) in msgList" :key="index" @click.native="del(item)">
        <p>
          <span>
            <i class="icon-alialarm-clock" style></i> 安全列表
          </span>
          <!-- <span>{{item.createTime}}</span> -->
        </p>
        <p>
          <span>
            {{item.sendMsg}}
          </span>
        </p>
      </router-link>
    </ul>
    
  </div>
</template>
<script>
import { pushmessage,delMessage } from "@/api/request.js";
import headerTop from "@/components/headerTop.vue";
export default {
  components: { headerTop },
  data() {
    return {
      title: "消息列表",
      msgList: [],
      active: -1
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
    dothis(index) {
      this.active = index;
    },
    del(item){
      console.log(item.id)
      delMessage({id:item.id}).then(res=>{
        console.log(res)
      })
    },
    getMessage() {
      pushmessage().then(res => {
        console.log(res.data.rows)
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
  // height: 100%;
  background: #eaedf4;
  ul {
    padding: 0.2rem ;
    background: #eaedf4;
    li {
      background-color: white;
      border-radius: 0.2rem;
      padding: 0.2rem;
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
      p {
        &:nth-child(1) {
          height: 0.5rem;
          border-bottom: 1px solid #ccc;
          margin-bottom: 0.2rem;
          span {
            &:nth-child(1) {
              float: left;
              i {
                color: #6acce3;
                background-color: #dbf2ff;
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
                line-height: 0.4rem;
                text-align: center;
                border-radius: 0.1rem;
              }
            }
            &:nth-child(2) {
              float: right;
              color: #cacaca;
            }
          }
        }
      }
    }
  }
}
.complete {
  background-color: #45b97c !important;
}
</style>
