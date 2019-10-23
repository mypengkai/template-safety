
<template>
  <div class="scan">
    <headerTop :title="title">
      <span slot="topLeft" @click="routerBack">
        <i class="icon-aliarrow-left-">取消</i>
      </span>
    </headerTop>
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>

  </div>
</template>

 

<script type='text/ecmascript-6'>
import headerTop from "@/components/headerTop";
let scan = null;

export default {
  components: {
    headerTop
  },
  data() {
    return {
      codeUrl: "",
      title: "扫一扫"
    };
  },
    mounted(){
        this.startRecognize()
    },
  methods: {

    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      plus.navigator.setStatusBarBackground("#2a5caa");
      scan = new plus.barcode.Barcode(
        "bcid",
        [plus.barcode.QR, plus.barcode.EAN13, plus.barcode.EAN8],
        {
          background: "#2a5caa",
          frameColor: "#2a5caa"
        }
      );
      scan.onmarked = onmarked;
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        that.codeUrl = result;
        that.routerBack();
      }
      that.startScan();
    },

    //开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },

    //关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },

    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    },

    routerBack() {
      if (scan) this.closeScan();
      this.$router.push({
        path: "/dashboard",
        query: { meetId: this.codeUrl }
      });
    }
  }
};
</script>

<style lang="less">
.scan {
  height: 100%;

  #bcid {
    width: 100%;

    position: absolute;

    left: 0;

    right: 0;

    top: 6%;

    bottom: 0;

    text-align: center;

    color: #fff;

    background: #ccc;
  }

  footer {
    position: absolute;

    left: 0;

    bottom: 1rem;

    height: 2rem;

    line-height: 2rem;

    z-index: 2;
  }
}
</style>