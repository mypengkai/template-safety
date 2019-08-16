<template>
  <div class="contacts">
    <headerTop :title="title" :flag="flag">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="padd" @click="addCheck">确定</span>
    </headerTop>
    <div class="contation">
      <ul>
        <li
          v-for="(item,index) in nodeData"
          :key="index"
          :class="{selected:index == active}"
          @click="checkPreson(item,index)"
        >{{item.realname}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import { getPerson } from "@/api/request.js";
export default {
  components: {
    headerTop
  },
  data() {
    return {
      title: "联系人",
      flag: true,
      formData: {
        limit: "1000",
        offset: "0"
      },
      nodeData: [],
      active: null,
      CheckPerson: {
        Personid: "",
        Personname: ""
      }
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    addCheck() {
      console.log(this.CheckPerson)
      // 通知人
      this.$store.commit("setCheckPerson", this.CheckPerson);
      this.$router.go(-1);
    },
    getInit() {
      getPerson(this.formData).then(res => {
        if (res.success == 0) {
          this.nodeData = res.rows;
        }
      });
    },
    checkPreson(item, index) {
      this.active = index;
      this.CheckPerson.Personname = item.realname;
      this.CheckPerson.Personid = item.id;
    }
  }
};
</script>

<style lang="less" scoped>
.contacts {
  background: #fff;
  width: 100%;
  height: 100%;
  // padding-top: 1rem;
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



