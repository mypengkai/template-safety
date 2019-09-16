<template>
  <div>
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
// import screen from "../components/screen";
import { getBranchList } from "@/api/request.js";
import { mapGetters } from "vuex";
export default {
  components: { headerTop },
  data() {
    return {
      title: "分部分项",
      searchResult: "",
      value1: "",
      checkbox1: "",
      msg: "Hello Vue-Ztree-2.0!",
      formData: {
        offset: 0,
        limit: 1000
      },
      ztreeList: [],
      projectId: "",
      projectName: "",
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
          // radioType: "level"
        },
        data: {
          key: {
            name: "projectName"
          },
          simpleData: {
            enable: true,
            idKey: "projectCode",
            pIdKey: "projectParentCode",
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
        projectNameArr.push(nodes[i].projectName);
        v += nodes[i].projectName + ",";
    
        //console.log("节点id:" + nodes + "节点名称" + v); //获取选中节点的值
      }
      this.projectId = idArr.toString();
      this.projectName = projectNameArr.toString();
    },
    submitHandler(value) {
      this.$dialog.toast({ mes: `搜索：${value}` });
    },
    addplancheck() {
      this.$store.commit("setProjectName", this.projectName);
      this.$store.commit("setProjectId", this.projectId);
      this.$router.go(-1);
    },
    getList() {
      getBranchList().then(res => {
        res.data.rows.forEach(function(item) {
          item.name = item.hdName;
          delete item.hdName;
        });
        $.fn.zTree.init($("#treeDemo"), this.setting, res.data.rows);
        // this.nodeData = res.data.rows;
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
/deep/.ztree * {
  font-size: 18px !important;
}
/deep/.ztree li {
  margin: 0.1rem 0;
}
</style>
