<template>
  <div class="filter">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="padd" @click="isHowCheck(formData)">确定</span> 
    </headerTop>
    <div class="filterConter">
      <h3>选择日期</h3>
      <yd-cell-group>
        <yd-cell-item arrow>
          <span slot="left">检查时间：</span>
          <yd-datetime  type="date" start-date="2019-01-01" v-model="spCreateDateTime" slot="right">请选择</yd-datetime>
        </yd-cell-item>
      </yd-cell-group>
      <h3>选择状态</h3>
      <ul>
        <li
          v-for="(item,index) in options"
          :key="index"
          @click="filterState(index)"
          :class="{selected:index==active}"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
export default {
  components: { headerTop },
  data() {
    return {
      title: "筛选",
      spCreateDateTime: "",
      options: ["未发整改", "通过", "整改中"],
      active: null,
      formData: {
        offset: 0, // 开始页
        limit: 10, // 每页数量
        spCreateDateTime: "", // 创建时间
        sprRectificationState: "" // 状态（-1：整改待发送 0：通过 1：整改中）
      }
    };
  },
  updated(){
      this.formData.spCreateDateTime = this.spCreateDateTime;
      this.formData.sprRectificationState = parseInt(this.active -1)
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    isHowCheck(data){
       this.$store.commit("getFilterData",data)
       this.$router.go(-1);
    },
    filterState(index) {
      this.active = index;
    }
  }
};
</script>
<style lang="less" scoped>
.filter {
  padding-top: 1rem;
  ul {
    padding: 0.2rem;
    font-size: 0.3rem;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    li {
      background: #5f5f5f;
      color: #fff;
      padding: 0.1rem 0.4rem;
      border-radius: 0.3rem;
    }
  }
  .filterConter{
       h3{
           padding: 0.2rem;
           line-height: 0.6rem;
           border-bottom: 1px solid #ccc;
           font-size: 0.3rem;
           font-weight: bold;
       }
  }
  .selected {
    background: #2a82e4 !important;
  }
}
</style>