<template>
  <div class="danger">
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
    goBack() {
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
.danger {
  padding-top: 1rem;
  background: #fff;
  height: 100%;
  .dangerConent {
    width: 100%;
  }
}
</style>