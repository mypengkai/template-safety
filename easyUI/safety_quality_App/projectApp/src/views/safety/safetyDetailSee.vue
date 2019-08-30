<template>
  <div class="safetyDetailSee">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
    </headerTop>
    <div class="detailSeeConent">
      <div class="detailTop">
        <p class="icon-aliwocanyude">&nbsp;&nbsp;基础信息</p>
        <ul>
          <li>巡检名称：{{dataObj.spxjname}}</li>
          <li>所属部门：{{dataObj.departname}}</li>
          <li>巡检位置：{{dataObj.projectName}}</li>
          <li>检查性质：自检</li>
          <li>检查人：{{dataObj.spCheckUserName}}</li>
          <li>检查时间：{{dataObj.spCreateDateTime}}</li>
          <li>通知人：{{dataObj.spNotifierName}}</li>
          <!-- <li>有隐患项：1，3</li> -->
        </ul>
      </div>
      <div class="detailFoot">
        <p class="icon-alishapes-">&nbsp;&nbsp;整改内容</p>
        <div class="datailSeeBox" v-for="(item,index) in dataList" :key="index">
          <h3>{{index+1}}</h3>
          <ul>
            <li>
              <span>
                隐患(
                <i>{{item.hdGrade}}</i>):
              </span>
              <span>
                <em>{{item.spContent}}</em>
                <p>
                  <!-- <img src="@/assets/img/logo.png" alt /> -->
                  <viewer :images="item.files">
                    <img v-for="(src,index) in item.files" :src="fileURL+src.FilePath" :key="index" />
                  </viewer>
                </p>
              </span>
            </li>
            <li>
              <span>整改要求：</span>
              <span>{{item.srContent}}</span>
            </li>
            <div class="infoList">
              <ol v-for="(value,index) in item.Reply" :key="index">
                <li v-if="value.replayType==0">
                  <span>整改结果：</span>
                  <span>
                    <b>{{value.replayContent}}</b>
                    <b v-if="index==0">第{{index+1}}次</b>
                    
                    <b v-else-if="index==2">第{{index}}次</b>
                    <b v-else>第{{index-1}}次</b>
                  </span>
                </li>
                <li class="fjLi" v-if="value.replayType==1">
                  复核结果：
                  <i v-if="value.replayState==1" style="background:#45b97c">通过</i>
                  <i v-if="value.replayState==2" style="background:#b70000">不通过</i>
                </li>
                <li v-if="value.replayType==1&&value.replayState==2">不通过原因：{{value.replayContent}}</li>
                <li v-if="value.replayType==1&&value.replayState==1">通过原因：{{value.replayContent}}</li>
                <li>整改完成时间：{{value.replayDateTime}}</li>
                <li>{{value.replayType==0? "整改人" :"复核人"}}：{{value.replayUserName}}</li>
                <li>
                  附件：
                  <p>
                    <viewer :images="value.files2">
                      <img
                        v-for="(src,index) in value.files2"
                        :src="fileURL+src.FilePath"
                        :key="index"
                      />
                    </viewer>
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
import { selfCheck } from "@/api/request.js";
export default {
  components: { headerTop },
  data() {
    return {
      title: "最终详情",
      id: this.$route.query.id,
      dataObj: {},
      dataList: []
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    getInit() {
      selfCheck({ id: this.$route.query.id }).then(res => {
        console.log(res);
        if (res.success == 0) {
          this.dataObj = res.attributes;
          this.dataList = res.rows;
        }
      });
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
          // &:last-child {
          //   color: #b70000;
          // }
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
              overflow: hidden;
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
             
            }
            .fjLi {
              border-top: 1px dashed #ccc;
              padding-top: 0.1rem;
              i {
                color: #fff;
                padding: 0.1rem 0.3rem;
                border-radius: 0.2rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
