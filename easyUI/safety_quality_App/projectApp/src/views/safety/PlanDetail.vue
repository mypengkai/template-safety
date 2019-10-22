<template>
  <div class="content">
    <headerTop :title="title">
      <span
        slot="topLeft"
        class="icon-aliarrow-left- iconBack"
        @click="$router.push({ path:'/safetyList'})"
      ></span>
    </headerTop>
    <ul class="planDetail">
      <li>
        巡检名称:
        <span>{{detailObj.sppName}}</span>
      </li>
      <li>
        检查性质:
        <span>{{detailObj.ipName}}</span>
      </li>
      <li>
        检查人:
        <span>{{detailObj.sppCheckUserName}}</span>
      </li>
      <li>
        巡检部门:
        <span>{{detailObj.sppDepartmentName}}</span>
      </li>
      <li>
        巡检位置:
        <!-- <span>{{detailObj.qppDepartmentName}}</span> -->
        <span
          style="padding-left:.4rem;display:block"
          v-for="(item,index) in (detailObj.projectName||'').split(',')"
          :key="index"
        >{{++index+':'+item}}</span>
      </li>
    </ul>
    <ul class="planDate">
      <li>
        计划开始日期:
        <span>{{detailObj.sppBeginDate}}</span>
      </li>
      <li>
        计划完工日期:
        <span>{{detailObj.sppEndDate}}</span>
      </li>
      <li>
        工期(工日):
        <span>{{parseInt(detailObj.sppTimeLimit)}}</span>
      </li>
    </ul>
    <ul class="planDate">
      <li>
        检查项:
        <!-- <span>{{detailObj.qppContent}}</span> -->
        <span
          style="padding-left:.2rem;display:block"
          v-for="(item,index) in detailRows"
          :key="index"
        >{{++index+':'+item.hdContent}}</span>
      </li>
    </ul>
    <ul class="checkMen">
      <li>
        通知人:
        <span>{{detailObj.sppNotifierName}}</span>
      </li>
      <li>
        填报人:
        <span>{{detailObj.sppCreatePerson}}</span>
      </li>
    </ul>
    <yd-button
      size="large"
      type="primary"
      style="margin-bottom:.1rem;width:90%;margin-left:5%;background:rgb(43, 121, 237)"
      v-if="detailObj.sppCheckUserId==userId"
      @click.native="addMore"
    >开始检查</yd-button>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import { safetyjhxiangqing } from "@/api/request.js";
import qs from "qs";
export default {
  components: { headerTop },
  data() {
    return {
      title: "计划详情",
      id: this.$route.query.id,
      userId: "",
      detailObj: {},
      detailRows:'',
      sppContent: [],
      formData: {
        id: this.$route.query.id
      },
      isAble:true
    };
  },
  created() {
    this.getDetailList();
    this.userId = JSON.parse(localStorage.getItem("userinfo")).id;
  },
  methods: {
    getDetailList() {
      safetyjhxiangqing(this.id).then(res => {
        console.log(res.obj)
        this.detailObj = res.obj;
        this.detailRows = res.rows
      });
    },
    addMore() {
      this.$store.commit("setPlanDetail", this.detailRows);
      this.$router.push({ path: "/safetyPlanAdd", query: { id: this.id,name:this.detailObj.sppName,notifier:this.detailObj.sppNotifierName,sppNotifier:this.detailObj.sppNotifier } });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  background-color: #efeff4;
}

/deep/.yd-back-icon {
  color: white !important;
}
/deep/.yd-navbar-center-title {
  color: white !important;
}
.planDetail {
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  background-color: white;
  li {
    color: #ccc;
    span {
      color: black;
      margin-left: 0.1rem;
    }
    padding: 0.2rem;
    font-size: 0.25rem;
  }
}
.planDate {
  margin-bottom: 0.2rem;
  background-color: white;
  li {
    color: #ccc;
    span {
      color: black;
      margin-left: 0.1rem;
    }
    padding: 0.2rem;
    font-size: 0.25rem;
  }
}
.checkItem {
  margin-bottom: 0.2rem;
  padding: 0.2rem;
  background-color: white;
}
.checkMen {
  margin-bottom: 0.2rem;
  background-color: white;
  li {
    color: #ccc;
    span {
      color: black;
      margin-left: 0.1rem;
    }
    padding: 0.2rem;
    font-size: 0.25rem;
  }
}
</style>
