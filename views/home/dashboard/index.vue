<template>
  <div class="dashboard">
    <headerTop :title="title">
      <!-- <span slot="topLeft">返回</span> -->
      <!-- <span slot="topRight">
        <i class="icon-aliarrow-right-"></i>
      </span>-->
    </headerTop>
    <div class="header">
      <!-- 轮播 -->
      <yd-slider pagination-color="#fff" style="height:2.3rem;">
        <yd-slider-item>
          <img src="../../../assets/img/swiper.jpg" />
        </yd-slider-item>
        <yd-slider-item>
          <img src="../../../assets/img/swiper.jpg" />
        </yd-slider-item>
        <yd-slider-item>
          <img src="../../../assets/img/swiper.jpg" />
        </yd-slider-item>
      </yd-slider>
      <!-- 天气 -->
      <div class="weather">
        <iframe
          width="280"
          scrolling="no"
          height="25"
          frameborder="0"
          allowtransparency="true"
          src="http://i.tianqi.com/index.php?c=code&id=34&icon=1&num=3"
        ></iframe>
      </div>
    </div>
    <div class="tabBar">
      <ul>
        <li @click="safetyPage">
          <p class="icon-alianquanfanghu"></p>
          <span style="font-size:10px">自主巡检</span>
        </li>
        <li @click="$router.push({path:'/safetyPlanMenu'})">
          <p class="icon-alicebianlanxunjianjilu"></p>
          <span style="font-size:10px">计划巡检</span>
        </li>
        <li @click="openConfrim()">
          <p class="icon-alicaozuozhiliang"></p>
          <span style="font-size:10px">会议签到</span>
        </li>
      </ul>
    </div>
    <div class="conent">
      <p>
        <span class="icon-alirenwu"></span>&nbsp;&nbsp;隐患数量
      </p>
      <yd-tab horizontal-scroll>
        <div class="contation">
          <ul>
            <li>
              <div>
                <p>{{yinhuan.hiddencount}}</p>
                <span style="font-size:10px">发现隐患</span>
              </div>
            </li>
            <li>
              <div>
                <p>{{yinhuan.solvecount}}</p>
                <span style="font-size:10px">已消除隐患</span>
              </div>
            </li>
            <li>
              <div>
                <p>{{yinhuan.Overduecount}}</p>
                <span style="font-size:10px">逾期隐患</span>
              </div>
            </li>
            <li>
              <div>
                <p>{{yinhuan.unsolvedcount}}</p>
                <span style="font-size:10px">未消除隐患</span>
              </div>
            </li>
          </ul>
        </div>
      </yd-tab>
    </div>
    <!-- 待办事项 -->
    <div class="safety">
      <div class="safetyTop">
        <p style="float: left;">
          <span class="icon-alicaozuozhiliang"></span>&nbsp;&nbsp;待办事项
        </p>
      </div>
      <ul class="commission">
        <li @click="$router.push({path:'/safetySelfZG'})">待整改({{ZGFH.rectificationcount}})</li>
        <li @click="$router.push({path:'/safetySelfFH'})">待复核({{ZGFH.replycount}})</li>
      </ul>
    </div>
    <!-- 安全 -->
    <div class="safety">
      <div class="safetyTop">
        <p style="float: left;">
          <span class="icon-alianquanfanghu"></span>&nbsp;&nbsp;发现隐患等级对比
        </p>
      </div>
      <div class="safetyConent">
        <div class="safetyConentLeft">
          <qCaty @setNumber="getNumber"></qCaty>
        </div>
        <div class="safetyConentRight">
          <ul>
            <li>
              <span>总数&nbsp;&nbsp;：({{hideenList.zong}})</span>
            </li>
            <li>
              <span>Ⅰ级：&nbsp;&nbsp;({{hideenList.one}})</span>
            </li>
            <li>
              <span>Ⅱ级：&nbsp;&nbsp;({{hideenList.tow}})</span>
            </li>
            <li>
              <span>Ⅲ级：&nbsp;&nbsp;({{hideenList.three}})</span>
            </li>
            <li>
              <span>Ⅳ级：&nbsp;&nbsp;({{hideenList.four}})</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div style="height:1.4rem; opacity: 0;"></div>
  </div>
</template>
<script>
import caky from "@/components/echarts/caky.vue";
import qCaty from "@/components/echarts/qCaty.vue";
import headerTop from "@/components/headerTop";
import { getNum, getYinhuan, signIn } from "@/api/request.js";

