<template>
  <div id="chart" ref="chart"></div>
</template>

<script>
import echarts from "echarts";
//import { safeExchart } from "@/api/request.js";
export default {
  data() {
    return {
      num: "",
      num2: "",
      num3: ""
    };
  },

  mounted() {
    //this.safetyInit()
  },
  methods: {
    //初始化图表
    safetyInit() {
      safeExchart().then(res => {
        this.num2 = res.rows[0].wkscount; // 未开始
        this.num3 = res.rows[0].ywccount; // 已完成
        this.num = res.rows[0].zcount; // 总数
        this.initChart();
      });
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart); //定义
      let option = {
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text:this.num, // 总计划数
                width: 25,
                height: 30,
                font: "20px  bold"
              },
              left: "center",
              top: "25%"
            },
            {
              type: "text",
              left: "center", // 相对父元素居中
              top: "55%", // 相对父元素上下的位置
              style: {
                fill: "#333333",
                text: ["总计划"],
                font: "12px  Normal"
              }
            }
          ]
        },
        series: [
          {
            type: "pie",
            radius: ["80%", "90%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "normal"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.num2, name: "未开始" }, // value    数据
              { value: this.num3, name: "已完成" }
            ]
          }
        ],
        color: ["#b36d41", "#4CD2DF"]
      };
      this.chart.setOption(option); //展示
    }
  }
};
</script>
<style lang="less" scoped>
#chart {
  width: 100%;
  height: 2rem;
}
</style>
