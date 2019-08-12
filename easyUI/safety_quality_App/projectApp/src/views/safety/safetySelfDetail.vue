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
          <span>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</span>
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
        <li>
          <span>复核结果:</span>&nbsp;&nbsp;&nbsp;
          <!-- <span >已完成整改</span> -->
          <button class="hasComplete">已完成整改</button>
        </li>
        <li>
          <span>复核人:</span>&nbsp;&nbsp;&nbsp;
          <span>已完成整改</span>
        </li>
        <li>
          <span>复核时间:</span>&nbsp;&nbsp;&nbsp;
          <span>已完成整改</span>
        </li>
        <li style="font-weight:600;">
          <span>不通过原因:</span>&nbsp;&nbsp;&nbsp;
          <span>已完成整改</span>
        </li>
        <!-- 文件附件 -->
        <li><span>附件:</span></li>
        <img src="../../assets/logo.png" alt="">
        <img src="../../assets/logo.png" alt="">
        
        <span class="checkPerson">复核人</span>
      </ul>
    </div>
    <div class="zgList">
      <p style="color:white;">123</p>
      <ul>
        <li style="border-bottom: 1px dashed #ccc;">
          <span>安全隐患&nbsp;<i style="background:#ffc300;padding:.02rem;">(111级)</i>:</span>&nbsp;&nbsp;&nbsp;
          <span>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</span>
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
        <li>
          <span>复核结果:</span>&nbsp;&nbsp;&nbsp;
          <!-- <span >已完成整改</span> -->
          <button class="hasComplete">已完成整改</button>
        </li>
        <li>
          <span>复核人:</span>&nbsp;&nbsp;&nbsp;
          <span>已完成整改</span>
        </li>
        <li>
          <span>复核时间:</span>&nbsp;&nbsp;&nbsp;
          <span>已完成整改</span>
        </li>
        <li style="font-weight:600;">
          <span>不通过原因:</span>&nbsp;&nbsp;&nbsp;
          <span>已完成整改</span>
        </li>
        <!-- 文件附件 -->
        <li><span>附件:</span></li>
        <img src="../../assets/logo.png" alt="">
        <img src="../../assets/logo.png" alt="">
        
        <span class="checkPerson">复核人</span>
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
      title: "自检详情",
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
      height: 100%;
      float: left;
      text-align: center;
    }
    ul {
      position: relative;
      background-color: #fff;
      width: 100%;
      overflow: hidden;
      padding-left: 0.2rem;
      li {
        display: flex;
        padding: 0.1rem;
        padding-right: 0.3rem;
        align-items: center; //子元素垂直居中

        &:nth-child(7) {
          display: flex;
        }
        span {
          display: inline-block;

          &:nth-child(1) {
            flex: 0 0 30%;
            text-align: center;
          }
          &:nth-child(2) {
            flex: 0 0 70%;
          }
        }
      }
      textarea {
        padding: 0.2rem;
        border-radius: 0.2rem;
        margin-left: 0.1rem;
      }
      .checkPerson {
        box-sizing: border-box;
        display: inline-block;
        position: absolute;
        background-color: #ff8d1a;
        width: 3.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        color: white;
        padding-left: 1rem;
        left: 4.6rem;
        bottom: 0.7rem;
        transform: rotate(-45deg);
      }
      img{
          width: 34%;
          margin-left: .2rem;
      }
    }
  }
  .hasComplete {
    background-color: #d43030;
    // width: 1.5rem;
    color: white;
    padding: 0.1rem;
    border-radius: 0.2rem;
  }
  .pass {
    background-color: #00baad;
    width: 1.5rem;
    color: white;
    padding: 0.1rem;
    border-radius: 0.2rem;
  }
}
/deep/.yd-cell-box {
  margin-bottom: 0 !important;
}
/deep/.yd-cell:after {
  height: 0px !important;
}
</style>
