<template>
  <div class="card">
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
<!--      <v-chart id="home-temperature-data-monitoring" class="home-chart"-->
<!--               :options="runningDeviceOption"/>-->
      <li v-for="i in count" :key="i" class="infinite-list-item">
        <v-chart id="home-temperature-data-monitoring" class="home-chart"
                 :options="runningDeviceOption"/>
      </li>
    </ul>
<!--    <v-chart id="home-temperature-data-monitoring" class="home-chart"-->
<!--             :options="runningDeviceOption"/>-->
<!--    <v-chart id="home-humidity-data-monitoring" class="home-chart" style="margin-top: -2vh" :options="abnormalDeviceOption"/>-->
  </div>
</template>
<script>
import {getLinesData} from '@/api/lines'
import {mapState} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      count: 0,
      //具体参数配置参考eCharts官方配置项手册
      //温度监测图表配置
      runningDeviceOption: {
        title: {
          text: '下部叶烘烤精准工艺曲线',
          textStyle: {
            align: 'center',
            color: "#54D8FF",
            fontSize: this.$rem(1),
            fontWeight: this.$rem(25)
          },
          top: '0%',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{a}: {c}℃',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(0, 255, 233,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 255, 255,1)',
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 233,0)'
                }],
                global: false
              }
            },
          },
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '9%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          name: '时间',
          splitNumber: 8,
          nameTextStyle: {
            color: '#A1A0AE',
            fontSize: this.$rem(0.7),
            grid: {
              x: this.$rem(1)
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6',
            }
          },
          splitArea: {
            color: '#f00',
            lineStyle: {
              color: '#f00'
            },
          },
          axisLabel: {
            lineStyle: {
              color: '#EFF3F6',
            },
            textStyle: {
              color: '#A1A0AE',
              fontSize: this.$rem(0.6)
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6'
            }
          },
          boundaryGap: false,
          data: [],

        }],
        yAxis: [{
          type: 'value',
          name: '温度',
          min: 0,
          max: 20,
          splitNumber: 5,
          nameTextStyle: {
            color: "#A1A0AE",
            fontSize: this.$rem(0.7)
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6'
            }
          },
          axisLabel: {
            show: true,
            margin: 20,
            textStyle: {
              color: '#A1A0AE',
              fontSize: this.$rem(0.6)
            }
          },
          axisTick: {
            show: false,
          },
        }],
        series: [
          {
            name: '温度',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            showSymbol: false,
            symbolSize: this.$rem(0.3),
            lineStyle: {
              normal: {
                color: "#54D8FF",
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#54D8FF',
                fontSize: this.$rem(0.7)
              }
            },

            itemStyle: {
              color: "#fff",
              borderColor: "#54D8FF",
              borderWidth: this.$rem(0.2),
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(84,216,255,1)'
                },
                  {
                    offset: 1,
                    color: 'rgba(255,255,255,0)'
                  }
                ], false),
              }
            },
            data: [],
          },
          {
            name: '温度',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            showSymbol: false,
            symbolSize: this.$rem(0.3),
            lineStyle: {
              normal: {
                color: "#f00",
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#f00',
                fontSize: this.$rem(0.7)
              }
            },

            itemStyle: {
              color: "#fff",
              borderColor: "#f00",
              borderWidth: this.$rem(0.2),
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#f00'
                },
                  {
                    offset: 1,
                    color: 'rgba(255,255,255,0)'
                  }
                ], false),
              }
            },
            data: [],
          },
        ]
      },
      timeValue: {
        "start_time": this.formatDateTime(this.$store.state.homePageTimeValue[0]),
        "end_time": this.formatDateTime(this.$store.state.homePageTimeValue[1])
      },
    }
  },
  computed: {
    ...mapState(['homePageTimeValue']) //Vuex引入homePageDelay（数据时延）变量
  },
  watch: {
    //监听homePageDelay（数据时延）并及时响应  关闭定时器并重新按时延开启定时器
    homePageTimeValue: {
      handler() {
        console.log("change")
        this.timeValue = {
          "start_time": this.formatDateTime(this.homePageTimeValue[0]),
          "end_time": this.formatDateTime(this.homePageTimeValue[1])
        }
        getLinesData(this, this.timeValue)
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    window.addEventListener(resizeEvt, this.resizeHandle, false);
    document.addEventListener('DOMContentLoaded', this.resizeHandle, false);
    /*
    * 页面挂载发起一次数据监测数据请求并开启定时器
    * */
    getLinesData(this, this.timeValue)
    // this.delay = setInterval(() => {
    //   dataMonitoringRequest(this)
    // }, this.homePageDelay)

  },
  beforeDestroy() {
    clearInterval(this.delay)
  },
  methods: {
    load () {
      if(this.count <= 16){
        this.count += 2
      }
    },
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h=h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second=date.getSeconds();
      second=second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
    //图表响应式处理（未启用）
    resizeHandle() {
      let myChart1=this.$echarts.init(document.getElementById('home-temperature-data-monitoring'))
      let myChart2=this.$echarts.init(document.getElementById('home-humidity-data-monitoring'))
      let myChart3=this.$echarts.init(document.getElementById('home-Illumination-data-monitoring'))
      myChart1.resize()
      myChart2.resize()
      myChart3.resize()
    },
    setDataDeviceOption(runningData, abnormalData, date){
      this.runningDeviceOption.yAxis[0].max = runningData.sort()[runningData.length-1]+10
      this.runningDeviceOption.xAxis[0].data = date
      this.runningDeviceOption.series[0].data = runningData
      this.runningDeviceOption.series[1].data = abnormalData
      this.runningDeviceOption.tooltip.formatter = function (params) {
        var result = ""
        params.forEach(function (item) {
          if (item.data) {
            result = `时间:${item.name}</br>温度:${item.data}</br>温度:${item.data}`
            // result += item.data[2]+'</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
            // result +=item.seriesName + ': '+item.data[1]+' ℃</br>';
          }
        });
        return result;
      }
    },
  }
}
</script>

<style scoped>
li{
  list-style: none;
}
.infinite-list{
  height: 770px;
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.home-chart {
  height: 30rem;
  width: 52rem;
  margin: 0 auto;
  z-index: 2;
  margin-top: 20px;
}
</style>