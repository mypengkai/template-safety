<template>
  <div class="headerTop">
    <ul>
      <li>
        <slot name="topLeft"></slot>
      </li>
      <li :title="title">{{title}}</li>
      <li>
        <slot name="topRight"></slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.headerTop {
  height: 1rem;
  width: 100%;
  line-height: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #2a82e4;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#2a5caa), to(#2a82e4));
  color: #fff;

  ul {
    overflow: hidden;
    text-align: center;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    li {
      //float: left;
      &:first-child,
      &:last-child {
        width: 15%;
        font-size: 0.3rem;
      }
      &:nth-child(2) {
        width: 70%;
        font-size: 0.34rem;
        font-weight: normal;
      }
    }
  }
}
</style>

