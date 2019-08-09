<template>
  <div>
    <headerTop :title="title"></headerTop>
    <div class="content">
      <h3>
        <i class="icon-aliwocanyude"></i>&nbsp;&nbsp;基础信息
      </h3>
      <ul class="information">
        <li>
          <span>巡检名称:</span>&nbsp;&nbsp;&nbsp;
          <span>AQXJ20190807_001</span>
        </li>
        <li>
          <span>所属部门:</span>&nbsp;&nbsp;&nbsp;
          <span>安质部</span>
        </li>
        <li>
          <span>巡检位置:</span>&nbsp;&nbsp;&nbsp;
          <span>花果山隧道洞口</span>
        </li>
        <li>
          <span>检查性质:</span>&nbsp;&nbsp;&nbsp;
          <span>AQXJ20190807_001</span>
        </li>
        <li>
          <span>检查人:</span>&nbsp;&nbsp;&nbsp;
          <span>AQXJ20190807_001</span>
        </li>
        <li>
          <span>检查时间:</span>&nbsp;&nbsp;&nbsp;
          <span>AQXJ20190807_001</span>
        </li>
      </ul>
      <h3>
        <i class="icon-alishapes-"></i>&nbsp;&nbsp;整改内容
      </h3>
      <div class="zgList">
        <div>1</div>
        <ul>
          <li>
            <p>安全隐患</p>
            <p>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</p>
            <span>111级</span>
          </li>
          <li>
            <p>整改要求</p>
            <p>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</p>
          </li>
          <li>
            <p>整改结果</p>
            <p>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</p>
          </li>
          <li>
            <p>整改完成时间:</p>
            <p>2-019-10-10</p>
          </li>
          <li>
            <p>整改人:</p>
            <p>你大爷</p>
          </li>
          <li>
            <!-- <p>附件:</p> -->
            <!-- <p></p> -->
            <Attach
              :attachList="fileList.files"
              :delAttachList="delProgressList"
              :readonly="false"
              :sourceType="3"
            ></Attach>
          </li>
          <li>
            <button>保存并提交</button>
          </li>
        </ul>
      </div>
      <div class="zgList" style="margin-top:.3rem;background:#ccc;">
        <div style="color:white;">1</div>
        <ul>
          <li>
            <p>安全隐患</p>
            <p>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</p>
            <span>111级</span>
          </li>
          <li>
            <p>整改要求</p>
            <p>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</p>
          </li>
          <li>
            <p>整改结果</p>
            <p>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</p>
          </li>
          <li>
            <p>整改完成时间:</p>
            <p>2-019-10-10</p>
          </li>
          <li>
            <p>整改人:</p>
            <p>你大爷</p>
          </li>
          <li>
            <!-- <p>附件:</p> -->
            <!-- <p></p> -->
            <Attach
              :attachList="fileList.files"
              :delAttachList="delProgressList"
              :readonly="false"
              :sourceType="3"
            ></Attach>
          </li>
          <li>
            <button style="background:#ccc;color:white;">保存并提交</button>
          </li>
        </ul>
      </div>
    </div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">
          <i class="icon-alitouxiang"></i>&nbsp;&nbsp;通知人
        </span>
        <span slot="right">右边内容一</span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import Attach from "@/components/Attach.vue";
export default {
  components: {
    headerTop,
    Attach
  },
  data() {
    return {
      title: "自检隐患整改",
      delProgressList: [],
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      }
    };
  }
};
</script>
<style lang="less" scoped>
.content {
  padding: 0 0.1rem;
  padding-top: 1.2rem;
  background-color: #f5f5f5;
  h3 {
    padding-left: 0.2rem;
    font-size: 0.28rem;
    font-weight: 600;
  }
  .information {
    padding-left: 0.5rem;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 5px #888888;
    margin: 0.2rem 0;
    li {
      padding: 0.1rem 0;
    }
  }
  .zgList {
    display: flex;
    align-items: center;
    background-color: #ffc300;
    padding-left: 10%;
    position: relative;
    div {
      position: absolute;
      left: 3%;
    }
    ul {
      flex: 0 0 100%;
      background-color: #f5f5f5;
      li {
        display: flex;
        padding: 0.1rem;
        position: relative;
        align-items: center; //子元素垂直居中
        border-bottom: 1px dashed #ccc;
        span {
          position: absolute;
          bottom: 0.1rem;
          right: 0.2rem;
          background-color: #ffc300;
          border-radius: 0.1rem;
          padding: 0.01rem;
        }
        p:nth-child(1) {
          text-align: center;
          flex: 0 0 25%;
        }
        p:nth-child(2) {
          text-align: left;
          flex: 0 0 75%;
        }
      }
      li:nth-child(4) {
        border-bottom: 0;
      }
      li:nth-child(5) {
        border-bottom: 0;
      }
      li:nth-child(6) {
        border-bottom: 0;
        display: inline-block;
        margin-top: 0.3rem;
        margin-bottom: 3rem;
      }
      li:nth-child(7) {
        button {
          background: #2a82e4;
          width: 4rem;
          height: 0.8rem;
          border-radius: 0.2rem;
          color: white;
          font-size: 0.28rem;
          margin-left: 22%;
        }
      }
    }
  }
  /deep/.att_main {
    background-color: #f5f5f5;
  }
  /deep/.yd-cell:after{
     height: 0;
  }
}
</style>
