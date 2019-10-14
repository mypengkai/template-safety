<template>
  <div style="background:#fff;height:100vh;">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="goBack"></span>
      <span slot="topRight" class="padd" @click="routerGo">确定</span>
    </headerTop>
    <div class="dangerConent">
      <ul id="treeDemo" class="ztree" style=""></ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import { getDanger } from "@/api/request.js";
import { mapGetters } from "vuex";
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
          onClick: this.nodeClick,
          onCheck: this.zTreeOnCheck
        }
      },
      node: "", //暂存选中的隐患
      array: [], // 存储的隐患项
      obj: {}, // 选择的隐患项
      biaoji: "",
      id: ""
    };
  },
  created() {
    this.array = this.dangerItems || [];
    this.id = this.$route.query.id;
    this.getDangerInit();
  },
  computed: {
    ...mapGetters(["dangerItems"])
  },
  methods: {
    zTreeOnCheck: function(event, treeId, treeNode) {
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
      treeObj.checkNode(treeNode, !treeNode.checked, false);
    },
    goBack() {
      this.$router.push({ path: "/safetySelfAdd" });
    },
    routerGo() {
      for (let i = 0; i < this.node.length; i++) {
        this.array.push(this.node[i]);
      }
      if (JSON.stringify(this.array) == "[]") {
        this.$dialog.toast({
          mes: "请选择隐患条目",
          timeout: 1000
        });
        return false;
      } else {
        this.$store.commit("getDangerItems", this.array);
        this.$router.push({ path: "/safetySelfAdd" });
      }
    },
    // 初始化隐患
    getDangerInit() {
      getDanger(this.id).then(res => {
        $.fn.zTree.init($("#treeDemo"), this.setting, res.rows);
      });
    },
    nodeClick: function(event, treeId, treeNode) {
      if (treeNode.children && treeNode.children.length > 0) {
        this.$dialog.toast({
          mes: "请选择最下级隐患条目",
          timeout: 1000
        });
        return false;
      }
      this.array.forEach(el => {
        if (el.id === treeNode.id) {
          this.$dialog.toast({
            mes: "请勿重复添加",
            timeout: 1000
          });
          treeObj.checkNode(treeNode, !treeNode.checked, false);
          return false;
        }
      });
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
      treeObj.checkNode(treeNode, !treeNode.checked, true);
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = treeObj.getCheckedNodes(true);
      //将选中的隐患暂存于this.node,防止重复添加的情况
      this.node = nodes;
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
/deep/.ztree *{
  font-size: .3rem !important;
}
/deep/.ztree{
  margin-top: 1rem;
  li{
    margin: .1rem 0;
  }
}
</style>
