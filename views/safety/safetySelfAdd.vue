<template>
  <div class="safetySelfAdd">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <div class="addConent">
      <div class="addTop">
        <p class="icon-aliwocanyude">&nbsp;&nbsp;基础信息</p>
        <ul>
          <li>巡检名称：AQJC20190808-001</li>
          <li>所属部门：安质部</li>
          <li>巡检位置：大桥</li>
          <li>检查性质：自检</li>
          <li>检查人：韩信</li>
          <li>检查时间：2019-08-08 10:10:20</li>
        </ul>
      </div>
      <div class="addFoot">
        <p class="icon-alishapes-">&nbsp;&nbsp;巡检内容</p>
        <div class="conentList">
          <ul>
            <li>序号</li>
            <li>安全巡检内容</li>
            <li>安全等级</li>
            <li>巡检结果</li>
          </ul>
          <!-- 动态组件 -->
          <!-- :currentIndex="index" -->
          <!-- v-for="(item,index) in newArray" :key="index" -->

          <!-- <div ref="mychild" class="comChild">
             <resultCopy ref="childUpload"></resultCopy>
          </div>-->

          <!-- ================================================================================== -->
          <div ref="mychild" class="resultCopy">
            <div class="childrenConent" v-for="(item,index) in this.dangerItems" :key="index">
              <div class="rowConent">
                <ol
                  class="clearfix"
                  :class="{move:candelete.id==item.id}"
                  @touchstart="touchStart(item)"
                  @touchend="touchEnd(item)"
                >
                  <li>{{index+1}}</li>
                  <li>{{item.hdName}}</li>
                  <li>{{item.hdGrade}}</li>
                  <li>
                    <radio @setValue="getValue"></radio>
                  </li>
                </ol>
                <div class="del" @click="deleteItem(index)" v-if="ifFlag && checkId===item.id">删除</div>
              </div>
              <div class="AttachBox">
                <Attach
                  :attachList="fileList.files"
                  :delAttachList="delProgressList"
                  :readonly="false"
                  :sourceType="3"
                ></Attach>
              </div>
            </div>
          </div>
          <!-- ================================================================================ -->
          <div class="iconButton" @click="AddCheck">
            <i class="icon-alixinzeng"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="addCoentFoot">
      <yd-cell-group>
        <yd-cell-item arrow type="link" href="/setCopy">
          <yd-icon slot="icon" name="ucenter" size=".42rem"></yd-icon>
          <span slot="left">通知人</span>
          <span slot="right">请选择</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button size="large" type="primary" @click="addInspection">保存</yd-button>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
