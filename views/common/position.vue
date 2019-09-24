<template>
            <div style="background-color:#fff;">
                <p>
                <ul id="treeDemo" class="ztree"></ul>
                </p>
                <p style="text-align: center;">
                    <yd-button @click.native="display">确定</yd-button>
                </p>
            </div>
</template>
<script>
import {
 
  DetailDepart

} from "@/api/request.js";
export default {

    data(){
        return{
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
      YHplace:""

        }
    },
    created(){
        this.getDangerInit()
    },
    methods:{
        display(){
            this.$emit("fuzhi",this.YHplace)
            this.$emit("display",false)
        },
        fuzhi(){
            
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
        // this.$emit("fuzhi",nodes)
        this.YHplace=nodes
    },
        // 初始化隐患
    getDangerInit() {
 
      DetailDepart().then(res => {
        $.fn.zTree.init($("#treeDemo"), this.setting, res.obj);
      });
    },
    }
}
</script>
<style lang="less" scoped>

</style>