<template>
  <div id="china_map_box">
    <el-button type="primary" size="medium" class="back" @click="back" v-if="deepTree.length > 2">返回</el-button>
    <div class="echarts">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>

import {getChinaJson, getProvinceJSON, getCityJSON, getMapData} from "@/api/get-json";
import {cityProvincesMap} from '@/config/cityProvincesMap'
import {mapOption} from '@/config/mapOption'
import {mapState} from "vuex";

const postcodes = require("/public/static/map/postcode.json")

export default {
  name: "china",
  components: {},
  data() {
    return {
      chart: null, // 实例化echarts
      provincesMap: cityProvincesMap.provincesMap, // 省拼音，用于查找对应json
      provincesCode: cityProvincesMap.provincesCode, // 市行政区划，用于查找对应json
      areaMap: cityProvincesMap.areaMap, // 省行政区划，用于数据的查找，按行政区划查数据
      special: ["北京市", "天津市", "上海市", "重庆市", "香港", "澳门"],//直辖市和特别行政区-只有二级地图，没有三级地图
      mapData: [], // 当前地图上的地区
      option: {...mapOption.basicOption}, // map的相关配置
      deepTree: [],// 点击地图时push，点返回时pop
      // areaName: '中国', // 当前地名
      // areaCode: '000000', // 当前行政区划
      // areaLevel: 'country', // 当前级别
      areaName: '云南省', // 当前地名
      areaCode: '530000', // 当前行政区划
      areaLevel: 'city', // 当前级别
      timeValue: this.$store.state.homePageTimeValue,
      deviceData: {},
      position2postcode: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts();
      this.chart.on('click', this.echartsMapClick);
    });
  },
  computed: {
    ...mapState(['homePageTimeValue']) //Vuex引入homePageDelay（数据时延）变量
  },
  watch: {
    homePageTimeValue: {
      handler() {
        this.timeValue = this.homePageTimeValue
        this.initEcharts()
      },
      immediate: true,
      deep: true
    }
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
    // 初次加载绘制地图
    initEcharts() {
      // if (this.areaCode === '000000') {
      //   this.requestGetChinaJson();
      // } else {
      if (document.getElementById("map")) {
        //地图容器
        this.chart = this.$echarts.init(document.getElementById('map'));
      }
      this.requestGetProvinceJSON({areaName: this.areaName, areaCode: this.areaCode})
      // console.log(this.deepTree)

      // }
    },
    // 地图点击
    echartsMapClick(params) {
      this.areaName = params.areaName;
      if (params.name in this.provincesMap) {
        this.areaCode = params.data.areaCode;
        this.areaLevel = params.data.areaLevel;
        //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
        this.requestGetProvinceJSON(params.data, this.timeValue);
      } else if (params.seriesName in this.provincesMap) {
        //如果是【直辖市/特别行政区】只有二级下钻
        if (this.special.indexOf(params.seriesName) >= 0) {
          return;
        } else {
          this.areaCode = this.areaMap[params.name];
          this.areaLevel = params.data.areaLevel;
          //显示县级地图
          this.requestGetCityJSON(params.data, this.timeValue)
        }
      } else {
        return;
      }
      this.$emit('map-change', params.data);
    },
    //绘制全国地图
    requestGetChinaJson() {
      let p = {
        // areaCode: "000000",
        "start_time": this.timeValue[0],
        "end_time": this.timeValue[1],
      }
      getMapData(p).then(r => {
        let hasDeviceData = r.data
        getChinaJson().then(res => {
              let arr = [];
              for (let i = 0; i < res.features.length; i++) {
                let name = res.features[i].properties.name
                let areaName = res.features[i].properties.name
                let areaCode = res.features[i].id
                if (hasDeviceData[areaName]) {
                  let value = (hasDeviceData[areaName].abnormal) ? -1 : hasDeviceData[areaName].total
                  let obj = {
                    name,
                    areaName,
                    areaCode,
                    areaLevel: 'province',
                    value,
                    total: hasDeviceData[areaName].total,
                    abnormal: hasDeviceData[areaName].abnormal
                  }
                  arr.push(obj)
                }
              }
              this.mapData = arr;
              this.deepTree.push({
                mapData: arr,
                params: {name: 'china', areaName: 'china', areaLevel: 'country', areaCode: '000000'}
              });
              //注册地图
              this.$echarts.registerMap('china', res);
              //绘制地图
              this.renderMap('china', arr);
            }
        );
      })
    },
// 加载省级地图
    requestGetProvinceJSON(params) {
      let p = {
        // areaCode: params.areaCode,
        "start_time": this.formatDateTime(this.timeValue[0]),
        "end_time": this.formatDateTime(this.timeValue[1]),
      }
      getMapData(p).then(r => {
        let tempData = {}
        r.data.forEach(t => {
          // eslint-disable-next-line no-prototype-builtins
          // eslint-disable-next-line no-prototype-builtins
          if (!tempData.hasOwnProperty(t.location)) {
            tempData[t.location] = [t.equipment_No]
          } else {
            if (tempData[t.location].indexOf(t.equipment_No) === -1) {
              tempData[t.location].push(t.equipment_No)
            }
          }
        })
        this.deviceData = {
          "children":[]
        }
        for(let k in tempData){
          this.deviceData["children"].push(
              {
                "location":k,
                "device_number":tempData[k].length
              }
          )
        }
        // this.deviceData = r.data
        let hasDeviceData = this.deviceData
        let t = {}
        hasDeviceData["children"].forEach(child => {
          t[String(postcodes[child.location])] = {"total": child["device_number"]}
          this.position2postcode[postcodes[child.location]] = child.location
        })
        hasDeviceData = t
        getProvinceJSON(params.areaCode).then(res => {
          this.$echarts.registerMap(params.areaName, res);
          let arr = [];
          for (let i = 0; i < res.features.length; i++) {
            let name = res.features[i].properties.name
            let areaName = res.features[i].properties.name
            let areaCode = res.features[i].id
            if (hasDeviceData[areaName]) {
              let value = (hasDeviceData[areaName].abnormal) ? -1 : hasDeviceData[areaName].total
              let obj = {
                name,
                areaName,
                areaCode,
                areaLevel: 'city',
                value,
                total: hasDeviceData[areaName].total,
                abnormal: hasDeviceData[areaName].abnormal
              }
              arr.push(obj)
            }
          }
          this.mapData = arr;
          this.deepTree.push({
            mapData: arr,
            params: params,
          });
          this.renderMap(params.areaName, arr);
        });
      })
    },
// 加载市级地图
    requestGetCityJSON(params) {
      this.areaLevel = params.areaLevel;
      let hasDeviceData = {}
      let currPostcode = this.position2postcode[params.areaName]
      this.deviceData.children.forEach(c => {
        if (c.location === currPostcode) {
          if (!c.children) {
            hasDeviceData = null
            return
          }
          c.children.forEach(cc => {
            hasDeviceData[String(postcodes[cc.location])] = {"total": cc["device_number"]}
          })
        }
      })
      // let t = {}
      // hasDeviceData["children"].forEach(child=>{
      //   t[String(postcodes[child.location])]={"total": child["device_number"]}}
      // )
      // hasDeviceData = t
      if (hasDeviceData) {
        getCityJSON(params.areaCode).then(res => {
          this.$echarts.registerMap(params.areaName, res);
          let arr = [];
          for (let i = 0; i < res.features.length; i++) {
            let name = res.features[i].properties.name
            let areaName = res.features[i].properties.name
            let areaCode = res.features[i].id
            if (hasDeviceData[areaName]) {
              let value = (hasDeviceData[areaName].abnormal) ? -1 : hasDeviceData[areaName].total
              let obj = {
                name,
                areaName,
                areaCode,
                areaLevel: 'districts',
                value,
                total: hasDeviceData[areaName].total,
                abnormal: hasDeviceData[areaName].abnormal
              }
              arr.push(obj)
            }
          }
          this.mapData = arr;
          this.deepTree.push({mapData: arr, params: params});
          this.renderMap(params.areaName, arr);
        });
        // })
      }
    }
    ,
    renderMap(map, data) {
      this.option.series = [
        {
          name: map,
          mapType: map,
          ...mapOption.seriesOption,
          data: data
        }
      ];
      //渲染地图，加一个true，防止下钻到下一级时跑到容器外面
      this.chart.setOption(this.option, true);
    }
    ,
// 返回
    back() {
      if (this.deepTree.length > 1) {
        this.deepTree.pop();
        let areaName = this.deepTree[this.deepTree.length - 1].params.areaName;
        let mapData = this.deepTree[this.deepTree.length - 1].mapData;
        this.$emit('back-change', this.deepTree[this.deepTree.length - 1].params);
        this.renderMap(areaName, mapData);
      }
    }
  }
}

</script>

<style scoped>
#china_map_box {
  display: flex;
  width: 60rem;
  height: 51rem;
  position: relative;
}

#china_map_box #map {
  /*height: 100%;*/
  width: 60rem;
  height: 51rem;
}

#china_map_box .echarts {
  width: 63rem;
  height: 51rem;
  flex: 1;
  background-size: 100% 100%;
}

#china_map_box .back {
  position: absolute;
  top: .8rem;
  right: .5rem;
  z-index: 999;
  padding-left: .72rem;
  padding-right: .72rem;

}
</style>