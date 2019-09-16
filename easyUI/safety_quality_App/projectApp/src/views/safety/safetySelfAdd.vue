<template>
  <div class="safetySelfAdd">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <div class="addConent">
      <div class="addTop">
        <p class="icon-aliwocanyude">&nbsp;&nbsp;基础信息</p>
        <ul>
          <li>所属机构: {{userinfo.departname}}</li>
           <li>所属部门: {{userinfo.department}}</li>
          <li @click="display" >巡检位置: <span style="border-bottom: 2px dashed #f58220;color:blue;">{{array?array[0].name:userinfo.projectName}}</span> </li>
          <li>检查性质：自检</li>
          <li>检查人：{{userinfo.realname}}</li>
          <!-- <li>检查时间：2019-08-08 10:10:20</li> -->
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
          <div ref="mychild" class="comChild">
            <resultCopy
              ref="childUpload"
              :currentIndex="index"
              :formData="[item]"
              @del="delItem"
              v-for="(item,index) in dangerItems"
              :key="index"
            ></resultCopy>
          </div>
          <div class="iconButton" @click="AddCheck">
            <i class="icon-alixinzeng"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="addCoentFoot">
      <yd-cell-group>
        <yd-cell-item arrow type="link" href="/notifier">
          <span slot="left">
            <i class="icon-alitouxiang"></i>&nbsp;&nbsp;通知人
          </span>
          <span slot="right" v-if="!this.notifier">请选择</span>
          <span slot="right" v-if="this.notifier">{{notifier.names[0]}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button
        size="large"
        type="primary"
        @click.native="addInspection"
        :loading="isLoading"
        loading-txt="提交保存中..."
      >保存</yd-button>
    </div>
              <yd-popup v-model="show1" position="center" width="90%">
            <div style="background-color:#fff;">
                <p>
                    <ul id="treeDemo" class="ztree"></ul>
                </p>
          
                <p style="text-align: center;">
                    <yd-button @click.native="show1 = false">关闭</yd-button>
                </p>
            </div>
        </yd-popup>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
import resultCopy from "@/components/resultCopy.vue";
import Attach from "@/components/Attach.vue";
import radio from "@/components/radio.vue";
import { mapGetters } from "vuex";
import {
  addSafety,
  safetyjhxiangqing,
  DetailDepart,
  getDanger
} from "@/api/request.js";
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
      userinfo: {}, // 用户信息
      checkId: "", // 选中项的id
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {}, // 滑动的item
      delProgressList: [],
      notifierPersons: "", // 通知人
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
      id: this.$route.query.id,
      form: {
        departId: "", // 部门id
        projectId: "", // 分部分项id
        spCheckUserId: "", // 检查人id
        spNotifier: "", // 通知人id
        result: [], // list数据
        sppId: "",
        sppName: ""
      },
      isLoading: false,
      setting: {
        view: {
          showLine: false,
          showIcon: false,
          selectedMulti: true
        },
        check: {
          enable: true,
          autoCheckTrigger: false,
          chkStyle: "radio",
          radioType:"all",
          chkboxType: { Y: "", N: "" }
        },
        data: {
          key: {
            name: "name"
          },
        },
        callback: {
          onClick: this.nodeClick
        }
      },
       show1: false,
       array:''  //巡检位置数组
    };
  },
  computed: {
    ...mapGetters(["dangerItems", "notifier"])
  },
  created() {
    this.getDangerInit();
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
  },
  activated(){
    
  },
  methods: {
    display(){
      this.show1=true
    },
       nodeClick: function(event, treeId, treeNode) {
      if (treeNode.children&&treeNode.children.length > 0) {
        this.$dialog.toast({
          mes: "请选择最下级隐患条目",
          timeout: 1000
        });
        return false;
      }
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
      treeObj.checkNode(treeNode, !treeNode.checked, true);
       var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
      nodes = treeObj.getCheckedNodes(true);
         this.array=nodes;
         console.log(this.array)
    },
    // 初始化隐患
    getDangerInit() {
      DetailDepart().then(res => {
        $.fn.zTree.init($("#treeDemo"), this.setting, res.obj);
      });
    },
    routerBack() {
      this.$router.push({ path: "/safetySelfCheck" });
    },
    delItem(data) {
      this.dangerItems.splice(data, 1);
    },
    //点击添加检查
    AddCheck() {
      let id=this.array?this.array[0].zid:this.userinfo.projectId
      this.$router.push({ path: "/danger" ,query:{id:id}});
    },

    // 保存
    async addInspection() {
      if (this.$refs.childUpload.length > 0) {
        // 判断新增组件length
        for (let i = 0; i < this.$refs.childUpload.length; i++) {
          await this.$refs.childUpload[i].upResult(); // 同步调用子组件文件上传方法
        }
      } else {
        await this.$refs.childUpload.upResult();
      }
      let list = [];
      if (this.$refs.mychild.children.length > 0) {
        // 获取组件数据（每一个组件数据都是一组obj）
        let arr = this.$refs.mychild.children;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].__vue__.conentObj.sprState == "") {
            this.$dialog.toast({
              mes: "请勾选状态",
              timeout: 800
            });
            return false;
          }
          list.push(arr[i].__vue__.conentObj);
        }
      }
      this.form.result = list;
      this.form.departId = this.userinfo.departid;
      this.form.projectId =this.array?this.array[0].zid:this.userinfo.projectId;
      this.form.spCheckUserId = this.userinfo.id;
      if (JSON.stringify(this.notifier) != "") {
        this.form.spNotifier = this.notifier.ids.join(",");
      } else {
        this.$dialog.toast({
          mes: "请选择通知人",
          timeout: 2000
        });
        return false;
      }
      this.isLoading = true;
      addSafety(this.form).then(res => {
        if (res.success == 0) {
          this.$dialog.toast({
            mes: "新增成功",
            timeout: 2000
          });
          this.isLoading = false;
          
          // 清楚vuex 数据以及输入框数据
          this.$store.commit("getDangerItems", ""); // 隐患
          this.$store.commit("setNotifier", ""); // 通知人
          // location.reload();
          this.$router.push({ path: "/safetySelfCheck" }); // 计划检查
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1000
          });
        }
      });
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
  /deep/.ztree li {
    line-height: 30px;
  }
}
</style>
