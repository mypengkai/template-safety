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
          chkStyle: "checkbox",
          chkboxType: { Y: "", N: "" }
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
      this.$router.push({ path: "/addPlan" });
    },
    routerGo() {
      if (JSON.stringify(this.array) == "[]") {
        this.$dialog.toast({
          mes: "请选择隐患条目",
          timeout: 1000
        });
        return false;
      } else {
        this.$store.commit("setPlanDanger", this.array);
        this.$router.push({ path: "/addPlan" });
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
       var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
      nodes = treeObj.getCheckedNodes(true);
      this.array=[]
      for (let i = 0; i < nodes.length; i++) {
         this.array.push(nodes[i]);
      }

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
/deep/.node_name {
  display: inline-block;
  width: 5rem;
  text-overflow: ellipsis;
  color: red !important;
}
</style>
