<template>
  <div class="zglist">
    <ul class="zgul" v-for="(item,index) in itData" :key="index">
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
      <li>
        <p>检查状态:</p>
        <p v-if="item.sprState == 0" style="color:#45b97c">安全</p>
        <p v-if="item.sprState == 1" style="color:#ed1941">有隐患</p>
      </li>
      <li>
        <p>附件:</p>
        <div class="imgFile">
          <h6>
            <viewer :images="item.ResultFile">
              <img
                v-for="(src,index) in item.ResultFile"
                :src="fileURL+src.sprfFilePath"
                :key="index"
              />
            </viewer>
          </h6>
        </div>
      </li>
      <yd-cell-group
        v-if="item.sprState == 1"
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
      <yd-cell-group
        v-if="item.sprState == 1"
        style="margin-left:.8rem;font-size:12px;margin-bottom:0;"
        @click.native="show4 = true"
      >
        <yd-cell-item arrow close-on-masker="true">
          <span slot="left" style="padding-left:.2rem;">选择整改人:</span>
          <span slot="right">{{params.srUserName}}</span>
        </yd-cell-item>
      </yd-cell-group>
    </ul>
    <yd-popup v-model="show4" position="right">
      <div class="contation">
        <ul>
          <li
            v-for="(item,index) in nodeData"
            :key="index"
            :class="{selected:index == active}"
            @click="checkPreson(item,index)"
          >{{item.realname}}</li>
        </ul>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getPerson } from "@/api/request.js";
export default {
  props: ["itData", "BasicData", "xuhao"],

  data() {
    return {
      show4: false,
      nodeData: [], //树列表数据
      active: null,
      formData: {
        limit: "1000",
        offset: "0"
      },
      CheckState: "", //父组件根据此属性来判别是否需要下发整改
      params: {
        id: "", //整改内容ID
        srUserId: "", //整改人ID
        srUserName: "", //整改人名称
        srFinishDate: "", //要求完成时间
        qpCreatePerson: "", //填报人名称
        spCreatePersonId: "" //填报人ID
      }
    };
  },
  methods: {
    getInit() {
      getPerson(this.formData).then(res => {
        if (res.success == 0) {
          this.nodeData = res.rows;
        }
      });
    },
    checkPreson(item, index) {
      this.active = index;
      this.params.srUserName = item.realname;
      this.params.srUserId = item.id;
    }
  },
  created() {
    this.CheckState = this.itData[0].sprState;
    this.getInit();
    let userinfo = localStorage.getItem("userinfo");
    this.params.id = this.itData[0].id;
    this.params.qpCreatePerson = JSON.parse(userinfo).realname;
    this.params.spCreatePersonId = JSON.parse(userinfo).id;
  }
};
</script>
<style lang="less" scoped>
.zgul {
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
.imgFile {
  width: 100%;
  overflow: hidden;
  h6 {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    img {
      width: 1.2rem;
      height: 1.2rem;
      display: block;
    }
  }
}
.contation {
  padding: 0.2rem;
  ul {
    li {
      padding: 0.1rem 0;
      font-size: 0.36rem;
    }
  }
}
.selected {
  color: #5959ff;
}
/deep/.yd-cell-left {
  font-size: 12px;
}
/deep/.yd-cell-right {
  font-size: 12px;
}
/deep/.yd-cell:after {
  height: 0;
}
</style>