export default {
  components: {
    headerTop,
    caky,
    qCaty
  },
  data() {
    return {
      title: "上海同望信息技术有限公司",
      flag: false,
      flags: false,
      safetyList: [], // 安全
      safetyyuqijd: 0, // 逾期进度
      safetyjxzjd: 0, // 进行中进度
      qualityList: [], // 质量
      qualityyuqijd: 0,
      qualityjxzjd: 0,
      data: {}, // 计划
      yinhuan: {}, // 统计隐患数
      ZGFH: {}, // 整改复核的数量
      hideenList: {}, // 隐患
      sign: {
        userid: "",
        meetingid: ""
      }
    };
  },
  created() {
    this.getNum();
    this.getYinhuan();
  },
  mounted() {
    if (this.sign.meetingid) {
      this.openCustomConfrim();
    }
  },
  methods: {
    openConfrim() {
      this.$dialog.confirm({
        mes: "即将调用设备摄像头！",
        opts: () => {
          this.$router.push({ path: "/Barcode" });
        }
      });
    },
    openCustomConfrim() {
      this.$dialog.confirm({
        title: "签到",
        mes: "会议签到！",
        opts: [
          {
            txt: "取消",
            color: false,
            callback: () => {
              this.sign.meetingid = "";
            }
          },
          {
            txt: "确定",
            color: true,
            callback: () => {
              signIn(this.sign).then(res => {
                if (res.success == 0) {
                  this.$dialog.toast({
                    mes: "签到成功!",
                    timeout: 1000
                  });
                } else {
                  this.$dialog.toast({
                    mes: "签到失败!!!",
                    timeout: 1000
                  });
                }
              });
            }
          }
        ]
      });
    },

    // 获取整改复核数量
    getNum() {
      getNum({ monthDate: "" }).then(res => {
        this.ZGFH = res.rows[0];
      });
    },
    //统计隐患数
    getYinhuan() {
      getYinhuan({ monthDate: "" }).then(res => {
        this.yinhuan = res.rows[0];
      });
    },
    getNumber(data) {
      this.hideenList = data;
    },
    safetyPage() {
      // 安全页面跳转
      this.$router.push({ path: "/safetyMenu" });
    },
    managerPage() {
      // 任务页面
      this.$router.push({ path: "/manager" });
    },
    // 会议
    qualityPage() {
      this.$router.push({ path: "/menu" });
    },
    // 计划
    renwuInit() {
      renwuAll().then(res => {
        if (res.success == 0) {
          if (res.rows && res.rows.length >= 0) {
            this.data = res.rows[0];
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.yd-slider {
  border-radius: 0.3rem;
}
.dashboard {
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  .header {
    background-color: rgb(255, 255, 255);
    padding: 0 0.2rem;
    padding-top: 0.2rem;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    margin-top: 0.2rem;
    /deep/.yd-slider-pagination-item-active {
      border-radius: 100px;
    }
    a {
      border-radius: 0.3rem;
    }
    img {
      border-radius: 0.3rem;
    }
    .weather {
      margin-top: 0.3rem;
      padding-bottom: 0.2rem;
      span {
        font-weight: 600;
        padding: 0.1rem 0.1rem;
        &:nth-child(1) {
          font-size: 0.3rem;
        }
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          font-size: 0.28rem;
        }
      }
    }
  }
  /deep/.tabBar {
    margin-top: 0.12rem;
    background: #fff;
    text-align: center;
    padding: 0.1rem 0;
    border-radius: 0.2rem;
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 33.33% !important;
        &:nth-child(1) {
          p {
            margin: 0 auto;
            width: 1rem;
            height: 1rem;
            line-height: 0.9rem;
            border-radius: 40%;
            font-size: 0.6rem;
            padding: 0.1rem;
            color: white;
            background: -webkit-gradient(
              linear,
              0 0,
              0 100%,
              from(#2a5caa),
              to(#2a82e4)
            );
          }
        }
        &:nth-child(2) {
          p {
            margin: 0 auto;
            width: 1rem;
            height: 1rem;
            line-height: 0.8rem;
            border-radius: 40%;
            font-size: 0.6rem;
            padding: 0.1rem;
            color: white;
            background: -webkit-gradient(
              linear,
              0 0,
              0 100%,
              from(#6a6da9),
              to(#426ab3)
            );
          }
        }
        &:nth-child(3) {
          p {
            margin: 0 auto;
            width: 1rem;
            height: 1rem;
            line-height: 0.8rem;
            border-radius: 40%;
            font-size: 0.6rem;
            padding: 0.1rem;
            color: white;
            background: -webkit-gradient(
              linear,
              0 0,
              0 100%,
              from(#6a6da9),
              to(#426ab3)
            );
          }
        }
        h6 {
          font-weight: normal;
          color: #333;
        }
      }
    }
  }
  .conent {
    margin-top: 0.12rem;
    background: #fff;
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
    > p {
      font-size: 14px;
      font-weight: 400;
      height: 0.6rem;
      border-bottom: 0.01rem solid #ccc;
      span {
        background-color: yellowgreen;
        font-size: 0.4rem;
        color: white;
        border-radius: 30%;
      }
    }
    /deep/.yd-tab-nav {
      position: relative;
      z-index: 0;
      width: 100% !important;
      text-align: center;
      li {
        font-size: 14px !important;
      }
    }
    /deep/.yd-tab-nav-scoll .yd-tab-nav .yd-tab-nav-item {
      display: inline-block;
      width: 33%;
    }
    /deep/.yd-tab-nav .yd-tab-active:before {
      content: "";
      width: 70%;
      height: 2px;
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-left: -35%;
      z-index: 4;
      font-size: 14px;
    }
    .contation {
      margin-top: 0.2rem;
      > ul {
        text-align: center;
        overflow: hidden;
        > li {
          width: 25%;
          float: left;
          &:nth-child(1) {
            div {
              height: 1rem;
              border-radius: 0.2rem;
              width: 1.5rem;
              margin: 0 auto;
              background: #00cc99;
              color: white;
              p {
                height: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.36rem;
              }
            }
          }
          &:nth-child(2) {
            div {
              height: 1rem;
              width: 1.5rem;
              border-radius: 0.2rem;
              margin: 0 auto;
              background: #00cc99;
              color: white;
              p {
                height: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.36rem;
              }
            }
          }
          &:nth-child(3) {
            div {
              height: 1rem;
              width: 1.5rem;
              border-radius: 0.2rem;
              margin: 0 auto;
              background: #ff6600;
              color: white;
              p {
                height: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.36rem;
              }
            }
          }
          &:nth-child(4) {
            div {
              height: 1rem;
              width: 1.5rem;
              border-radius: 0.2rem;
              margin: 0 auto;
              background-color: #ffcc32;
              color: white;
              p {
                height: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.36rem;
              }
            }
          }
        }
      }
    }
  }
  .safety {
    position: relative;
    margin-top: 0.12rem;
    background: #fff;
    padding: 0.1rem 0.2rem;
    overflow: hidden;
    border-radius: 0.2rem;
    .safetyTop {
      border-bottom: 1px solid #ccc;

      p {
        font-size: 14px;
        span {
          background-color: yellowgreen;
          color: #fff;
          font-size: 0.38rem;
          border-radius: 0.1rem;
        }
      }
    }
    .commission {
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-around;
      li {
        width: 40%;
        color: white;
        float: left;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        border-radius: 0.2rem;
        font-size: 0.3rem;
        &:nth-child(1) {
          background-color: #ffcc32;
        }
        &:nth-child(2) {
          background: #00cc99;
        }
      }
    }
    button {
      width: 2rem;
      height: 0.6rem;
      border: 1px solid skyblue;
      border-radius: 20px;
      margin-left: 35%;
      color: skyblue;
      margin-top: 0.2rem;
    }
    i {
      display: inline-block;
      width: 0.2rem;
      height: 2px;
      background: blue;
      margin-left: 47%;
    }
    .safetyTop {
      overflow: hidden;
      height: 0.6rem;
      line-height: 0.6rem;
      h3 {
        &:nth-child(1) {
          font-size: 0.28rem;
          font-weight: 600;
        }
      }
      p {
        float: right;
      }
    }
    .safetyConent {
      overflow: hidden;
      .safetyConentLeft {
        float: left;
        width: 50%;
      }
      .safetyConentRight {
        float: right;
        width: 50%;
        ul {
          li {
            font-size: 0.3rem;
            height: 0.45rem;
            &:nth-child(1) {
              span {
                color: #2a82e4;
              }
              margin-left: 0.8rem;
            }
            &:nth-child(2) {
              span {
                color: #00ae9d;
              }
              margin-left: 0.8rem;
            }
            &:nth-child(3) {
              span {
                color: #b2d235;
              }
              margin-left: 0.8rem;
            }
            &:nth-child(4) {
              span {
                color: #f47920;
              }
              margin-left: 0.8rem;
            }
            &:nth-child(5) {
              span {
                color: #d71345;
              }
              margin-left: 0.8rem;
            }
          }
        }
      }
    }
    .safetyFoot {
      h3 {
        font-size: 14px;
        font-weight: 400;
        margin-top: 0.2rem;
        span {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          background: red;
          margin: 0 0.1rem;
        }
      }
    }
  }
  .progressbar {
    ul {
      li {
        overflow: hidden;
        p {
          height: 0.6rem;
          line-height: 0.6rem;

          &:nth-child(1) {
            width: 20%;
            float: left;
            font-size: 0.24rem;
          }
          &:nth-child(2) {
            width: 80%;
            float: right;
          }
        }
      }
    }
  }
}
</style>