<template>
  <div id="chart" ref="chart"></div>
</template>

<script>
import echarts from "echarts";
//import { qualityExchart } from "@/api/request.js";
export default {
 
  data() {
    return {
      qwkscount: "",  // 未开始
      qywccount: "",  // 已完成
      qzcount: ""     // 总
    };
  },
  mounted() {
      //this.qualityInit()
  },
  methods: {
    qualityInit() {
      qualityExchart().then(res => {
        this.qwkscount = res.rows[0].wkscount; // 未开始
        this.qywccount = res.rows[0].ywccount; // 已完成
        this.qzcount = res.rows[0].zcount; // 总数
        this.initChart()
      });
     
    },

    //初始化图表
    initChart() {
      this.chart = echarts.init(this.$refs.chart); //定义
      let option = {
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text: this.qzcount, // 总计划数
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
              { value: this.qwkscount, name: "未开始" }, // value    数据
              { value: this.qywccount, name: "已完成" }
            ]
          }
        ],
        color: ["#b36d41","#4CD2DF"]
      };
      this.chart.setOption(option); //展示
    },
  }
};
</script>
<style lang="less" scoped>
#chart {
  width: 100%;
  height: 2rem;
}
</style>
