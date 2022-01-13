<template>
  <div class="device-list">
    <div class="data-left">
    <div class="msg-top-text">
      <DataShow class="data-show" :searchData="searchData"/>
    </div>
    </div>
    <div class="data-right">
    <el-table class="list"
              :data="showDataList"
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
      totalPages:1,
      pageSize: 10,
      dataList: [],
      showDataList: []
    }
  },
  methods: {
    setDeviceDataOption(temperature1, temperature2, humidity1, humidity2, date) {
      console.log("newData")
      this.dataList = []
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
      this.showDataList = this.dataList.slice(0, this.pageSize)
      this.totalPages=this.dataList.length % 20 === 0?(this.dataList.length/this.pageSize):(Math.floor(this.dataList.length)/this.pageSize+1)
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
    }
  },
  mounted() {
    document.body.style.overflow = "hidden";
    let dom = document.querySelector(".el-table__body-wrapper");
    dom.addEventListener("scroll", (v) => {
      v
      const scrollDistance =
          dom.scrollHeight - dom.scrollTop - dom.clientHeight;
      if (scrollDistance <= 0) {
        //等于0证明已经到底，可以请求接口
        if (this.currentPage >= this.totalPages) {
          //判断是否到达底部
          this.$message.warning("没有更多数据");
        }
        if (this.currentPage < this.totalPages) {
          //当前页数小于总页数就请求
          this.currentPage++; //当前页数自增
          console.log("页面已经到达底部可以请求接口...", this.currentPage);
          //this.getData();
          this.showDataList = this.showDataList.concat(this.dataList.slice(this.currentPage*this.pageSize, this.currentPage*(this.pageSize+1)-1))
        }
      }
    });
  },
  created() {
    let d = {
      "startTime": this.formatDateTime(this.$store.state.homePageTimeValue[0]),
      "endTime": this.formatDateTime(this.$store.state.homePageTimeValue[1])
    }
    console.log("d", d)
    deviceTemperatureHumidDataRequest(this, d)
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
      val
      // let timeValue = this.$store.state.homePageTimeValue
      // this.searchData = {
      //   startTime: timeValue[0],
      //   endTime: timeValue[1],
      //   deviceID: this.deviceID
      // }
      this.dataList = []
      deviceTemperatureHumidDataRequest(this, this.searchData)
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
