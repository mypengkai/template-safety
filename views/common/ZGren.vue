<template>
  <div style="background:#fff;" class="contacts">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="padd" @click="addCheck">确定</span>
    </headerTop>

    <!-- <yd-popup v-model="show1" position="center" width="90%"> -->
      <div style="background-color:#fff;">
        <div class="contation">
          <ul id="treeDemo" class="ztree"></ul>
        </div>
        <!-- <p style="text-align: center;">
          <yd-button @click.native="show1 = false">Close Center Popup</yd-button>
        </p> -->
      </div>
    <!-- </yd-popup> -->
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import { getPerson } from "@/api/request.js";
export default {
  components: { headerTop },
  data() {
    return {
      title: "联系人",
      show1:false,
      searchResult: "",
      value1: "",
      checkbox1: "",
      formData: {
        offset: 0,
        limit: 100000
      },
      optionsList: [],
      arr: [], //
      notifier: {
        names: [],
        ids: []
      },
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
      ContentId: "",
      Contentname: "",
      ZGren: {}
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    nodeClick: function(event, treeId, treeNode) {
      if (treeNode.childcount > 0) {
        this.$dialog.toast({
          mes: "请选择最下级隐患条目",
          timeout: 1500
        });
        return false;
      }
      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
      treeObj.checkNode(treeNode, !treeNode.checked, true);
      this.ZGren.id = treeNode.id;
      this.ZGren.name = treeNode.name;
    },
    routerBack() {
      this.$router.go(-1);
    },
    addCheck() {
      this.notifier.ids.push(this.ContentId);
      this.notifier.names.push(this.Contentname);
      // 通知人
      this.$store.commit("setCheckPerson", this.ZGren);
      this.$router.go(-1);
    },
    getListData() {
      getPerson(this.formData).then(res => {
        if (res.success == 0) {
          this.optionsList = res.rows;
          $.fn.zTree.init($("#treeDemo"), this.setting, res.rows);
        }
      });
    },
    checkStateList(item) {
      if (this.arr.includes(item)) {
        //includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
        //filter()方法用于把Array的某些元素过滤掉，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素：生成新的数组
        this.arr = this.arr.filter(function(ele) {
          return ele != item;
        });
        //this.arr=this.arr.filter((ele)=>ele!=i);
        //filter()为假时删除
      } else {
        this.arr.push(item);
      }
      this.notifier.names = [];
      this.notifier.ids = [];
      this.arr.forEach(e => {
        if (e.realname) {
          this.notifier.names.push(e.realname);
        }
        if (e.id) {
          this.notifier.ids.push(e.id);
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
.contacts {
  background: #fff;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  .contation {
    padding: 0.2rem;
    ul {
      li {
        padding: 0.1rem 0;
        display: flex;
        justify-content: space-between;
        span {
          &:first-child {
            font-size: 0.36rem;
          }
          &:last-child {
            font-size: 0.2rem;
            color: #ccc;
          }
        }
      }
    }
  }
  .selected {
    color: #5959ff;
  }
}
</style>
