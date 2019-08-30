<template>
  <div style="background:#fff;height:100vh;padding-top:1.2rem;">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="goBack"></span>
      <span slot="topRight" class="padd" @click="routerGo">确定</span>
    </headerTop>
    <div class="dangerConent">
      <ul id="treeDemo" class="ztree"></ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import { getDanger } from "@/api/request.js";
export default {
  components: { headerTop },
  name: "danger",
  data() {
    return {
      title: "隐患条目",
      setting: {
        view: {
          showLine: false,
          showIcon: false,
          selectedMulti: true
        },
        check: {
          enable: true,
          chkStyle: "radio",
          radioType: "all"
        },
        data: {
          key: {
            name: "hdName"
          },
          simpleData: {
            enable: true,
            idKey: "hdCode",
            pIdKey: "hdParentCode",
            rootPId: null
          }
        },
        callback: {
          onClick: this.nodeClick
        }
      },
      array: [], // 存储的隐患项
      obj: {}, // 选择的隐患项
      biaoji: ""
    };
  },
  created() {
    this.getDangerInit();
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/safetySelfAdd" });
    },
    routerGo() {
      if (JSON.stringify(this.obj) == "{}") {
        this.$dialog.toast({
          mes: "请选择隐患条目",
          timeout: 1000
        });
        return false;
      } else {
        console.log(this.array[this.array.length - 1]);
        if (
          this.array.length &&
          this.array[this.array.length - 1].hdCode === this.obj.hdCode
        ) {
          this.$dialog.toast({
            mes: "请勿重复添加",
            timeout: 1000
          });
          return false;
        }
        this.array.push(this.obj);
        this.$store.commit("getDangerItems", this.array);
        this.$router.push({ path: "/safetySelfAdd" });
      }
    },
    // 初始化隐患
    getDangerInit() {
      getDanger().then(res => {
        $.fn.zTree.init($("#treeDemo"), this.setting, res.rows);
      });
    },
    nodeClick: function(event, treeId, treeNode) {
      if (treeNode.children.length > 0) {
        this.$dialog.toast({
          mes: "请选择最下级隐患条目",
          timeout: 1000
        });
        return false;
      }
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
      treeObj.checkNode(treeNode, !treeNode.checked, true);
      this.obj = treeNode;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.yd-back-icon {
  color: white !important;
  .dangerConent {
    width: 100%;
  }
}
/deep/.yd-navbar-center-title {
  color: white !important;
}
</style>
