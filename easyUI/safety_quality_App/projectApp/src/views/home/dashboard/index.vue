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
        <span>{{weaterList.week}}</span>
        <span>{{weaterList.date | formDate}}</span>
        <span>{{weaterList.wea}}</span>
        <span>{{weaterList.tem2}}~{{weaterList.tem1}}</span>
        <span>{{win}}&nbsp;{{weaterList.win_speed}}</span>
      </div>
    </div>
    <div class="tabBar">
      <ul>
        <!-- <li @click="managerPage">
          <p class="icon-alirenwu"></p>
          <span style="font-size:10px">任务</span>
        </li>-->
        <!-- <li @click="qualityPage">
          <p class="icon-alicaozuozhiliang"></p>
          <span style="font-size:10px">质量</span>
        </li>-->
        <li @click="safetyPage">
          <p class="icon-alianquanfanghu"></p>
          <span style="font-size:10px">安全巡检</span>
        </li>
        <!-- <li>
          <p class="icon-alicebianlanxunjianjilu"></p>
          <span style="font-size:10px">巡检</span>
        </li>-->
      </ul>
    </div>
    <div class="conent">
      <p>
        <span class="icon-alirenwu"></span>&nbsp;&nbsp;我的任务
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
    <!-- 质量 -->
    <div class="safety">
      <div class="safetyTop">
        <h3 style="float: left;">
          <span class="icon-alicaozuozhiliang"></span>&nbsp;&nbsp;待办事项
        </h3>
      </div>
      <ul class="commission">
        <li @click="$router.push({path:'/safetySelfZG'})">待整改({{ZGFH.rectificationcount}})</li>
        <li @click="$router.push({path:'/safetySelfFH'})">待复核({{ZGFH.replycount}})</li>
      </ul>
    </div>
    <!-- 安全 -->
    <!-- <div class="safety">
      <div class="safetyTop">
        <h4>
          <span class="icon-alianquanfanghu"></span>&nbsp;&nbsp;安全
        </h4>
      </div>
      <div class="safetyConent">
        <div class="safetyConentLeft">
          <qCaty></qCaty>
        </div>
        <div class="safetyConentRight">
          <h3>
            <span></span>总计划
          </h3>
          <ul>
            <li>
              <span></span>
              未开始({{safetyList.wkscount}})
            </li>
            <li>
              <span></span>
              已完成({{safetyList.ywccount}})
            </li>
          </ul>
        </div>
      </div>
      <div class="safetyFoot">
        <h3>
          <span></span>整改单
        </h3>
        <div class="progressbar">
          <ul>
            <li>
              <p>进行中({{safetyList.zgjxzcount}})</p>
              <p>
                <yd-progressbar
                  type="line"
                  :progress="safetyjxzjd"
                  trail-width="4"
                  trail-color="#57b6fe"
                ></yd-progressbar>
              </p>
            </li>
            <li>
              <p>逾期({{safetyList.yuqicount}})</p>
              <p>
                <yd-progressbar
                  type="line"
                  :progress="safetyyuqijd"
                  trail-width="4"
                  trail-color="#FE5D51"
                ></yd-progressbar>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <div style="height:1.4rem; opacity: 0;"></div>
  </div>
