<template>
  <div style="background:#fff;" class="contacts">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="padd" @click="addCheck">确定</span>
    </headerTop>
    <div class="contation">
      <ul>
        <li
          v-for="(item,index) in optionsList"
          :key="index"
          @click="checkStateList(item)"
          :class="{selected:arr.includes(item)}"
        >{{item.realname}}</li>
      </ul>
    </div>
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
        array: [],
        arrayId: []
      }
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    addCheck() {
      // 通知人
      this.$store.commit("setNotifier", this.notifier);

      this.$router.go(-1);
    },
    getListData() {
      getPerson(this.formData).then(res => {
        if (res.success == 0) {
          this.optionsList = res.rows;
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
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
      this.notifier.array = [];
      this.notifier.arrayId = [];
      this.arr.forEach(e => {
        if (e.realname) {
          this.notifier.array.push(e.realname);
        }
        if (e.id) {
          this.notifier.arrayId.push(e.id);
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
        font-size: 0.36rem;
      }
    }
  }
  .selected {
    color: #5959ff;
  }
}
</style>
