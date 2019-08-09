<template>
  <div>
    <headerTop :title="title"></headerTop>
    <div class="content">
      <h3>
        <i class="icon-aliwocanyude"></i>&nbsp;&nbsp;基础信息
      </h3>
      <div class="information">
        <p>
          <span>巡检名称:</span>
          <span>天不下雨天不刮风天上有太阳</span>
        </p>
        <p>
          <span>巡检名称:</span>
          <span>天不下雨天不刮风天上有太阳</span>
        </p>
        <p>
          <span>巡检名称:</span>
          <span>天不下雨天不刮风天上有太阳</span>
        </p>
        <p>
          <span>巡检名称:</span>
          <span>天不下雨天不刮风天上有太阳</span>
        </p>
        <p>
          <span>巡检名称:</span>
          <span>天不下雨天不刮风天上有太阳</span>
        </p>
        <p>
          <span>巡检名称:</span>
          <span>天不下雨天不刮风天上有太阳</span>
        </p>
      </div>
      <h3>
        <i class="icon-alishapes-"></i>&nbsp;&nbsp;整改内容
      </h3>
      <div class="zglist">
        <ul>
          <li>1</li>
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
            <p>整改完成时间</p>
            <p>作业指导书,安全技术交底编制,发放不及时,完整性,准确性,可行性等不符合管理要求</p>
          </li>
          <li style="height:1rem;">
            <p>指定整改人:</p>
            <p>
              <button style="width:1.8rem;height:.3rem;background:#2A82E4;color:white;">选择整改人</button>
            </p>
          </li>
        </ul>
      </div>
      <h3>
        
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left"><i class="icon-alitouxiang"></i>&nbsp;&nbsp;通知人</span>
            <span slot="right">右边内容一</span>
          </yd-cell-item>

        </yd-cell-group>
      </h3>
       <yd-button size="large" type="primary" style="background:#2A82E4">保存并下发</yd-button>
    </div>
    
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
export default {
  components: {
    headerTop
  },
  data() {
    return {
      title: "自检整改单下发"
    };
  }
};
</script>
<style lang="less" scoped>
.content {
  
  padding: 0.2rem 0.1rem;
  padding-top: 1rem;
  h3 {
    padding-left: 0.4rem;
    font-size: .28rem;
    font-weight: 600;
    color: black;
    input {
    }
  }
  .information {
    margin: 0.1rem 0;
    border: 1px solid #ccc;
    border-radius: 0.1rem;
    padding-left: 0.7rem;
    p {
      color: black;
    }
  }

  ul {
    position: relative;
    background: #fff;
    behavior: url(/PIE.htc);
    margin-bottom: 0.2rem;
    li {
      display: flex;

      &:first-child {
        width: 0.6rem;
        height: 100%;
        text-align: center;
        background: #ffc300;
        position: absolute;
        left: 0.1rem;
        justify-content: center; //子元素水平居中
        align-items: center; //子元素垂直居中
        display: -webkit-flex;
        color: white;
      }
      &:not(:first-child) {
        margin-left: 1rem;
        padding: 0.1rem 0.4rem;
        align-items: center;
        display: -webkit-flex;
        border-bottom: 1px dashed #ccc;
        p:first-child {
          flex: 0 0 30%;
        }
        p:last-child {
          flex: 0 0 70%;
        }
      }
      &:nth-child(2) {
        position: relative;
        span {
          position: absolute;
          bottom: 0.1rem;
          right: 0.3rem;
          background-color: #ffc300;
          border-radius: 0.1rem;
          padding: .01rem;
        }
      }
      &:last-child{
        border-bottom: none;
      }
    }
  }
}
</style>
