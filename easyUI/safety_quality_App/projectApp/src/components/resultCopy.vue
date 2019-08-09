<template>
  <div class="resultCopy">
    <div class="childrenConent">
      <ul>
        <li>1</li>
        <li>作业指导书，安全家书作业指导书，安全家书作业指导书，安全家书作业指导书，安全家书作业指导书，安全家书作业指导书，安全家书</li>
        <li>3级</li>
        <li>
          <yd-radio-group v-model="radio" color="#2020ff" size="12">
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
        </li>
        <div class="del" @click="deleteItem()">删除</div>
      </ul>
      <div class="AttachBox">
        <!-- 文件附件 -->
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
export default {
  components: { Attach },
  data() {
    return {
      radio: "",
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {}, // 滑动的item
      delProgressList: [],
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
      selfCheckProcess: {
        files: "",
        sprResult: "", // 检查内容
        rectification: "", // 整改要求
        sprState: 0
      }
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.resultCopy {
  margin: 0.2rem;
  border-top: 1px solid #ccc;
  ul {
    overflow: hidden;
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
  right: -1px;
  z-index: 3;
  width: 60px;
  height: 100%;
  text-align: center;
  color: #fff;
  background-color: #ff5b45;
  transform: translateX(60px); /*默认x轴位移60px，使其隐藏*/
}

}
</style>
