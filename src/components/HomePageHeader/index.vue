<template>
  <div class="all">
    <div class="header-text">
      <div style="font-size: 1.1rem;">欢迎您，{{ userNname }} !</div>
    </div>
    <div class="selector-container">
      <div style="font-size: 1.1rem">时间选择：</div>
      <el-select  v-model="timeValue.startTime" @change="changeSelection">
        <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
        >
        </el-option>
      </el-select>
      <el-select v-model="timeValue.endTime" @change="changeSelection">
        <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <router-link @click.native="quit()" to="/LoginPage"  class="header-text-quit">退出</router-link>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      userNname: JSON.parse(localStorage.getItem('user')).nname,
      // timeValue: [new Date(2021, 10, 29, 8, 40), new Date(2021, 10, 29,9, 40)],
      options: [],
      timeValue: this.$store.state.homePageTimeValue,
    }
  },
  mounted() {
    this.initOptions()
  },
  computed: {
    ...mapState(['homePageTimeValue', 'user']) //Vuex引入homePageTimeValue变量
  },
  methods: {
    ...mapMutations(['setTimeValue']), //Vuex引入homePageTimeValue变量更改方法
    timeValueChange() {
      console.log("change", this.timeValue)
      this.setTimeValue(this.timeValue)
      this.$forceUpdate()
    },
    quit() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      console.log("storage:", localStorage)
      this.$router.push('/LoginPage')
    },
    initOptions() {
      this.options = ["1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "11d", "12d"]
    },
    changeSelection(val) {
      val
      let start = parseInt(this.timeValue.startTime)
      let end = parseInt(this.timeValue.endTime)
      if (start < end) {
        console.log("timeValue", this.timeValue)
      }else{
        this.timeValue.startTime = "1d"
      }
    }
  }
}
</script>
<style scoped>

.header-text {
  margin: 0.2rem 0 0 2.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.all {
  display: flex;
  flex-direction: row;
}

.selector-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  width: 76.6%;
  justify-content: flex-end;
  align-items: center;
  left: 92.8rem;
}

.header-text-quit {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.1rem;
  margin-left: 2rem;
  color: #1990ff;
  text-decoration: underline;
}


</style>