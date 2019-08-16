<template>
  <div class="zglist">
    <ul v-for="(item,index) in itData" :key="index">
      <li>{{xuhao+1}}</li>
      <li>
        <p>
          安全隐患&nbsp;
          <i style="background:#ffc300;padding:.02rem;">{{"("+item.hdGrade+")"}}</i>:
        </p>
        <p>{{item.hdContent}}</p>
      </li>
      <li>
        <p>整改要求:</p>
        <p>{{item.ZGmethod}}</p>
      </li>
      <yd-cell-group
        style="margin-left:.8rem;font-size:12px;border-bottom: 1px dashed #ccc;margin-bottom:0;"
      >
        <yd-cell-item arrow>
          <span slot="left" style="padding-left:.2rem;">时间段范围：</span>
          <yd-datetime
            start-date="2012-03-16 15:13"
            end-date="2029-10-21 22:21"
            v-model="params.srFinishDate"
            slot="right"
          ></yd-datetime>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group style="margin-left:.8rem;font-size:12px;margin-bottom:0;">
        <yd-cell-item arrow type="link" href="CheckPerson">
          <span slot="left" style="padding-left:.2rem;">选择整改人:</span>
          <span slot="right">{{CheckPerson.Personname}}</span>
        </yd-cell-item>
      </yd-cell-group>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["itData", "BasicData","xuhao"],
  computed: {
    ...mapGetters(["CheckPerson", "notifier"])
  },
  data() {
    return {
      params: {
        id:'', //整改内容ID
        srUserId: "", //整改人ID
        srUserName: "", //整改人名称
        srFinishDate: "", //要求完成时间
        qpCreatePerson: "", //填报人名称
        spCreatePersonId: "" //填报人ID
      }
    };
  },
  created() {
    this.params.id=this.itData.id
    this.params.srUserId = this.CheckPerson.Personid;
    this.params.srUserName = this.CheckPerson.Personname;
    this.params.qpCreatePerson = localStorage.getItem("username");
    this.params.spCreatePersonId = localStorage.getItem("userId");
  },

  
};
</script>
<style lang="less" scoped>
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
      // left: 0.1rem;
      justify-content: center; //子元素水平居中
      align-items: center; //子元素垂直居中
      display: -webkit-flex;
      color: white;
    }
    &:not(:first-child) {
      margin-left: 1rem;
      padding: 0.1rem 0.2rem;
      align-items: center;
      display: -webkit-flex;
      border-bottom: 1px dashed #ccc;

      p:first-child {
        flex: 0 0 32%;
      }
      p:last-child {
        flex: 0 0 68%;
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
        padding: 0.01rem;
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
/deep/.yd-cell-left {
  font-size: 12px;
}
/deep/.yd-cell-right {
  font-size: 12px;
  // padding-left: 2.2rem;
}
/deep/.yd-cell:after {
  height: 0;
}
</style>