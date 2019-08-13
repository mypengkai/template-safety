<template>
  <div class="contacts">
    <headerTop :title="title">
      <span slot="topRight" class="padd" @click="routerGo" v-if="isHow">确定</span>
    </headerTop>
    <div class="contation">
      <ul id="treeDemo" class="ztree"></ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
//import { organAll } from "@/api/request.js";
export default {
  components: {
    headerTop
  },
  data() {
    return {
      title: "组织机构",
      isHow: false,
      nodeData: [],
      departObj: "",
      setting: {
        view: {
          showLine: false
        },
        data: {
          key: {
            name: "name"
          },
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid"
          }
        },
        callback: {
          onClick: this.nodeClick
        }
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(from) // 上一页面的路由信息
      // vm 指的是当前的vue实例
      if (from.path == "/addPlan" || from.path == "/QaddPlan") {
        vm.isHow = true;
      } else {
        vm.isHow = false;
      }
    });
  },
  created() {
    //this.getListData();
  },
  methods: {
    getListData() {
      organAll().then(res => {
        if (res.success == 0) {
          $.fn.zTree.init($("#treeDemo"), this.setting, res.obj);
          var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
          var nodes = treeObj.getNodes();
          for (var i = 0; i < nodes.length; i++) {
            //设置节点展开
            treeObj.expandNode(nodes[i], true, true, true);
          }
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    },
    nodeClick: function(event, treeId, treeNode) {
      console.log(treeNode);
    
      this.departObj = treeNode;
    },
    routerGo() {
      this.$store.dispatch("setdepartAll", this.departObj);
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.contacts {
  background: #fff;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
 
}
/deep/ul.ztree {
  margin-bottom: 1.2rem;
}
/deep/.ztree * {
  font-size: 18px !important;
}
/deep/.ztree li {
  margin: 0.1rem 0;
}
</style>


