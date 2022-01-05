<template>
  <div id="data-analysis">
    <div class="data-analysis">
      <div class="location-search">
        <el-cascader class="location-select"
                     placeholder="输入可搜索"
                     :options="options"
                     v-model="value"
                     filterable></el-cascader>
        <button class="query" @click="getData">查询</button>
      </div>
      <DataAnalysis class="view-data-analysis" :change="change" :deviceID="deviceID"/>
    </div>
  </div>
</template>

<script>

import {queryDataRequest} from "@/api/HomePage/Home";
import DataAnalysis from "@/components/DataAnalysis";
import {mapState} from "vuex";

export default {
  name: "index",
  components:{
    DataAnalysis
  },
  data() {
    return {
      value: [],
      options: [],
      change: 1,
      deviceID: "0",
      timeValue: this.$store.state.homePageTimeValue
    }
  },
  methods: {
    getData() {
      this.change = -this.change
      this.deviceID = this.value[this.value.length-1]
      // alert("搜索")
    }
  },
  computed:{
    ...mapState(['homePageTimeValue'])
  },
  watch:{
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
      startTime: this.timeValue[0],
      endTime: this.timeValue[1]
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

.query {
  height: 2.4rem;
  width: 4rem;
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