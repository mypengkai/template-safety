<template>
  <div class="addplan" style="padding-top:1rem;background:#efeff4; padding-bottom:0.2rem">
    <headerTop :title="title">
      <span
        slot="topLeft"
        class="icon-aliarrow-left- iconBack"
        @click="$router.push({path:'/safetyPlanMenu'})"
      ></span>
      <span slot="topRight" class="padd" @click="addplancheck" v-preventReClick="3000">保存</span>
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
            maxlength="30"
            style="background:#ebf0f2;padding:.1rem;"
            v-model="formData.sppName"
          ></yd-textarea>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/contacts">
          <span slot="left">巡检部门</span>
          <span slot="right" v-if="!CheckDepart">请选择</span>
          <span slot="right" v-if="CheckDepart">{{CheckDepart.name}}</span>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/branch">
          <span slot="left">巡检位置</span>
          <span slot="right" v-if="!projectName">请选择</span>
          <span slot="right" v-if="projectName">
            <p
              v-for="(item,index) in projectName.split(',')"
              :key="index"
              style="text-align:left;padding-left:.4rem"
            >{{++index+':'+item}}</p>
          </span>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/checkXz">
          <span slot="left">
            巡检性质
            <span style="color:#d71345">*</span>
          </span>
          <span slot="right" v-if="!InspectionPropertyName">请选择</span>
          <span slot="right" v-if="InspectionPropertyName">{{InspectionPropertyName}}</span>
        </yd-cell-item>
        <yd-cell-item arrow style="background:#fff" type="link" href="/CheckItem">
          <span slot="left">
            检查项
            <span style="color:#d71345">*</span>
          </span>
          <span slot="right" v-if="!PlanDanger">请选择</span>
          <span slot="right" v-if="PlanDanger">
            <p
              v-for="(item,index) in PlanDanger"
              :key="index"
              style="text-align:left;padding-left:0.4rem"
            >{{item.hdName}}</p>
          </span>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/ZGren">
          <span slot="left">
            检查人
            <span style="color:#d71345">*</span>
          </span>
          <span slot="right" v-if="!CheckPerson">请选择</span>
          <span slot="right" v-if="CheckPerson">{{CheckPerson.name}}</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/notifier">
          <span slot="left">通知人</span>
          <span slot="right" v-if="!notifier">请选择</span>
          <span slot="right" v-if="notifier">{{notifier.names[0]}}</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">开始日期</span>
          <yd-datetime type="date" v-model="formData.sppBeginDate" slot="right" ></yd-datetime>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">结束日期</span>
          <yd-datetime type="date" v-model="formData.sppEndDate" slot="right" ></yd-datetime>
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
    <!-- <Attach
      style="padding-top:.2rem;"
      :attachList="fileList.files"
      :delAttachList="delProgressList"
      :readonly="false"
      :sourceType="3"
    ></Attach> -->
  </div>
</template>
<script>
import headerTop from "@/components/headerTop";
import Attach from "@/components/Attach.vue";
import { mapGetters } from "vuex";
import { safetyAddResult, addsafetyPlancheck } from "@/api/request.js";
export default {
  components: { headerTop, Attach },
  name: "addPlan",
  data() {
    return {
      title: "新增安全计划",
      date: "",
      spCreatePersonName: "", // 创建人
      fileList: {
        files: [], // 图片
        type: "SafetyReply"
      },
      delProgressList: [],
      formData: {
        projectId: "", // 分部分项
        sppName: "", //计划名称
        ipId: "", // 巡检性质 id
        sppCheckUserId: "", // 检查人id
        sppBeginDate: "", // 开始时间
        sppEndDate: "", // 结束时间
        sppContent: "", // 巡检内容（检查项）
        sppNotifier: "", // 通知人id
        sppIsCreateSafetyPatrol: 0, // 是否创建（默认0）
        sppDepartmentId: "", // 巡检部门id
        filename: "", // 图片名称
        filepath: "", // 图片路径
        spCreatePersonId: "" // 创建人id
      },
    };
  },
  computed: {
    ...mapGetters([
      "CheckDepart",
      "projectName",
      "projectId",
      "InspectionPropertyId",
      "InspectionPropertyName",
      "PlanDanger",
      "CheckPerson",
      "notifier"
    ])
  },
  created() {
    
    this.getuserName();
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
    // callback(){
    //      var currentDate = new Date().toDateString();
    //      console.log(currentDate);
    //      var checkDate = new Date(this.formData.sppBeginDate).toDateString();
    //      console.log(checkDate)
         
    // },


    getuserName() {
      let nowTime = new Date();
      this.formData.sppBeginDate = nowTime
        .toLocaleDateString()
        .replace(/\//g, "-");
      this.formData.sppEndDate = nowTime
        .toLocaleDateString()
        .replace(/\//g, "-");
      this.spCreatePersonName = JSON.parse(
        localStorage.getItem("userinfo")
      ).realname; // 创建人
      this.formData.spCreatePersonId = JSON.parse(
        localStorage.getItem("userinfo")
      ).id; // 创建人
    },
    // 新增
    async addplancheck() {
      let formData = new FormData();
      formData.append("type", this.fileList.type);
      if (this.fileList.files.length > 0) {
        for (let key in this.fileList.files) {
          formData.append("file", this.fileList.files[key].file);
        }
      }
      await safetyAddResult(formData).then(res => {
        if (res.success == 0) {
          res.obj.forEach(e => {
            this.formData.filepath += e.filepath + ",";
            this.formData.filename += e.filename + ",";
          });
          this.$dialog.toast({
            mes: "上传成功",
            timeout: 1500
          });
        } 
      });
      var arr = [];
      for (let item of this.PlanDanger) {
        arr.push(item.id);
        //检查项
        this.formData.sppContent = arr.toString();
      }
      //巡检部门ID
      this.formData.sppDepartmentId = this.CheckDepart.id;
      //巡检位置
      this.formData.projectId = this.projectId;
      //巡检性质
      this.formData.ipId = this.InspectionPropertyId;
      //检查人
      this.formData.sppCheckUserId = this.CheckPerson.id;
      //通知人
      this.formData.sppNotifier = this.notifier.ids[0];

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
          this.$store.commit("setCheckDepart", "");
          this.$store.commit("setProjectName", "");
          this.$store.commit("setProjectId", "");
          this.$store.commit("setInspectionPropertyId", "");
          this.$store.commit("setInspectionPropertyName", "");
          this.$store.commit("setPlanDanger", "");
          this.$store.commit("setCheckPerson", "");
          this.$store.commit("setNotifier", "");
          this.$destroy(true);
          this.$router.push({ path: "/safetyList" });
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
