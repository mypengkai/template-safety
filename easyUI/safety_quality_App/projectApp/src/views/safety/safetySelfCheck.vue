<template>
  <div class="safetySelfCheck">
    <headerTop :title="title">
      <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="routerBack"></span>
      <span slot="topRight" class="icon-alixinzeng iconBack" @click="addSafetySelf"></span>
    </headerTop>
    <search></search>
    <div class="safetySelfConent" @click="safetyDetail">
      <ul>
        <li>1</li>
        <li>
          <span>巡检名称：AQXJ20190808_001</span>
          <span>待整改</span>
        </li>
        <li>所属部门：工程部</li>
        <li>巡检性质：自检</li>
        <li>检查人：李白</li>
        <li>检查时间：2019-08-08 08：45：33</li>
        <li>
          <span>检查总数：3</span>
          <span>安全：1项</span>
          <span>有隐患：2项</span>
        </li>
        <li>整改数量/整改完成数量(2/3)</li>
      </ul>

      <ul>
        <li>1</li>
        <li>
          <span>巡检名称：AQXJ20190808_001</span>
          <span>待整改</span>
        </li>
        <li>所属部门：工程部</li>
        <li>巡检性质：自检</li>
        <li>检查人：李白</li>
        <li>检查时间：2019-08-08 08：45：33</li>
        <li>
          <span>检查总数：3</span>
          <span>安全：1项</span>
          <span>有隐患：2项</span>
        </li>
        <li>整改数量/整改完成数量(2/3)</li>
      </ul>

      <ul>
        <li>1</li>
        <li>
          <span>巡检名称：AQXJ20190808_001</span>
          <span>待整改</span>
        </li>
        <li>所属部门：工程部</li>
        <li>巡检性质：自检</li>
        <li>检查人：李白</li>
        <li>检查时间：2019-08-08 08：45：33</li>
        <li>
          <span>检查总数：3</span>
          <span>安全：1项</span>
          <span>有隐患：2项</span>
        </li>
        <li>整改数量/整改完成数量(2/3)</li>
      </ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue";
import search from "@/components/search.vue";
import { safetySelfList } from "@/api/request.js";
export default {
  name: "safetySelfCheck",
  components: {
    headerTop,
    search
  },
  data() {
    return {
      title: "自主查询",
      formList: [],
      formData: {
        offset: 1, // 开始页
        limit: 10, // 每页数量
        spBeginDate: "", // 开始时间
        spEndDate: "", // 结束时间
        spxjname: "", // 巡检名称
        sprRectificationState: "" // 状态（-1：整改待发送 0：待整改 1：待复核 2：通过 3：不通过）
      }
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    addSafetySelf() {
      this.$router.push({ path: "/safetySelfAdd" });
    },
    safetyDetail() {
      this.$router.push({ path: "/safetyzgxf" });
    },
    //初始化数据
    getInit() {
      safetySelfList(this.formData).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.safetySelfCheck {
  padding-top: 1rem;
  background: #fff;
  height: 100%;
  .safetySelfConent {
    margin-top: 1rem;
    padding: 0.2rem;
    overflow: hidden;
    ul {
      position: relative;
      background: #fff;
      border: 1px solid #ccc;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      -webkit-box-shadow: #666 0px 0px 10px;
      -moz-box-shadow: #666 0px 0px 10px;
      box-shadow: #666 0px 0px 10px;
      behavior: url(/PIE.htc);
      margin-bottom: 0.2rem;
      li {
        height: 0.6rem;
        line-height: 0.6rem;
        &:first-child {
          width: 0.4rem;
          height: 100%;
          text-align: center;
          background: #ccc;
          position: absolute;
          left: 0.1rem;
          justify-content: center; //子元素水平居中
          align-items: center; //子元素垂直居中
          display: -webkit-flex;
        }
        &:not(:first-child) {
          margin-left: 0.5rem;
          padding: 0 0.4rem;
        }
        &:nth-child(2) {
          display: flex;
          justify-content: space-between;
          span:first-child {
            color: #2b25eb;
            font-weight: bold;
          }
          span:last-child {
            width: 1.2rem;
            height: 0.5rem;
            margin-top: 0.2rem;
            line-height: 0.5rem;
            text-align: center;
            background: #ffc20e;
            color: #fff;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            border-radius: 6px;
          }
        }
        &:nth-child(7) {
          span:first-child {
            color: #2b25eb;
            font-weight: bold;
          }
          span:nth-child(2) {
            background: green;
            color: #fff;
            margin-left: 0.4rem;
            padding: 0.1rem;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
          span:last-child {
            background: red;
            color: #fff;
            margin-left: 0.4rem;
            padding: 0.1rem;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
        }
        &:last-child {
          color: #f26522;
        }
      }
    }
  }
}
</style>