</template>
<script>
import caky from "@/components/echarts/caky.vue";
import qCaty from "@/components/echarts/qCaty.vue";
import headerTop from "@/components/headerTop";
import axios from "axios";
import $ from "jquery";
import { getNum, getYinhuan } from "@/api/request.js";
//import { safeExchart, qualityExchart, renwuAll } from "@/api/request.js";
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
      cityname: "",
      cityid: "",
      win: "", // 风向
      weaterList: {}, // 天气
      yinhuan:{}, // 统计隐患数
      ZGFH:{} // 整改复核的数量
    };
  },
  filters: {
    // 过滤年份
    formDate(val) {
      var value = new Date(val);
      var year = value.getFullYear();
      var month =
        value.getMonth() + 1 > 9
          ? `${value.getMonth() + 1}`
          : `0${value.getMonth() + 1}`;
      var day =
        value.getDate() > 9 ? `${value.getDate()}` : `0${value.getDate()}`;
      return month + "-" + day;
    }
  },
  created() {
    this.cityid = localStorage.getItem("cid");
    //this.safetyInit();
    //this.qualityInit();
    //this.renwuInit();
    this.initweater();
    this.getNum()
    this.getYinhuan()
  },
  methods: {
    // 获取整改复核数量
    getNum(){
      getNum({monthDate:''}).then(res => {
        console.log(res)
        this.ZGFH=res.rows[0]
      })
    },
    //统计隐患数
    getYinhuan(){
      getYinhuan({monthDate:''}).then(res => {
        console.log(res)
        this.yinhuan=res.rows[0]
      })
    },
    // 城市天气
    initweater() {
      var that = this;
      $.ajax({
        type: "get",
        url: "https://www.tianqiapi.com/api/?version=v1&cityid=" + that.cityid,
        dataType: "jsonp",
        success: function(res) {
          if (res.data && res.data.length >= 0) {
            that.weaterList = res.data[0];
            if (that.weaterList.win && that.weaterList.win.length >= 0) {
              that.win = that.weaterList.win[0];
            }
          }
        }
      });
    },

    safetyPage() {
      // 安全页面跳转
      this.$router.push({ path: "/safetyMenu" });
    },
    managerPage() {
      // 任务页面
      this.$router.push({ path: "/manager" });
    },
    // 质量
    qualityPage() {
      this.$router.push({ path: "/menu" });
    },
    safetyInit() {
      // 安全
      safeExchart().then(res => {
        if (res.success == 0) {
          if (res.rows && res.rows.length >= 0) {
            this.safetyList = res.rows[0];
            if (Number(res.rows[0].zgzcount) > 0) {
              this.safetyyuqijd =
                Number(res.rows[0].yuqicount) / Number(res.rows[0].zgzcount);
              this.safetyjxzjd =
                Number(res.rows[0].zgjxzcount) / Number(res.rows[0].zgzcount);
            } else {
              this.safetyyuqijd = 0;
              this.safetyjxzjd = 0;
            }
          }
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    },
    qualityInit() {
      // 质量
      qualityExchart().then(res => {
        if (res.success == 0) {
          if (res.rows && res.rows.length >= 0) {
            this.qualityList = res.rows[0];
            if (Number(res.rows[0].zgzcount) > 0) {
              this.qualityyuqijd =
                Number(res.rows[0].yuqicount) / Number(res.rows[0].zgzcount);
              this.qualityjxzjd =
                Number(res.rows[0].zgjxzcount) / Number(res.rows[0].zgzcount);
            } else {
              this.qualityyuqijd = 0;
              this.qualityjxzjd = 0;
            }
          }
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    },
    // 计划
    renwuInit() {
      renwuAll().then(res => {
        if (res.success == 0) {
          if (res.rows && res.rows.length >= 0) {
            this.data = res.rows[0];
          }
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
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
        width: 100% !important;
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
              from(#dec674),
              to(#fcaf17)
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
        font-size: 0.3rem;
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
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              margin: 0 auto;
              background: -webkit-gradient(
                linear,
                0 0,
                100% 0,
                from(#f8ba1c),
                to(#fde428)
              );
              color: white;
              p {
                height: 0.6rem;
                line-height: 0.6rem;
                font-size: 0.4rem;
              }
              h5 {
                font-size: 0.24rem;
              }
            }
          }
          &:nth-child(2) {
            div {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              margin: 0 auto;
              background: -webkit-gradient(
                linear,
                0 0,
                100% 0,
                from(#40d2df),
                to(#12e8b5)
              );
              color: white;
              p {
                height: 0.6rem;
                line-height: 0.6rem;
                font-size: 0.4rem;
              }
              h5 {
                font-size: 0.24rem;
              }
            }
          }
          &:nth-child(3) {
            div {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              margin: 0 auto;
              background: -webkit-gradient(
                linear,
                0 0,
                100% 0,
                from(#fe4f54),
                to(#fd7a61)
              );
              color: white;
              p {
                height: 0.6rem;
                line-height: 0.6rem;
                font-size: 0.4rem;
              }
              h5 {
                font-size: 0.24rem;
              }
            }
          }
          &:nth-child(4) {
            div {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              margin: 0 auto;
              background: -webkit-gradient(
                linear,
                0 0,
                100% 0,
                from(#bed742),
                to(#7fb80e)
              );
              color: white;
              p {
                height: 0.6rem;
                line-height: 0.6rem;
                font-size: 0.4rem;
              }
              h5 {
                font-size: 0.24rem;
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
    .commission {
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
          background: -webkit-gradient(
            linear,
            0 0,
            0 100%,
            from(#dec674),
            to(#45b97c)
          );
        }
        &:nth-child(2) {
          background: -webkit-gradient(
            linear,
            0 0,
            0 100%,
            from(#fcaf17),
            to(#f3715c)
          );
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
        width: 40%;
      }
      .safetyConentRight {
        float: right;
        width: 60%;
        h3 {
          font-size: 14px;
          font-weight: 400;
          margin-left: 1rem;
          height: 0.6rem;
          span {
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            background: red;
            margin: 0 0.1rem;
          }
        }
        ul {
          margin-left: 1.5rem;
          li {
            // font-size: 0.24rem;
            height: 0.45rem;
            &:nth-child(1) {
              span {
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                border-radius: 50%;
                background: #b36d41;
                margin: 0 0.1rem;
              }
            }
            &:nth-child(2) {
              span {
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                border-radius: 50%;
                background: #4cd2df;
                margin: 0 0.1rem;
              }
            }
            &:nth-child(3) {
              span {
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                border-radius: 50%;
                background: #b4dd70;
                margin: 0 0.1rem;
              }
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