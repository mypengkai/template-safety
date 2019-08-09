<template>
  <div class="safetySelfAdd">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <div class="addConent">
      <div class="addTop">
        <p class="icon-alibubble-rounded-">基础信息</p>
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
        <p class="icon-alibubble-rounded-">巡检内容</p>
        <div class="conentList">
          <ul>
            <li>序号</li>
            <li>安全巡检内容</li>
            <li>安全等级</li>
            <li>巡检结果</li>
          </ul>
          <!-- 动态组件 -->
          <!-- <div ref="mychild">
            <resultCopy v-for="(item,index) in array" :key="index" ref="childUpload"></resultCopy>
          </div>-->
          <!-- ================================================================================== -->
          <div ref="mychild">
            <div class="childrenConent" v-for="(item,index) in array" :key="index">
              <ol>
                <li>1</li>
                <li>作业指导书，安全家书作业指导书，安全家书作业指导书，安全家书作业指导书，安全家书作业指导书，安全家书作业指导书，安全家书</li>
                <li>3级</li>
                <li>
                  <radio :value="selfCheckProcess.radio"></radio>
                </li>
                <div class="del" @click="deleteItem()">删除</div>
              </ol>
              <div class="AttachBox">
                <!-- 文件附件 -->
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
        <yd-cell-item arrow>
          <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
          <span slot="left">通知人</span>
          <span slot="right">请选择</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button size="large" type="primary">保存</yd-button>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
import resultCopy from "@/components/resultCopy.vue";
import Attach from "@/components/Attach.vue";
import radio from "@/components/radio.vue";
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
      title: "新增安全自主检查",
      array: 1,
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {}, // 滑动的item
      delProgressList: [],
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
     selfCheckProcess: {
        files: "", // 文件
        spConent: "", // 检查内容
        type: "", // 隐患等级
        radio: "" // 状态（安全，有隐患）
      }
    };
  },
  mounted(){
      console.log(this.$refs.mychild.children)
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    //点击添加检查
    AddCheck() {
      this.array++;
    }
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
        .childrenConent {
          border-top: 1px solid #ccc;
          ol {
            overflow: hidden;
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
            right: -1px;
            z-index: 3;
            width: 60px;
            height: 100%;
            text-align: center;
            color: #fff;
            background-color: #ff5b45;
            transform: translateX(60px); /*默认x轴位移60px，使其隐藏*/
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
