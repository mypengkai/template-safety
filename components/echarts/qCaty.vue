<template>
  <div id="chart" ref="chart"></div>
</template>

<script>
import echarts from "echarts";
import { getHiddens } from "@/api/request.js";
export default {
  data() {
    return {
        nowMonth:'',//当前月份
        hiddenList:[],  // 隐患等级数
        hiddenOne:'',
        hiddenTwo:'',
        hiddenThree:'',
        hiddenFour:'',
        hiddenAll:null,
    };
  },
  created(){
      var date=new Date();
      this.nowMonth = date.getMonth()+1;
  },
  mounted() {
    this.hiddenInit()
  },
  methods: {
    //初始化图表
    hiddenInit() {
      getHiddens({monthDate:''}).then(res => {
        if(res.success =="0"){
            this.hiddenList = res.rows[0];          
            this.hiddenOne = res.rows[0].one;
            this.hiddenTwo = res.rows[0].tow;
            this.hiddenThree = res.rows[0].three;
            this.hiddenFour = res.rows[0].four;
            this.hiddenAll = res.rows[0].zong
            this.initChart();
            this.$emit("setNumber",this.hiddenList)
        }
        
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
                text:this.hiddenAll, // 总计划数
                width: 25,
                height: 30,
                font: "20px  bold"
              },
              left: "center",
              top: "30%"
            },
            {
              type: "text",
              left: "center", // 相对父元素居中
              top: "55%", // 相对父元素上下的位置
              style: {
                fill: "#333333",
                text: ["总数"],
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
              { value: this.hiddenOne, name: "Ⅰ级" }, // value    数据
              { value: this.hiddenTwo, name: "Ⅱ级" },
              { value: this.hiddenThree, name: "Ⅲ级" }, // value    数据
              { value: this.hiddenFour, name: "Ⅳ级" },
            ]
          }
        ],
        color: ["#00ae9d", "#b2d235","#f47920","#d71345"]
      };
      this.chart.setOption(option); //展示
    }
  }
};
</script>
<style lang="less" scoped>
#chart {
  width: 100%;
  height: 2.4rem;
}
</style>
