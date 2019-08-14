<template>
  <div style="background:#fff;height:100vh">
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
      array: [] // 选择的隐患项
    };
  },
  created() {
    this.getDangerInit();
  },
  methods: {
    routerGo() {
      //将选中的条目名称与ID存到VUEX
      this.$store.commit('getDangerItems',this.DataObj)
      this.$router.go(-1);
    },
    routerGo() {
      this.$store.commit("getDangerItems", this.array);
      this.$router.go(-1);
    },
    // 初始化隐患
    getDangerInit() {
      getDanger().then(res => {
        $.fn.zTree.init($("#treeDemo"), this.setting, res.rows);
      });
    },
    nodeClick: function(event, treeId, treeNode) {
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
      treeObj.checkNode(treeNode, !treeNode.checked, true);
      // console.log(treeNode)
      if (treeNode.children.length > 0) {
        this.$dialog.toast({
          mes: "请选择最下级隐患条目",
          timeout: 2000
        });
        return false;
      }
      this.array.push(treeNode)
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
