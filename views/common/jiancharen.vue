<template>
  <div style="background-color:#fff;">
    <div class="contation" >
      <ul id="treeDemo" class="ztree"></ul>
    </div>
    <p style="text-align: center;">
     
    </p>
  </div>
</template>
<script>
import { Person, getPerson } from "@/api/request.js";
export default {

  data() {
    return {
      flag:false,
      setting: {
        view: {
          showLine: false,
          selectedMulti: true
        },
        check: {
          enable: true,
          chkStyle: "radio", //设置z-tree的多选功能
          chkboxType: { Y: "", N: "" }
        },
        data: {
          key: {
            name: "name"
          },
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: null
          }
        },
        callback: {
          onClick: this.nodeClick
        }
      },
      ZGren:{},
            formData: {
        limit: "1000",
        offset: "0"
      },
    };
  },
  methods: {
    nodeClick: function(event, treeId, treeNode) {
 
      if (treeNode.children&&treeNode.children.length > 0) {
        this.$dialog.toast({
          mes: "请选择最下级隐患条目",
          timeout: 1500
        });
        return false;
      }
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
      treeObj.checkNode(treeNode, !treeNode.checked, true);
      this.$emit("zgvalue",treeNode)
    },
        getListData() {
      getPerson(this.formData).then(res => {
        if (res.success == 0) {
          this.optionsList = res.rows;
          $.fn.zTree.init($("#treeDemo"), this.setting, res.rows);
        } 
      });
    },
  },
  created(){
   
      this.getListData()

  },

};
</script>