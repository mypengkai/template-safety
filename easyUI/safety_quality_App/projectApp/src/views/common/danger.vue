<template>
  <div class="danger">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="goBack"></span>
      <span slot="topRight" class="padd" @click="routerGo">确定</span>
    </headerTop>
    <div class="dangerConent">
      <ul>
        <li v-for="(item,index) in array" :key="index" @click="checkTitle(item)">{{item.spConent}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
export default {
  components: { headerTop },
  name:"danger",
  data() {
    return {
      title: "隐患条目",
      arr:[],
      array: [
        {
          id: 1,
          spConent: "作业指导书，安全家书作业指导书1",
          type: "1级"
        },
        {
          id: 2,
          spConent: "作业指导书，安全家书作业指导书2",
          type: "2级"
        },
        {
          id: 3,
          spConent: "作业指导书，安全家书作业指导书3",
          type: "3级"
        },
         {
          id: 4,
          spConent: "作业指导书，安全家书作业指导书4",
          type: "4级"
        },
        {
          id: 5,
          spConent: "作业指导书，安全家书作业指导书5",
          type: "5级"
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    routerGo() {
      this.$store.commit("getDangerItems",this.arr)
      this.$router.go(-1);
    },
    checkTitle(item){
        //this.arr = [item];
        this.arr.push(item)
        console.log(this.arr)
    }
  }
};
</script>
<style lang="less" scoped>
.danger {
  padding-top: 1rem;
  background: #fff;
  height: 100%;
}
</style>