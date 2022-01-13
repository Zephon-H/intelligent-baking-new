<template>
  <div id="data-analysis">
    <div class="data-analysis">
      <div class="location-search">
        <el-cascader class="location-select"
                     placeholder="点击或输入搜索设备"
                     :options="options"
                     v-model="value"
                     :show-all-levels="false"
                     filterable></el-cascader>
        <!--        <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>-->
<!--        可输入单个数字或范围，若输入范围则用横线隔开，如10-20-->
        <el-tooltip class="item" effect="dark" content="输入干球最大温度，可为空" placement="top">
          <el-input v-model="dryBallTemp" placeholder="干球温度"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="输入干球最大目标，可为空" placement="top">
          <el-input v-model="dryBallTarget" placeholder="干球目标"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="输入湿球最大温度，可为空" placement="top">
          <el-input v-model="wetBallTemp" placeholder="湿球温度"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="输入湿球最大目标，可为空" placement="top">
          <el-input v-model="wetBallTarget" placeholder="湿球目标"/>
        </el-tooltip>
        <button class="query" @click="getData">查询</button>
      </div>
      <DataAnalysis class="view-data-analysis" :change="change" :searchData="searchData"/>
    </div>
  </div>
</template>

<script>

import {queryDataRequest} from "@/api/HomePage/Home";
import DataAnalysis from "@/components/DataAnalysis";
import {mapState} from "vuex";

export default {
  name: "index",
  components: {
    DataAnalysis
  },
  data() {
    return {
      value: [],
      options: [],
      change: 1,
      deviceID: "0",
      timeValue: this.$store.state.homePageTimeValue,
      wetBallTarget: "",
      wetBallTemp: "",
      dryBallTarget: "",
      dryBallTemp: "",
      searchData: {},
    }
  },
  methods: {
    getData() {
      this.change = -this.change
      this.deviceID = this.value[this.value.length - 1]
      // alert("搜索")
      let dryBallTempList = []
      if (this.dryBallTemp.indexOf("-") !== -1) {
        dryBallTempList = this.dryBallTemp.split("-")
      } else {
        dryBallTempList = [this.dryBallTemp, this.dryBallTemp]
      }
      let dryBallTargetList = []
      if (this.dryBallTarget.indexOf("-") !== -1) {
        dryBallTargetList = this.dryBallTarget.split("-")
      } else {
        dryBallTargetList = [this.dryBallTarget, this.dryBallTarget]
      }
      let wetBallTempList = []
      if (this.dryBallTemp.indexOf("-") !== -1) {
        wetBallTempList = this.wetBallTemp.split("-")
      } else {
        wetBallTempList = [this.wetBallTemp, this.wetBallTemp]
      }
      let wetBallTargetList = []
      if (this.dryBallTarget.indexOf("-") !== -1) {
        wetBallTargetList = this.wetBallTarget.split("-")
      } else {
        wetBallTargetList = [this.wetBallTarget, this.wetBallTarget]
      }
      this.searchData = {
        "equipment_No": this.deviceID,
        "dryBallTemp": dryBallTempList,
        "dryBallTarget": dryBallTargetList,
        "wetBallTemp": wetBallTempList,
        "wetBallTarget": wetBallTargetList,
        startTime: this.formatDateTime(this.timeValue[0]),
        endTime: this.formatDateTime(this.timeValue[1])
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
    }
  },
  computed: {
    ...mapState(['homePageTimeValue'])
  },
  watch: {
    homePageTimeValue: {
      handler() {
        this.timeValue = this.homePageTimeValue
        // let params = {
        //   startTime: this.timeValue[0],
        //   endTime: this.timeValue[1]
        // }
        queryDataRequest(this, this.timeValue)
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    let params = {
      startTime: this.formatDateTime(this.timeValue[0]),
      endTime: this.formatDateTime(this.timeValue[1])
    }
    queryDataRequest(this, params)
  }

}
</script>
<style scoped>
.location-search {
  padding: 1rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  background: white;
  border-radius: 1rem;
  width: 100%;
}

.location-select {
  width: 60rem;
}
.item{
  margin-left: 1rem;
}
.query {
  height: 40px;
  width: 50rem;
  display: flex;
  border: none;
  background: #1890ff;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  /*margin: 2rem 1rem 0 0;*/
  margin-left: 3rem;
}

.data-analysis {
  width: 80.99rem;
  /*height: 53rem;*/
  height: 50rem;
  border-radius: 1rem;
  margin: 1.5rem 1rem 0 5.06rem;
}

.view-data-analysis {
  width: 83.99rem;
  border-radius: 1rem;
  margin: 1rem 0 0 0;
  background: white;
}

</style>