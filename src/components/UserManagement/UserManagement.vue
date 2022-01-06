<template>
  <el-form
      label-position=right
      label-width="100px"
      style="margin:0 auto;max-width: 460px"
  >
    <el-form-item label="用户名">
      <el-input v-model="newinfo.nname"></el-input>
    </el-form-item>
    <el-form-item label="用户编号">
      <el-input v-model="newinfo.user"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="newinfo.name"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio v-model="newinfo.gender" label="1">男</el-radio>
      <el-radio v-model="newinfo.gender" label="2">女</el-radio>
      <el-radio v-model="newinfo.gender" label="3">保密</el-radio>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="newinfo.phone"></el-input>
    </el-form-item>
    <div style="display: flex">
      <el-button style="width: 150px; margin-left: 22%" type="primary">修改</el-button>
      <el-button @click="clear" style="width: 150px; margin-left: 5%" type="normal">清空</el-button>
    </div>
    </el-form>
</template>

<script>
export default {
  name: "UserManagement",
  data(){
    return{
      newinfo: {}
    }
  },
  methods: {
    clear(){
      this.newinfo = {}
    }
  }
}
</script>

<style scoped>

</style>