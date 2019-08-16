<template>
  <div ref="mychild" class="resultCopy">
    <div class="childrenConent" v-for="(item,index) in formData" :key="index">
      <div class="rowConent">
        <ol
          class="clearfix"
          :class="{move:candelete.id==item.id}"
          @touchstart="touchStart(item)"
          @touchend="touchEnd(item)"
        >
          <li>{{currentIndex+1}}</li>
          <li>{{item.hdName}}</li>
          <li>{{item.hdGrade}}</li>
          <li>
            <radio @setValue="getValue"></radio>
          </li>
        </ol>
        <div class="del" @click="deleteItem(index)" v-if="ifFlag && checkId==item.id">删除</div>
      </div>
      <div class="AttachBox">
        <Attach
          :attachList="fileList.files"
          :delAttachList="delProgressList"
          :readonly="false"
          :sourceType="3"
        ></Attach>
      </div>
    </div>
  </div>
</template>
<script>
import Attach from "@/components/Attach.vue";
import radio from "@/components/radio.vue";
import { mapGetters } from "vuex";
export default {
  props: ["currentIndex", "formData"],
  components: { Attach, radio },
  data() {
    return {
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {}, // 滑动的item
      ifFlag: false,
      checkId: "", // 选中项的id
      delProgressList: [],
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
      dangerList: [],
      conentObj: {
        sphdid: "", // 隐患id
        spContent: "", // 隐患名称
        hdGrade: "", // 隐患等级
        sprState: "", // 状态（0安全，1有隐患）
        fileId: "" // 文件成功返回id
      }
    };
  },
  computed: {
    ...mapGetters(["dangerItems"])
  },
  created() {
    
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.formData, "formData");
      console.log(this.dangerItems, "22");
      this.dangerItems.forEach(element => {
        this.conentObj.sphdid = element.id;
        this.conentObj.spContent = element.hdName;
        this.conentObj.hdGrade = element.hdGrade;
      });
    });
  },

  methods: {
    deleteItem(index) {
      this.formData.splice(index, 1);
      // splice方法是删除数组某条数据，或者向某个位置添加数据
    },
    touchStart(item) {
      let touchs = event.changedTouches[0];
      // 记录开始滑动的鼠标位置
      this.clientNum.x1 = touchs.pageX;
      this.candelete = {};
    },
    touchEnd(item) {
      let touchs = event.changedTouches[0];
      // 记录结束滑动的鼠标位置
      this.clientNum.x2 = touchs.pageX;
      this.candelete = {};
      // 判断滑动距离大于50，判定为滑动成功，否则失败
      if (
        this.clientNum.x2 < this.clientNum.x1 &&
        Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50
      ) {
        this.ifFlag = true;
        this.checkId = item.id;
        event.preventDefault();
        this.candelete = item;
      } else if (
        this.clientNum.x2 > this.clientNum.x1 &&
        Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
      ) {
        this.ifFlag = false;
        event.preventDefault();
        this.candelete = {};
      }
    },
    getValue(data) {
      this.conentObj.sprState = data;
    },
    //文件上传
    upResult() {
      let formData = new FormData();
      formData.append("type", this.fileList.type);
      if (this.fileList.files.length > 0) {
        for (let key in this.fileList.files) {
          formData.append("file", this.fileList.files[key].file);
        }
      } else {
        return false;
      }
      return new Promise(resolve => {
        safetyAddResult(formData).then(res => {
          if (res.success == 0) {
            resolve(res.obj);
            this.conentObj.fileId = res.obj;
            this.$dialog.toast({
              mes: "上传成功",
              timeout: 2000
            });
          } else {
            this.$dialog.toast({
              mes: res.msg,
              timeout: 2000
            });
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.resultCopy {
  margin: 0.2rem;
  .childrenConent {
    border-top: 1px solid #ccc;
    .rowConent {
      position: relative;
      transform: translateX(0);
      transition: all 0.3s; /*滑动效果更生动*/
    }
    ol {
      li {
        float: left;
        &:nth-child(1) {
          width: 10%;
          text-align: center;
          font-size: 0.3rem;
          color: #2020ff;
          font-weight: bold;
          line-height: 1rem;
        }
        &:nth-child(2) {
          width: 50%;
        }
        &:nth-child(3) {
          width: 20%;
          font-size: 0.3rem;
          text-align: center;
          color: #ff8040;
          font-weight: bold;
          line-height: 1rem;
        }
        &:nth-child(4) {
          width: 20%;
        }
      }
    }
    .AttachBox {
      margin-top: 0.2rem;
    }
    .del {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;
      width: 60px;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: #fff;
      background-color: #ff5b45;
    }
    .move {
      transform: translateX(-60px); /*滑动后x轴位移-60px,使其可见*/
    }
  }
  .AttachBox {
    margin-top: 0.2rem;
  }
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
  .del {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    width: 60px;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    background-color: #ff5b45;
    //transform: translateX(60px); /*默认x轴位移60px，使其隐藏*/
  }
  .move {
    transform: translateX(-60px); /*滑动后x轴位移-60px,使其可见*/
  }
}
</style>
