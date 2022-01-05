<template>
  <div class="device-list">
    <div class="data-left">
    <div class="msg-top-text">
      <DataShow class="data-show" :searchData="searchData"/>
    </div>
    </div>
    <div class="data-right">
    <el-table class="list"
              :data="dataList"
              height="100%"
              stripe
              style="width: 100%"
              border>
      <el-table-column
          prop="time"
          label="时间">
      </el-table-column>
      <el-table-column
          prop="temp1"
          label="干球温度">
      </el-table-column>
      <el-table-column
          prop="temp2"
          label="湿球温度">
      </el-table-column>
      <el-table-column
          prop="humid1"
          label="干球目标">
      </el-table-column>
      <el-table-column
          prop="humid2"
          label="湿球目标">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import DataShow from './DataShow'
import {deviceTemperatureHumidDataRequest} from "@/api/HomePage/Home";

export default {
  name: "index",
  data() {
    return {
      // searchData: [],
      value: '',
      search: '',
      currentPage: 1,
      dataList: [],
    }
  },
  methods: {
    setDeviceDataOption(temperature1, temperature2, humidity1, humidity2, date) {
      for (let i in date) {
        this.dataList.push(
            {
              "temp1": temperature1[i],
              "temp2": temperature2[i],
              "humid1": humidity1[i],
              "humid2": humidity2[i],
              "time": date[i]
            }
        )
      }
    }
  },
  mounted() {
    document.body.style.overflow = "hidden";
    deviceTemperatureHumidDataRequest(this)
  },
  destroyed() {
    document.body.style.overflow = "visible";
  },
  components: {
    DataShow
  },
  props: ['change', 'searchData'],
  watch: {
    change: function (val) {
      // let timeValue = this.$store.state.homePageTimeValue
      console.log("searchData", this.searchData)
      // this.searchData = {
      //   startTime: timeValue[0],
      //   endTime: timeValue[1],
      //   deviceID: this.deviceID
      // }
      this.dataList = []
      deviceTemperatureHumidDataRequest(this, val)
    }
  }
}
</script>

<style scoped>
.device-list {
  /*margin: 2rem 4rem 4rem 4rem;*/
  display: flex;
  width: 83.5rem;
  height: 44.3rem;
  background: none;
  /*background: white;*/
  /*border-radius: 1.5rem;*/
}
.data-left{
  display: flex;
  width: 30rem;
  height: 44.3rem;
  background: white;
  border-radius: 1.5rem;
}
.data-right{
  width: 51rem
  /*margin-left: 2rem;*/
  /*height: 44.3rem;*/
  /*background: blue;*/
  /*border-radius: 1.5rem;*/
}
.list {
  margin: 0 0rem 1rem 3rem;
  border-radius: 1.5rem;
}

.msg-top-text {
  width: 25rem;
  font-size: 1.2rem;
  color: #4D4F5C;
  font-weight: 700;
  /*height: 2.5rem;*/
  margin: 0 0.93rem 0 0.93rem;
  padding: 0.8rem 0 0.5rem 0;
}

.list-head {
  background: #F5F6FA;
  color: #A3A6B4;
}

.list-head-text {
  font-size: 0.88rem;
  height: 3.04rem;
  width: 32rem;
  font-weight: bold;
  text-align: center;
  vertical-align: center;
}

.list-item {
  background: white;
  height: 4.2rem;
  color: #4D4F5C;
}

.list-item:hover {
  background: #F5F6FA;
}

.list-item-text {
  height: 3.04rem;
  width: 9.32rem;
  font-size: 1rem;
  text-align: center;
  vertical-align: middle;
}

</style>