import resultCopy from "@/components/resultCopy.vue";
import Attach from "@/components/Attach.vue";
import radio from "@/components/radio.vue";
import Vue from "vue";
import { mapGetters } from "vuex";
import { addSafety } from "@/api/request.js";
export default {
  name: "safetySelfAdd",
  components: {
    headerTop,
    resultCopy,
    Attach,
    radio
  },
  data() {
    return {
      title: "自主检查",
      ifFlag: false,
      checkId: "", // 选中项的id
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {}, // 滑动的item
      delProgressList: [],
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
      formData:{
          departId:'',   // 部门id
          projectId:'',  // 分部分项id
          spCheckUserId:'',  // 检查人id
          spNotifier:'',     // 通知人id
          NewResultVo:[      // list数据
              {
                sphdid:'',   // 隐患id
                spContent:'', // 隐患名称
                hdGrade:'',   // 隐患等级
                sprState:'',  // 状态（0安全，1有隐患）
                fileId:'',    // 文件成功返回id
              }
          ]
      } ,
     
      newArray: 0
    };
  },
  computed: {
    ...mapGetters(["dangerItems"])
  },
  updated() {},
  mounted() {
    //console.log(this.$refs.mychild.children, "ref");
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    //点击添加检查
    AddCheck() {
      this.$router.push({ path: "/danger" });

      //this.newArray++;
      //  var Profile = Vue.extend(resultCopy)
      //  console.log(Profile)
      //  var component = new Profile().$mount()
      //  document.querySelector(".comChild").appendChild(component.$el);
    },
    deleteItem(index) {
      this.array.splice(index, 1);
      // splice方法是删除数组某条数据，或者向某个位置添加数据
    },
    touchStart(item) {
      let touchs = event.changedTouches[0];
      // 记录开始滑动的鼠标位置
      this.clientNum.x1 = touchs.pageX;
      this.candelete = {};
    },
    getValue(data) {
      console.log(data);
    },
    touchEnd(item, index) {
      let touchs = event.changedTouches[0];
      // 记录结束滑动的鼠标位置
      this.clientNum.x2 = touchs.pageX;
      this.candelete = {};
      // 判断滑动距离大于50，判定为滑动成功，否则失败
      if (
        this.clientNum.x2 < this.clientNum.x1 &&
        Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50
      ) {
        this.ifFlag = true;
        this.checkId = item.id;
        event.preventDefault();
        this.candelete = item;
      } else if (
        this.clientNum.x2 > this.clientNum.x1 &&
        Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
      ) {
        this.ifFlag = false;
        event.preventDefault();
        this.candelete = {};
      }
    },
    // 保存
    addInspection() {}
  }
};
</script>
<style lang="less" scoped>
.safetySelfAdd {
  height: 100%;
  background: #fff;
  padding-top: 1rem;
  .addConent {
    padding: 0.2rem;
    .addTop {
      line-height: 0.6rem;
      margin-bottom: 0.2rem;
      p {
        margin-left: 0.4rem;
        font-weight: bold;
        font-size: 0.3rem;
      }
      ul {
        border: 1px solid #ccc;
        li {
          margin-left: 0.8rem;
        }
      }
    }
    .addFoot {
      margin-bottom: 0.2rem;
      p {
        margin-left: 0.4rem;
        line-height: 0.6rem;
        font-weight: bold;
        font-size: 0.3rem;
      }
      .conentList {
        border: 1px solid #ccc;
        ul {
          overflow: hidden;
          margin: 0.2rem;
          font-weight: bold;
          text-align: center;
          li {
            float: left;
            &:nth-child(1) {
              width: 10%;
            }
            &:nth-child(2) {
              width: 50%;
            }
            &:nth-child(3) {
              width: 20%;
            }
            &:nth-child(4) {
              width: 20%;
            }
          }
        }
        .resultCopy {
          overflow-x: hidden;
        }
        .childrenConent {
          border-top: 1px solid #ccc;
          .rowConent {
            position: relative;
            transform: translateX(0);
            transition: all 0.3s; /*滑动效果更生动*/
          }
          ol {
            li {
              float: left;
              &:nth-child(1) {
                width: 10%;
                text-align: center;
                font-size: 0.3rem;
                color: #2020ff;
                font-weight: bold;
                line-height: 1rem;
              }
              &:nth-child(2) {
                width: 50%;
              }
              &:nth-child(3) {
                width: 20%;
                font-size: 0.3rem;
                text-align: center;
                color: #ff8040;
                font-weight: bold;
                line-height: 1rem;
              }
              &:nth-child(4) {
                width: 20%;
              }
            }
          }
          .AttachBox {
            margin-top: 0.2rem;
          }
          .del {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 3;
            width: 60px;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            color: #fff;
            background-color: #ff5b45;
            //transform: translateX(60px); /*默认x轴位移60px，使其隐藏*/
          }
          .move {
            transform: translateX(-60px); /*滑动后x轴位移-60px,使其可见*/
          }
        }
      }
    }
    .iconButton {
      margin: 0.4rem auto;
      text-align: center;
      width: 0.8rem;
      height: 0.8rem;
      background: #0095dd;
      border-radius: 50%;
      line-height: 0.8rem;
      color: #fff;
    }
  }
  .addCoentFoot {
    margin: 0.2rem;
    position: relative;
  }
  /deep/.yd-cell-right select {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 1rem;
    border: none;
    display: block;
    color: #000;
    font-size: 0.28rem;
    margin-left: -0.08rem;
  }
  .yd-btn-primary:not(.yd-btn-loading) {
    background-color: #0095dd;
    margin: 0.2rem auto;
    font-size: 0.36rem;
    font-weight: bold;
  }
  /deep/.yd-cell-left {
    color: #555;
    font-size: 0.3rem;
    white-space: nowrap;
    font-weight: bold;
    -ms-flex-align: center;
  }
  /deep/.yd-cell-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    padding-left: 0.24rem;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
  }
}
</style>
