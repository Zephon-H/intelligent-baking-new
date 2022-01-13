<template>
  <el-form
      :rules="rules"
      :model="newinfo"
      ref="newinfo"
      label-position=right
      label-width="100px"
      style="margin:0 auto;max-width: 460px"
  >
    <el-form-item label="用户昵称" prop="nname">
      <el-input v-model="newinfo.nname"></el-input>
    </el-form-item>
    <el-form-item label="用户编号" prop="user_id">
      <el-input v-model="newinfo.user_id"></el-input>
    </el-form-item>
<!--    <el-form-item label="姓名" prop="name">-->
<!--      <el-input v-model="newinfo.name"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="性别" prop="gender">-->
<!--      <el-radio v-model="newinfo.gender" label="男">男</el-radio>-->
<!--      <el-radio v-model="newinfo.gender" label="女">女</el-radio>-->
<!--      <el-radio v-model="newinfo.gender" label="保密">保密</el-radio>-->
<!--    </el-form-item>-->
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="newinfo.phone"></el-input>
    </el-form-item>
    <div style="display: flex">
      <el-button @click="modify" style="width: 150px; margin-left: 22%" type="primary">修改</el-button>
      <el-button @click="clear" style="width: 150px; margin-left: 5%" type="normal">清空</el-button>
    </div>
  </el-form>
</template>

<script>
import {changeUserInfo} from "@/api/UserManagement";

export default {
  name: "UserManagement",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号格式'));
      }else{
        callback()
      }
    };
    return {
      newinfo: JSON.parse(localStorage.getItem('user')),
      rules: {
        nname: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        user_id: [
          {required: true, message: '请输入用户编号', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个数字', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          // { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' },
          {validator: checkPhone, trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.newinfo = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    clear() {
      this.newinfo = {}
    },
    modify() {
      this.$refs["newinfo"].validate((v) => {
        if(v){
          changeUserInfo(this, JSON.parse(localStorage.getItem('user')).id, this.newinfo)
        }
        if (!v) {
          this.$message.error("格式存在问题")
          return false;
        }
      })
    },
    change(bool, errmsg) {
      if (bool) {
        localStorage.setItem("user", JSON.stringify(this.newinfo))
        this.$message({message: "修改成功", type: "success"});
      } else {
        console.log(errmsg)
        this.$message.error("修改失败")
      }
    }
  }
}
</script>

<style scoped>

</style>