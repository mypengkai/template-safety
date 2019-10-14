<template>
  <div style="background:#fff;height:100vh">
    <headerTop class="title" :title="title">
      <span
        slot="topLeft"
        class="icon-aliarrow-left- iconBack"
        @click="$router.push({path:'/addPlan'})"
      ></span>
      <span slot="topRight" class="padd" @click="addplancheck">确定</span>
    </headerTop>
    <div style="width:100%;margin-top:1rem;">
      <ul id="treeDemo" class="ztree"></ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import { getInspectionPropertyList } from "@/api/request.js";
import { mapGetters } from "vuex";
export default {
  components: { headerTop },
  data() {
    return {
      title: "选择性质项",
      searchResult: "",
      value1: "",
      checkbox1: "",
      msg: "Hello Vue-Ztree-2.0!",
      formData: {
        offset: 0,
        limit: 10000
      },
      PropertyId: "", // 性质id
      PropertyName: "", // 性质名称
      nodeData: [],
      setting: {
        view: {
          showLine: false,
          selectedMulti: true
        },
        check: {
          enable: true,
          chkStyle: "checkbox",
          chkboxType: { Y: "", N: "" }
        },
        data: {
          key: {
            name: "ipName"
          },
          simpleData: {
            enable: true,
            idKey: "ipCode",
            pIdKey: "ipParentCode",
            rootPId: null
          }
        },
        callback: {
          onClick: this.nodeClick
        }
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    expandClick() {},
    contextmenuClick() {},
    nodeClick: function(event, treeId, treeNode) {
      //设置z-tree的多选功能
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
      treeObj.checkNode(treeNode, !treeNode.checked, true);
      //循环获取z-tree多选中的id与name
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = treeObj.getCheckedNodes(true),
        v = "";
      var idArr = [],
        projectNameArr = [];
      for (var i = 0; i < nodes.length; i++) {
        idArr.push(nodes[i].id);
        projectNameArr.push(nodes[i].ipName);
        v += nodes[i].name + ",";
        //console.log("节点id:" + nodes + "节点名称" + v); //获取选中节点的值
      }
      this.PropertyId = idArr.toString();
      this.PropertyName = projectNameArr.toString();
      
    },
    submitHandler(value) {
      this.$dialog.toast({ mes: `搜索：${value}` });
    },
    addplancheck() {
      this.$store.commit("setInspectionPropertyId", this.PropertyId);
      this.$store.commit("setInspectionPropertyName", this.PropertyName);
      this.$router.go(-1);
    },
    getList() {
      getInspectionPropertyList(this.formData).then(res => {
        if (res.success == 0) {
          $.fn.zTree.init($("#treeDemo"), this.setting, res.rows);
        } 
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.yd-back-icon {
  color: white !important;
}
/deep/.yd-navbar-center-title {
  color: white !important;
}
/deep/.ztree *{
  font-size: 18px !important;
}
/deep/.ztree li{
  margin: .1rem 0;
}
</style>
