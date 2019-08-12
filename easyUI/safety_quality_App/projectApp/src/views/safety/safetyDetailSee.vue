<template>
  <div class="safetyDetailSee">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <div class="detailSeeConent">
      <div class="detailTop">
        <p class="icon-alibubble-rounded-">基础信息</p>
        <ul>
          <li>巡检名称：AQJC20190808-001</li>
          <li>所属部门：安质部</li>
          <li>巡检位置：大桥</li>
          <li>检查性质：自检</li>
          <li>检查人：韩信</li>
          <li>检查时间：2019-08-08 10:10:20</li>
          <li>通知人：花木兰，百里玄策</li>
          <li>有隐患项：1，3</li>
        </ul>
      </div>
      <div class="detailFoot">
        <p class="icon-alibubble-rounded-">整改内容</p>
        <div class="datailSeeBox">
          <h3>1</h3>
          <ul>
            <li>
              <span>
                隐患(
                <i>3级</i>):
              </span>
              <span>
                <em>作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书</em>
                <p>
                  <img src="@/assets/img/logo.png" alt />
                </p>
              </span>
            </li>
            <li>
              <span>整改要求：</span>
              <span>作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指导书作业指</span>
            </li>
            <div class="infoList">
              <ol>
                <li>
                  <span>整改结果：</span>
                  <span>
                    <b>已完成</b>
                    <b>第一次</b>
                  </span>
                </li>
                <li>整改完成时间：2019-08-12 9：18：30</li>
                <li>整改人：韩信</li>
                <li>
                  附件：
                  <p>
                    <img src="@/assets/img/logo.png" alt />
                  </p>
                </li>
                <li class="fjLi">
                  复核结果：
                  <i>未通过</i>
                </li>
                <li>复核人：李白</li>
                <li>复核时间：2019-08-12 9：18：30</li>
                <li>不通过原因：整改要求不复核</li>
                <li>
                  附件：
                  <p>
                    <img src="@/assets/img/logo.png" alt />
                  </p>
                </li>
              </ol>
              <ol>
                <li class="fjLi">
                  <span>整改结果：</span>
                  <span>
                    <b>已完成</b>
                    <b>第一次</b>
                  </span>
                </li>
                <li>整改完成时间：2019-08-12 9：18：30</li>
                <li>整改人：韩信</li>
                <li>
                  附件：
                  <p>
                    <img src="@/assets/img/logo.png" alt />
                  </p>
                </li>
                <li class="fjLi">
                  复核结果：
                  <i>未通过</i>
                </li>
                <li>复核人：李白</li>
                <li>复核时间：2019-08-12 9：18：30</li>
                <li>不通过原因：整改要求不复核</li>
                <li>
                  附件：
                  <p>
                    <img src="@/assets/img/logo.png" alt />
                  </p>
                </li>
              </ol>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
export default {
  components: { headerTop },
  data() {
    return {
      title: "整改详细信息"
    };
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.safetyDetailSee {
  height: 100%;
  background: #fff;
  padding-top: 1rem;
  .detailSeeConent {
    padding: 0.2rem;
    .detailTop {
      line-height: 0.6rem;
      margin-bottom: 0.2rem;
      p {
        margin-left: 0.4rem;
        font-weight: bold;
        font-size: 0.3rem;
      }
      ul {
        border: 1px solid #ccc;
        background: #fff;
        border: 1px solid #ccc;
        -webkit-box-shadow: 1px 1px 5px #888888;
        -moz-box-shadow: 1px 1px 5px #888888;
        box-shadow: 1px 1px 5px #888888;
        behavior: url(/PIE.htc);
        margin-bottom: 0.2rem;
        li {
          margin-left: 0.8rem;
          &:last-child {
            color: #b70000;
          }
        }
      }
    }
    .detailFoot {
      p {
        margin-left: 0.4rem;
        font-weight: bold;
        font-size: 0.3rem;
        line-height: 0.6rem;
      }
      .datailSeeBox {
        border: 1px solid #ccc;
        height: 100%;
        position: relative;
        h3 {
          position: absolute;
          width: 0.6rem;
          height: 100%;
          font-size: 0.3rem;
          font-weight: bold;
          color: #fff;
          background: #c8bb48;
          justify-content: center; //子元素水平居中
          align-items: center; //子元素垂直居中
          display: -webkit-flex;
        }
        ul {
          margin-left: 0.4rem;
          padding: 0.1rem 0.2rem 0.1rem 0.5rem;
          li {
            &:nth-child(1) {
              display: -webkit-flex; /* Safari */
              display: flex;
              justify-content: flex-start;
              border-bottom: 1px solid #ccc;
              span:first-child {
                width: 30%;
                display: flex;
                align-items: center; //子元素垂直居中
                i {
                  font-size: 0.3rem;
                  color: #f47920;
                }
              }

              span:last-child {
                width: 70%;
              }
            }
            p {
              width: 1rem;
              height: 1rem;
              margin: 0.1rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            &:nth-child(2) {
              display: -webkit-flex; /* Safari */
              display: flex;
              justify-content: flex-start;
              border-bottom: 1px dashed #ccc;
              span:first-child {
                display: flex;
                align-items: center; //子元素垂直居中
                width: 30%;
              }
              span:last-child {
                width: 70%;
              }
            }
          }
        }
        .infoList {
          ol {
            li {
              line-height: 0.6rem;
              &:nth-child(1) {
                display: -webkit-flex; /* Safari */
                display: flex;
                justify-content: flex-start;
                border-bottom: 1px solid #ccc;
                span:first-child {
                  display: flex;
                  align-items: center; //子元素垂直居中
                  width: 30%;
                }
                span:last-child {
                  width: 70%;
                  display: flex;
                  justify-content: space-between;
                  b:first-child {
                    display: flex;
                    align-items: center; //子元素垂直居中
                    color: #6060ff;
                    font-size: 0.3rem;
                  }
                  b:last-child {
                    border: 1px solid #6060ff;
                    border-radius: 0.1rem;
                    margin: 0.1rem 0;
                    padding: 0 0.2rem;
                    color: #6060ff;
                  }
                }
              }
              &:nth-child(5) {
                i {
                  background: #b70000;
                  color: #fff;
                  padding: 0.1rem 0.3rem;
                  border-radius: 0.2rem;
                }
              }
              &:nth-child(8) {
                font-weight: bold;
              }
            }
            .fjLi {
              border-top: 1px dashed #ccc;
              padding-top: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>
