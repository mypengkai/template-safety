<template>
  <div class="headerTop">
    <yd-navbar :title="title">
      <h2 slot="left" v-show="flag=flag" @click="goBack">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </h2>
      <h2 slot="right">
        <slot></slot>
      </h2>
    </yd-navbar>
  </div>
</template>
<script>
export default {
  props: ["title", "flag"],
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.headerTop {
  height: 1rem;
  width: 100%;
  background: #fff;
  line-height: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  h2 {
    color: #fff;
    font-size: 0.3rem;
  }
 /deep/.yd-back-icon {
  color: white !important;
}
/deep/.yd-navbar-center-title {
  color: white !important;
}
/deep/.yd-navbar {
  background-color: #248bfd !important;
}
  .yd-navbar {
    height: 0.9rem;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    z-index: 5;
    border-bottom: 0.01rem solid #ccc;
  }
  /deep/.yd-navbar-center-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.36rem !important;
    font-weight: normal;
  }
  /deep/.yd-navbar-center-box {
    -webkit-box-ordinal-group: 3;
    -ms-flex-order: 2;
    order: 2;
    width: 100%;
    margin-left: 20%;
  }
  /deep/.yd-navbar-item {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 20%;
    flex: 0 0 20%;
    padding: 0 0.2rem;
    font-size: 0.26rem;
    white-space: nowrap;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
  }
}
</style>

