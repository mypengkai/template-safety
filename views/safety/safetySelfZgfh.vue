<template>
  <div class="content">
    <headerTop :title="title"></headerTop>
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
      <p style="color:white;">123</p>
      <ul>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>安全隐患&nbsp;<i style="background:#ffc300;padding:.02rem;">(111级)</i>:</span>&nbsp;&nbsp;&nbsp;
          <span>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</span>
          <button>111级</button>
        </li>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>整改要求:</span>&nbsp;&nbsp;&nbsp;
          <span>
            作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求作业指导
            书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求
          </span>
        </li>
        <li style="height:1.5rem;border-bottom: 1px dashed #ccc;">
          <span>整改结果:</span>&nbsp;&nbsp;&nbsp;
          <span style="color:#71ACED">已完成整改</span>
        </li>
        <li>
          <span>整改完成时间:</span>&nbsp;&nbsp;&nbsp;
          <span>2019-9-10</span>
        </li>
        <li style="margin-bottom:.2rem;">
          <span style="text-align:left;padding-left:.3rem;">整改人:</span>&nbsp;&nbsp;&nbsp;
          <span>你大爷</span>
        </li>
        <!-- 文件附件 -->
        <Attach
          :attachList="fileList.files"
          :delAttachList="delProgressList"
          :readonly="false"
          :sourceType="3"
          style="border-bottom:1px dashed #ccc;"
        ></Attach>
        <li style="margin-top:.2rem;margin-bottom:.2rem;">
          <p>
            <button>通过</button>
          </p>
          <p>
            <button>不通过</button>
          </p>
        </li>
        <li style="margin-bottom:.1rem;">不通过原因:</li>
        <textarea name id cols="57" rows="10" placeholder="点击输入文字..." class="text"></textarea>
        <!-- 文件附件 -->
        <Attach
          :attachList="fileList.files"
          :delAttachList="delProgressList"
          :readonly="false"
          :sourceType="3"
          style="border-bottom:1px dashed #ccc;"
        ></Attach>
      </ul>
    </div>
    <div class="zgList">
      <p style="color:white;">123</p>
      <ul>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>安全隐患&nbsp;<i style="background:#ffc300;padding:.02rem;">(111级)</i>:</span>&nbsp;&nbsp;&nbsp;
          <span>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求123</span>
        </li>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>整改要求:</span>&nbsp;&nbsp;&nbsp;
          <span>
            作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求作业指导
            书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求
          </span>
        </li>
        <li style="height:1.5rem;border-bottom: 1px dashed #ccc;">
          <span>整改结果:</span>&nbsp;&nbsp;&nbsp;
          <span style="color:#71ACED">已完成整改</span>
        </li>
        <li>
          <span>整改完成时间:</span>&nbsp;&nbsp;&nbsp;
          <span>2019-9-10</span>
        </li>
        <li style="margin-bottom:.2rem;">
          <span style="text-align:left;padding-left:.3rem;">整改人:</span>&nbsp;&nbsp;&nbsp;
          <span>你大爷</span>
        </li>
        <!-- 文件附件 -->
        <Attach
          :attachList="fileList.files"
          :delAttachList="delProgressList"
          :readonly="false"
          :sourceType="3"
          style="border-bottom:1px dashed #ccc;"
        ></Attach>
        <li style="margin-top:.2rem;margin-bottom:.2rem;">
          <p>
            <button>通过</button>
          </p>
          <p>
            <button>不通过</button>
          </p>
        </li>
        <li style="margin-bottom:.1rem;">不通过原因:</li>
        <textarea name id cols="57" rows="10" placeholder="点击输入文字..." class="text"></textarea>
        <!-- 文件附件 -->
        <Attach
          :attachList="fileList.files"
          :delAttachList="delProgressList"
          :readonly="false"
          :sourceType="3"
          style="border-bottom:1px dashed #ccc;"
        ></Attach>
      </ul>
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
      title: "自检整改复核",
      fileList: {
        files: [],
        type: "SafetyPatrol" // 安全
      },
      delProgressList: []
    };
  }
};
</script>
<style lang="less" scoped>
.content {
  // padding: 0 0.1rem;
  padding-top: 1.2rem;
  background-color: #f5f5f5;
  h3 {
    padding-left: 0.5rem;
    font-size: 0.28rem;
    font-weight: 600;
  }
  .information {
    padding-left: 0.5rem;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 5px #888888;
    margin: 0.2rem 0.1rem;
    li {
      padding: 0.1rem 0;
    }
  }
  .zgList {
    background-color: #ffc300;
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    p {
      width: 0.8rem;
      //   background-color: #ffc300;
      height: 100%;
      float: left;
      text-align: center;
    }
    ul {
      background-color: #fff;
      width: 100%;
      padding-left: .2rem;
      li {
        display: flex;
        padding:.2rem 0.1rem;
        padding-right: 0.3rem;
        align-items: center; //子元素垂直居中
        &:nth-child(7) {
          display: flex;
          p {
            flex: 0 0 50%;
            button {
              width: 2rem;
              height: 0.8rem;
              color: white;
              font-size: 0.28rem;
              border-radius: 0.2rem;
              &:nth-child(1) {
                background-color: green;
              }
            }
          }
          p:nth-child(2) {
            button:nth-child(1) {
              background-color: red;
            }
          }
        }
        span {
          display: inline-block;

          &:nth-child(1) {
            flex: 0 0 28%;
            text-align: center;
          }
          &:nth-child(2) {
            flex: 0 0 72%;
            padding: .1rem;
          }
        }
        &:nth-child(8) {
          font-size: 0.28rem;
          font-weight: 600;
        }
      }
      textarea {
        padding: 0.2rem;
        border-radius: 0.2rem;
        margin-left: 0.1rem;
        width: 6.2rem;
      }
    }
  }
}
/deep/.yd-cell-box {
  margin-bottom: 0 !important;
}
/deep/.yd-cell:after {
  height: 0px !important;
}
</style>
