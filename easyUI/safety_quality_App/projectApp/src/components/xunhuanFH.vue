<template>
  <div>
    <div class="dialogue" v-for="(con,lis) in ConData" :key="lis">
      <li>
        <span>附件:</span>
        <div class="imgFile">
          <h6>
            <viewer :images="con.files2">
              <img v-for="(src,index) in con.files2" :src="fileURL+ src.FilePath" :key="index" />
            </viewer>
          </h6>
        </div>
      </li>
      <li style="border-bottom: 1px dashed #ccc;">
        <span>{{con.replayType==0?"整改结果:":"复核结果:"}}</span>&nbsp;&nbsp;&nbsp;
        <span style="color:#71ACED">{{con.replayContent}}</span>
      </li>
      <li>
        <span>整改完成时间:</span>&nbsp;&nbsp;&nbsp;
        <span>{{con.replayDateTime}}</span>
      </li>
      <li>
        <span style="text-align:left;">整改人:</span>&nbsp;&nbsp;&nbsp;
        <span>{{con.replayUserName}}</span>
      </li>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach.vue";
import { selfCheck, submitResult, safetyAddResult } from "@/api/request.js";
export default {
  props: ["ConData"],
  components: {
    Attach
  },
  data() {
    return {
      flag: true
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.ConData.forEach(element => {
        //console.log(element)
        if (
          this.username == this.xjID.spCheckUserName &&
          element.replayType == 0
        ) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
    });
  },

  methods: {

  }
};
</script>
<style lang="less" scoped>
.dialogue {
  li {
    display: flex;
    padding: 0.2rem 0.1rem;
    padding-right: 0.3rem;
    align-items: center; //子元素垂直居中
    span {
      &:nth-child(1) {
        text-align: left !important;
      }
    }
    &:nth-child(5) {
      display: flex;
      p {
        flex: 0 0 50%;
        padding-left: 0.5rem;
        button {
          width: 2rem;
          height: 0.8rem;
          color: white;
          font-size: 0.28rem;
          border-radius: 0.2rem;
          &:nth-child(1) {
            background-color: #00a6ac;
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

.imgFile {
  width: 100%;
  overflow: hidden;
  h6 {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    overflow: hidden;
    img {
      width: 1.2rem;
      height: 1.2rem;
      display: block;
    }
  }
}
/deep/.att_num_tip {
  padding-left: 0 !important;
}
</style>