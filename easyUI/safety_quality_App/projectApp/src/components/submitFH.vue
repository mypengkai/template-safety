<template>
  <div>
    <div class="zgList" v-for="(item,index) in contentData" :key="index">
      <p style="color:white;">{{xuhao+1}}</p>
      <ul>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>
            安全隐患&nbsp;
            <i style="background:#ffc300;padding:.02rem;">{{item.hdGrade}}</i>:
          </span>&nbsp;&nbsp;&nbsp;
          <span>{{item.spContent}}</span>
        </li>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>整改要求:</span>&nbsp;&nbsp;&nbsp;
          <span>{{item.srContent}}</span>
        </li>

        <xunhuanFH v-for="(con,lis) in item.Reply" :key="lis" :ConData="[con]" :xjID="BasicData.spid" :leng="(item.Reply.length-1)==lis"></xunhuanFH>
      </ul>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach.vue";
import xunhuanFH from "./xunhuanFH.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  props: ["contentData", "xuhao", "BasicData"],
  components: {
    Attach,
    xunhuanFH
  },
  data() {
    return {


    };
  },
  created(){
      console.log(this.contentData)
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.zgList {
  background-color: #ffc300;
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  p {
    width: 0.6rem;
    //   background-color: #ffc300;
    height: 100%;
    float: left;
    text-align: center;
  }
  ul {
    background-color: #fff;
    width: 92%;
    padding-left: 0.2rem;
    li {
      display: flex;
      padding: 0.2rem 0.1rem;
      padding-right: 0.3rem;
      align-items: center; //子元素垂直居中
      span {
        display: inline-block;

        &:nth-child(1) {
          flex: 0 0 28%;
          text-align: left;
        }
        &:nth-child(2) {
          flex: 0 0 72%;
          padding: 0.1rem;
        }
      }
      &:nth-child(8) {
        font-size: 0.28rem;
        font-weight: 600;
      }
    }
    .dialogue {
      li {
        display: flex;
        padding: 0.2rem 0.1rem;
        padding-right: 0.3rem;
        align-items: center; //子元素垂直居中
        &:nth-child(6) {
          display: flex;
          p {
            flex: 0 0 50%;
            button {
              width: 2rem;
              height: 0.8rem;
              color: white;
              font-size: 0.28rem;
              border-radius: 0.2rem;
              &:nth-child(1) {
                background-color: green;
              }
            }
          }
          p:nth-child(2) {
            button:nth-child(1) {
              background-color: red;
            }
          }
        }
        span {
          display: inline-block;

          &:nth-child(1) {
            flex: 0 0 28%;
            text-align: center;
          }
          &:nth-child(2) {
            flex: 0 0 72%;
            padding: 0.1rem;
          }
        }
      }
    }
    textarea {
      padding: 0.2rem;
      border-radius: 0.2rem;
      margin-left: 0.1rem;
      width: 6.2rem;
    }
  }
}
.imgFile {
  width: 100%;
  overflow: hidden;
  h6 {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    img {
      width: 1.2rem;
      height: 1.2rem;
      display: block;
    }
  }
}
</style>