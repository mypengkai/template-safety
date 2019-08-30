<template>
  <div class="addplan" style="padding-top:1rem;background:#efeff4; padding-bottom:0.2rem">
    <headerTop :flag="flag" :title="title">
      <span style="color:#fff;" @click="addplancheck">确定</span>
    </headerTop>
    <div class="conents">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">
            计划名称
            <span style="color:#d71345">*</span>
          </span>
        </yd-cell-item>
        <yd-cell-item>
          <yd-textarea
            slot="right"
            placeholder="请输入计划名称"
            maxlength="50"
            style="background:#ebf0f2"
            v-model="formData.sppName"
          ></yd-textarea>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/contacts">
          <span slot="left">巡检部门</span>
          <span slot="right" v-if="!departAll">请选择</span>
          <span slot="right" v-if="departAll">{{departAll.name}}</span>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/branch">
          <span slot="left">巡检位置</span>
          <span slot="right" v-if="!projectName">请选择</span>
          <span slot="right" v-if="projectName">{{projectName}}</span>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/checkXz">
          <span slot="left">
            巡检性质
            <span style="color:#d71345">*</span>
          </span>
          <span slot="right" v-if="!inspectionPropertyName">请选择</span>
          <span slot="right" v-if="inspectionPropertyName">{{inspectionPropertyName}}</span>
        </yd-cell-item>
        <yd-cell-item arrow style="background:#fff" type="link" href="/safetyCheckItem">
          <span slot="left">
            检查项
            <span style="color:#d71345">*</span>
          </span>
          <span slot="right" v-if="!qpContent">请选择</span>
          <span slot="right" v-if="qpContent">
            <p
              v-for="(item,index) in qpContent.split(',')"
              :key="index"
              style="text-align:left;padding-left:0.4rem"
            >{{item}}</p>
          </span>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/lianxiren">
          <span slot="left">
            检查人
            <span style="color:#d71345">*</span>
          </span>
          <span slot="right" v-if="!checkPerson">请选择</span>
          <span slot="right" v-if="checkPerson">{{checkPerson}}</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/contact">
          <span slot="left">通知人</span>
          <span slot="right" v-if="!qpNotifierName">请选择</span>
          <span slot="right" v-if="qpNotifierName">{{qpNotifierName}}</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">开始日期</span>
          <yd-datetime type="date" v-model="formData.sppBeginDate" slot="right"></yd-datetime>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">结束日期</span>
          <yd-datetime type="date" v-model="formData.sppEndDate" slot="right"></yd-datetime>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">工期(天)</span>
          <span slot="right">{{date}}天</span>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">创建人</span>
          <span slot="right">{{spCreatePersonName}}</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <!-- 文件附件 -->
    <Attach
      :attachList="fileList.files"
      :delAttachList="delProgressList"
      :readonly="false"
      :sourceType="3"
    ></Attach>
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import Attach from "@/components/Attach.vue";
import { mapGetters } from "vuex";
// import { addsafetyPlancheck,uploadFile } from "@/api/request.js";

export default {
  components: { headerTop, Attach },
  name: "safeplan",
  data() {
    return {
      title: "新增安全计划",
      flag: true,
      date: "",
      spCreatePersonName: "", // 创建人
      fileList: {
        files: [], // 图片
        name: "safetyPlan"
      },
      delProgressList: [],
      formData: {

      }
    };
  },
  computed: {
    ...mapGetters([

    ])
  },
  created() {
    this.getuserName();
    // this.getNowtime();
  },
  updated() {
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = new Date(this.formData.sppBeginDate); //将-转化为/，使用new Date
    var dateEnd = new Date(this.formData.sppEndDate); //获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    if (dateDiff < 0) {
      this.$dialog.toast({
        mes: "结束时间不能小于开始时间,请重新选择时间",
        timeout: 1500
      });
      return false;
    }
    this.date = Math.floor(dateDiff / (24 * 3600 * 1000) + 1); //计算出相差天数
    
  },
  methods: {

    getuserName() {
      let nowTime = new Date();
      this.formData.sppBeginDate = nowTime.toLocaleDateString().replace(/\//g, "-");
      this.formData.sppEndDate = nowTime.toLocaleDateString().replace(/\//g, "-"); 
      this.spCreatePersonName = localStorage.getItem("username"); // 创建人
    },
    // 新增
    async addplancheck() {
      let formData = new FormData();
      formData.append("name", this.fileList.name);
      if (this.fileList.files.length > 0) {
        for (let key in this.fileList.files) {
          formData.append("file", this.fileList.files[key].file);
        }
      }
      await uploadFile(formData).then(res => {
        if (res.success == 0) {
          res.obj.forEach(e => {
            this.formData.filepath += e.filepath + ",";
            this.formData.filename += e.filename + ",";
          });
          this.$dialog.toast({
            mes: "上传成功",
            timeout: 1500
          });
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
      this.formData.projectId = this.projectId;
      this.formData.sppCheckUserId = this.qpCheckUserId;
      this.formData.sppNotifier = this.qpCheckUserId;
      this.formData.ipId = this.inspectionPropertyId;
      this.formData.sppContent = this.qpContent;
      this.formData.sppDepartmentId = this.departAll.id;
      if (this.formData.sppName == "") {
        this.$dialog.toast({
          mes: "请输入计划名称",
          timeout: 1500
        });
        return false;
      }
      if (this.formData.projectId == "") {
        this.$dialog.toast({
          mes: "请选择巡检位置",
          timeout: 1500
        });
        return false;
      }
      if (this.formData.sppCheckUserId == "") {
        this.$dialog.toast({
          mes: "请选择检查人",
          timeout: 1500
        });
        return false;
      }

      if (this.formData.ipId == "") {
        this.$dialog.toast({
          mes: "请选择巡检性质",
          timeout: 1500
        });
        return false;
      }
      if (this.formData.sppContent == "") {
        this.$dialog.toast({
          mes: "请选择检查项",
          timeout: 1500
        });
        return false;
      }
      if (this.formData.sppDepartmentId == "") {
        this.$dialog.toast({
          mes: "请选择部门",
          timeout: 1500
        });
        return false;
      }
      addsafetyPlancheck(this.formData).then(res => {
        if (res.success == 0) {
          this.$dialog.toast({
            mes: "新增计划成功",
            timeout: 2000
          });
          // 清除vuex数据
          this.$store.dispatch("setQpNotifierName", "");
          this.$store.dispatch("setQpNotifierId", "");
          this.$store.dispatch("setInspectionPropertyId", "");
          this.$store.dispatch("setInspectionPropertyName", "");
          this.$store.dispatch("setCheckPerson", "");
          this.$store.dispatch("setQpCheckUserId", "");
          this.$store.dispatch("setQpContent", "");
          this.$store.dispatch("setQpContentId", "");
          this.$store.dispatch("setdepartAll", "");
          this.$store.dispatch("setProjectName", "");
          this.$store.dispatch("setProjectId", "");
          this.$destroy(true);
          this.$router.go(-1);
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 2000
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.addplan {
  .conents {
    .yd-datetime-input,
    .yd-input {
      width: 1%;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      height: 1rem;
      border: none;
      font-size: 0.28rem;
      background: transparent;
      color: #555;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-end;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      text-align: left;
    }
  }
}
</style>
