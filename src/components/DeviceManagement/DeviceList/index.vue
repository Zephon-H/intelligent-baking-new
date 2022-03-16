<template>
  <div class="device-list">
    <!--    <v-chart id="data1" class="home-chart"-->
    <!--             :options="dataOptions"/>-->
    <v-chart id="data2" class="home-chart"
             :options="data2"/>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      dataOptions: {
        title: {
          text: '产区排序'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          inverse: true,
          type: 'category',
          data: ['沾益区', '马龙区', '会泽县', '宣威市', '富源县', '师宗县', '罗平县', '麒麟区', '陆良县']
        },
        series: [
          {
            name: '炉数',
            type: 'bar',
            data: [226, 368, 86, 338, 210, 363, 600, 395, 376],
            itemStyle: {
              emphasis: {
                barBorderRadius: 7,
              },
            },
          },
          {
            realtimeSort: true,
            name: '总分',
            type: 'bar',
            data: [18388, 29492, 6851, 26797, 16375, 28280, 46579, 30156, 28234],
          },
        ]
      },
      data2: {
        // title: 'vue中引入ECharts',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        legend: {
          data: ['炉数', '平均分', '总分'],
        },
        xAxis: [{
          type: 'category',
          data: ['沾益区', '马龙区', '会泽县', '宣威市', '富源县', '师宗县', '罗平县', '麒麟区', '陆良县'],
          axisPointer: {
            type: 'shadow',
          },
        }],
        yAxis: [{
          type: 'value',
          name: '数量',
          min: 0,
          max: 650,
          interval: 50,
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: { // 自定义网格线样式
            lineStyle: {
              type: 'dashed',
              color: 'rgba(233, 233, 233, 0.2)'
            }
          },
        }, {
          type: 'value',
          name: '总分',
          min: 0,
          max: 50000,
          interval: 10000,
          axisLabel: {
            formatter: '{value}',
          },
        }],
        series: [{
          name: '炉数',
          type: 'bar',
          data: [226, 368, 86, 338, 210, 363, 600, 395, 376],
          itemStyle: {
            //颜色样式部分
            normal: {
              color: "rgba(57, 154, 240,0.9)",
            },
          },
        }, {
          name: '平均分',
          type: 'bar',
          data: [81.4, 80.1, 79.7, 79.3, 78.0, 77.9, 77.6, 76.3, 75.1],
          itemStyle: {
            //颜色样式部分
            normal: {
              color: "rgba(255, 0, 0,0.8)",
            },
          },
        }, {
          name: '总分',
          type: 'line',
          yAxisIndex: 1,
          data: [18388, 29492, 6851, 26797, 16375, 28280, 46579, 30156, 28234],
          itemStyle: {
            //颜色样式部分
            normal: {
              color: "rgba(255, 0, 0,0.8)",
            },
          },
        }],
      }
    }
  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>
.device-list {
  display: flex;
  margin: 2rem 4rem 4rem 4rem;
  width: 88rem;
  height: 52rem;
  background: white;
  border-radius: 1.5rem;
}
</style>
