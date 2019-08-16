<template>
  <div class="radio">
    <yd-radio-group v-model="value" color="#2020ff" size="12">
      <p>
        <yd-radio val="0">
          <span style="font-size: 0.2rem;">安全</span>
        </yd-radio>
      </p>
      <p>
        <yd-radio val="1">
          <span style="font-size: 0.2rem;">有隐患</span>
        </yd-radio>
      </p>
    </yd-radio-group>
  </div>
</template>
<script>
export default {
  props: ["currentIndex"],
  data() {
    return {
      value: ""
    };
  },
  mounted() {
      this.$nextTick(()=>{
            //console.log(this.currentIndex);
      })
  },
  watch: {
    value: function(val) {
      this.$emit("setValue", val,this.currentIndex);
    },
  }
};
</script>
<style lang="less" scoped>
/deep/.yd-radio {
  display: inline-block;
  padding-right: 0;
}
/deep/.yd-radio-icon {
  border: 1px solid #ccc;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  z-index: 10;
  vertical-align: middle;
  pointer-events: none;
}
</style>
