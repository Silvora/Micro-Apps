<template>
  <div id="gauge"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      option: {},
      gaugeData: [],
    };
  },
  mounted() {
    this.gaugeData = [
      {
        value: 20,
        name: "Perfect",
        title: {
          offsetCenter: ["0%", "-30%"],
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ["0%", "-20%"],
        },
      },
      {
        value: 40,
        name: "Good",
        title: {
          offsetCenter: ["0%", "0%"],
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ["0%", "10%"],
        },
      },
      {
        value: 60,
        name: "Commonly",
        title: {
          offsetCenter: ["0%", "30%"],
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ["0%", "40%"],
        },
      },
    ];
    this.option = {
      series: [
        {
          type: "gauge",
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false,
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#464646",
            },
          },
          axisLine: {
            lineStyle: {
              width: 40,
            },
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            distance: 10,
          },
          data: this.gaugeData,
          title: {
            fontSize: 10,
          },
          detail: {
            width: 50,
            height: 2,
            fontSize: 10,
            color: "auto",
            borderColor: "auto",
            borderRadius: 20,
            borderWidth: 1,
            formatter: "{value}%",
          },
        },
      ],
    };

    this.initChart();
  },

  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("gauge"));
      // 绘制图表

      window.onresize = function () {
        myChart.resize();
      };
      myChart.setOption(this.option);
    },
  },
};
</script>

<style>
#gauge {
  width: 100%;
  height: 50%;
}
</style>