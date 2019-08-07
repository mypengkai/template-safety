<template>
  <div class="safetyMenu">
    <headerTop :title="title">
         <span slot="topLeft" @click="routeBack">
              <yd-navbar-back-icon></yd-navbar-back-icon>
         </span>
    </headerTop>
    <div class="checkList">
      <span @click="safetyplanCheck">
        <div>
          <span>
            <i class="icon-alijihuaguanli"></i>
          </span>
        </div>
        <span>计划</span>
      </span>
      <span @click="Check">
        <div>
          <span>
            <i class="icon-alijiancha_o"></i>
          </span>
        </div>
        <span>计检</span>
      </span>
      <span @click="safetyzhengai">
        <div>
          <span>
            <i class="icon-alizhenggaicuoshi"></i>
          </span>
        </div>
        <span>整改</span>
      </span>
      <span @click="$router.push({path:'/safetySelfCheck'})">
        <div>
          <span>
           <i class="icon-aligerenxinxiicon-"></i>
          </span>
        </div>
        <span>自检</span>
      </span>
    </div>
    <div class="checkResult">
      <div @click="$router.push({path:'/safetywalitcheck'})">
        <i class="icon-alijianchazhibiao"></i>待我检查
        <span style="color:#F5A588;font-weight:700">({{jcnum}})</span>
      </div>
      <div @click="$router.push({path:'/safetyqualityReme',query:{auth:'2'}})">
        <i class="icon-alizhenggaijiancha"></i>待我整改
        <span style="color:#F5A588;font-weight:700">({{zgnum}})</span>
      </div>
      <div @click="$router.push({path:'/safetyqualityReme',query:{auth:'3'}})">
        <i class="icon-alijianchazhibiao"></i>待我复查
        <span style="color:#F5A588;font-weight:700">({{fhnum}})</span>
      </div>
      
    </div>
    <!-- <div class="addCheck">
      <div @click="addSafety">
        <div>
          <i class="icon-alixinzeng"></i>
        </div>
        <span>新增检查</span>
      </div>
    </div> -->
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";

import qs from "qs";
export default {
  components: {
    headerTop
  },
  data() {
    return {
      title: "安全",
      flag: true,
      zgnum: "", // 整改
      fhnum: "", // 复核
      jcnum: "" // 检查
    };
  },
  created() {
    //this.getAllinit();
  },
  methods: {
    // 回退
     routeBack(){
         this.$router.go(-1)
     },
 

    // 安全计划
    safetyplanCheck() {
      this.$router.push({ path: "/safetyplanCheck" });
    },
    Check() {
      this.$router.push({ path: "/safetycheck" });
    },
    //新增
    addSafety() {
         this.$router.push("/safetyzjAdd")
    },
    //整改
    safetyzhengai() {
      this.$router.push({ path: "/safetyqualityReme" });
    },

    // 初始化数据
    getAllinit() {
      safetyListAll("").then(res => {
        if (res.success == 0) {
          this.zgnum = res.rows[0].daizhenggai;
          this.fhnum = res.rows[0].daifuhe;
          this.jcnum = res.rows[0].daijiancha;
          if (
            this.zgnum == "" ||
            this.zgnum == null ||
            this.zgnum == "undefined"
          ) {
            this.zgnum = 0;
          }
          if (
            this.fhnum == "" ||
            this.fhnum == null ||
            this.fhnum == "undefined"
          ) {
            this.fhnum = 0;
          }
          if (
            this.jcnum == "" ||
            this.jcnum == null ||
            this.jcnum == "undefined"
          ) {
            this.jcnum = 0;
          }
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.safetyMenu {
  padding-top: 1rem;
  width: 100%;
  height: 100%;
}
/deep/.yd-back-icon {
  color: white !important;
}
/deep/.yd-navbar-center-title {
  color: white !important;
}
/deep/.yd-navbar {
  background-color: #248bfd !important;
}

.checkList {
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0 0.5rem;
  height: 1.6rem;
  margin-top: 0.2rem;
  span:nth-child(1) {
    display: inline-block;
    width: 25%;
    div {
      width: 100%;
      height: 1rem;
      line-height: 1.8rem;
      text-align: center;
      span {
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 0.9rem;
        background-color: #edf6fe;
      }
    }
    i {
      font-size: 1rem;
      color: #80c0e7;
    }
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
  span:nth-child(2) {
    display: inline-block;
    width: 25%;
    div {
      width: 100%;
      height: 1rem;
      line-height: 1.6rem;
      text-align: center;
      span {
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 0.9rem;
        background-color: #edf6fe;
      }
    }
    i {
      font-size: 0.8rem;
      color: #80c0e7;
    }
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
  span:nth-child(3) {
    display: inline-block;
    width: 25%;
    div {
      width: 100%;
      height: 1rem;
      line-height: 1.4rem;
      text-align: center;
      span {
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 0.9rem;
        background-color: #edf6fe;
      }
    }
    i {
      font-size: 0.5rem;
      color: #80c0e7;
    }
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
  span:nth-child(4) {
    display: inline-block;
    width: 25%;
    div {
      width: 100%;
      height: 1rem;
      line-height: 1.4rem;
      text-align: center;
      span {
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 0.9rem;
        background-color: #edf6fe;
      }
    }
    i {
      font-size: 0.52rem;
      color: #80c0e7;
    }
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
}
.checkResult {
  div {
    width: 5rem;
    height: 1rem;
    margin: 0.4rem auto;
    box-shadow: 1px 1px 1px 1px #ccc;
    text-align: left;
    line-height: 1rem;
    padding: 0 0.2rem;
    border-radius: 0.2rem;
    background: white;
    font-size: 14px;
    i {
      color: skyblue;
      margin-right: 5px;
    }
  }
}
.addCheck {
  height: 2.7rem;
  width: 100%;
  margin-top: 3rem;
  div {
    height: 100%;
    text-align: center;
    div {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 1.8rem;
      border: 0.1rem solid #a9e5fe;
      background-color: #48cafe;
      margin: 0 auto;
      line-height: 1.68rem;
      text-align: center;
      i {
        font-size: 1rem;
        color: white;
      }
    }
    span {
      display: inline-block;
      width: 2rem;
      height: 0.5rem;
      margin-top: 0.2rem;
      font-size: 0.25rem;
    }
  }
}
</style>





