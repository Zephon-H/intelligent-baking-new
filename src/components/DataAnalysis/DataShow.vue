<template>
  <div>
    <v-chart id="home-temperature-data-monitoring" class="home-chart"
             :options="temperatureOption"/>
    <v-chart id="home-humidity-data-monitoring" class="home-chart" style="margin-top: -2vh" :options="humidityOption"/>
  </div>
</template>
<script>
import {
  deviceTemperatureHumidDataRequest
} from '../../api/HomePage/Home'
import {mapState} from 'vuex'

export default {
  name: "DataShow",
  data() {
    return {
      //具体参数配置参考eCharts官方配置项手册
      //温度监测图表配置
      temperatureOption: {
        title: {
          text: '干球',
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
          name: '温度/ ℃',
          min: 0,
          max: 120,
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
            name: '干球温度',
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
          }, {
            name: '干球目标',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            showSymbol: false,
            symbolSize: this.$rem(0.3),
            lineStyle: {
              normal: {
                color: "rgb(255, 68, 68)",
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgb(255, 68, 68)',
                fontSize: this.$rem(0.7)
              }
            },

            itemStyle: {
              color: "#fff",
              borderColor: "rgb(255, 68, 68)",
              borderWidth: this.$rem(0.2),
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 68, 68,1)'
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
      //湿度监测图表配置
      humidityOption: {
        title: {
          text: '湿球',
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
          formatter: '{b}<br />{a}: {c}%',
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
          name: '温度/ ℃',
          min: 0,
          max: 100,
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
            name: '湿球温度',
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
          }, {
            name: '湿球目标',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            showSymbol: false,
            symbolSize: this.$rem(0.3),
            lineStyle: {
              normal: {
                color: 'rgb(255, 68, 68)',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgb(255, 68, 68)',
                fontSize: this.$rem(0.7)
              }
            },

            itemStyle: {
              color: "#fff",
              borderColor: "rgb(255, 68, 68)",
              borderWidth: this.$rem(0.2),
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 68, 68,1)'
                },
                  {
                    offset: 1,
                    color: 'rgba(255,255,255,0)'
                  }
                ], false),
              }
            },
            data: [],
          }
        ]
      },
      //异步数据请求定时器挂载变量
      delay: null,
    }
  },
  computed: {
    ...mapState(['homePageDelay']) //Vuex引入homePageDelay（数据时延）变量
  },
  props: ['searchData'],
  watch: {
    searchData:function(val){
      console.log("ss:", val)
      deviceTemperatureHumidDataRequest(this, val)
    },
    //监听homePageDelay（数据时延）并及时响应  关闭定时器并重新按时延开启定时器
    homePageDelay: {
      handler() {
        // clearInterval(this.delay)
        // this.delay = setInterval(() => {
        //   dataMonitoringRequest(this)
        // }, this.homePageDelay)
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
    let d = {
      "startTime": this.formatDateTime(this.$store.state.homePageTimeValue[0]),
      "endTime": this.formatDateTime(this.$store.state.homePageTimeValue[1])
    }
    deviceTemperatureHumidDataRequest(this, d)
    // dataMonitoringRequest(this)
    // this.delay = setInterval(() => {
    //   dataMonitoringRequest(this)
    // }, this.homePageDelay)

  },
  beforeDestroy() {
    clearInterval(this.delay)
  },
  methods: {
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
      myChart1.resize()
      myChart2.resize()
    },
    //首页数据监测图表配置
    setDeviceDataOption(temperature1, temperature2, humidity1, humidity2, date) {
      this.temperatureOption.xAxis[0].data = date
      this.temperatureOption.series[0].data = temperature1
      this.temperatureOption.series[1].data = temperature2
      this.humidityOption.xAxis[0].data = date
      this.humidityOption.series[0].data = humidity1
      this.humidityOption.series[1].data = humidity2
      this.temperatureOption.tooltip.formatter = function (params) {
        var result = `时间:${params[0].axisValue}</br>`
        params.forEach(function (item) {
          if (item.data) {
            result += `${item.seriesName}:${item.data} ℃</br>`
            // result += item.data[2]+'</br>'
            // result +=item.seriesName + ': '+item.data[1]+' ℃</br>';
          }
        });
        return result;
      }
      this.humidityOption.tooltip.formatter = function (params) {
        var result = `时间:${params[0].axisValue}</br>`
        params.forEach(function (item) {
          if (item.data) {
            result += `${item.seriesName}:${item.data} ℃</br>`
            // result += item.data[2]+'</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
            // result +=item.seriesName + ': '+item.data[1]+' %</br>';
          }
        });
        return result;
      }
    }
  }
}
</script>
<style scoped>
.home-chart {
  height: 18rem;
  width: 27rem;
  margin-top: 1.5rem;
  /*margin: 2.2rem 0 0 0.5rem;*/
  z-index: 2;
}
</style>