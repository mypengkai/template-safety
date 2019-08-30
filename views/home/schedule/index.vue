<template>
  <div class="schedule">
    <headerTop :title="title"></headerTop>
    <ul>
      <li>
        <p>
          <span><i class="icon-alialarm-clock" style=""></i> 安全列表</span>
          <span>2019-08-27</span>
        </p>
        <p>
          <span>2019-08-27</span>&nbsp;&nbsp;
          <span>关于阿里巴巴iconfont的使用方法 iconfont网址:http:
            //www.iconfont.cn/...用户在iconfont.cn可以下载,多种格式的icon,平
            台也可将图标转换为字体,便于...</span>
        </p>
      </li>
            <li>
        <p>
          <span><i class="icon-alialarm-clock" style=""></i> 安全列表</span>
          <span>2019-08-27</span>
        </p>
        <p>
          <span>2019-08-27</span>&nbsp;&nbsp;
          <span>关于阿里巴巴iconfont的使用方法 iconfont网址:http:
            //www.iconfont.cn/...用户在iconfont.cn可以下载,多种格式的icon,平
            台也可将图标转换为字体,便于...</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
//import { pushmessage } from "@/api/request.js";
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
    //this.getMessage();
  },
  methods: {
    dothis(index) {
      this.active = index;
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
  background: #EAEDF4;
  ul {
    padding: 0.2rem 0.2rem 0 0.2rem;
    li { 
      background-color: white;
      border-radius: .2rem;
      padding: .2rem;
      font-size: .3rem;
      margin-bottom: .2rem;
      p {
        &:nth-child(1) {
          height: 0.5rem;
          border-bottom: 1px solid #ccc;
          margin-bottom: .2rem;
          span {
            &:nth-child(1) {
              float: left;
              i{
                color:#6ACCE3;
                background-color: #DBF2FF;
                display: inline-block;
                width: .4rem;
                height: .4rem;
                line-height: .4rem;
                text-align: center;
                border-radius: .1rem;
              }
            }
            &:nth-child(2) {
              float: right;
              color: #CACACA;
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
