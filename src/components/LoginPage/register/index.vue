<template>
  <div>
    <div>
      <div style="display: flex;flex-direction: column;justify-content: center;margin: 4rem 13.5rem 0 13.5rem">
        <div style="margin-left: 7.16rem">
          <div class="register-en-text">BDI-IoT</div>
          <div class="register-cn-text">物联网可视化平台</div>
          <div class="register-text">请完成您的账号注册</div>
        </div>
        <div class="register-id-container">
<!--          <img src="../../../assets/img/login_people.svg" alt="" class="register-id-icon">-->
          <div class="register-front-text" style="width: 5rem">用户编号:</div>
          <input class="register-input-l" type="text" placeholder="6-10个字符只能包括字母、数字、下划线" v-model="user_id.value"
          >
          <img :src="user_id.src" class="img-end" v-if="user_id.show"/>
        </div>
        <div class="register-password-container">
<!--          <img src="../../../assets/img/login_password.svg" alt="" class="register-password-icon">-->
          <div class="register-front-text" style="width: 3.6rem">密码:</div>
          <input class="register-input-l" type="password" placeholder="6-18个字符只能包括字母、数字、下划线" v-model="password.value"
          >
          <img :src="password.src" class="img-end" v-if="password.show"/>
        </div>
        <div class="register-password-container" style="margin-top: 2rem">
<!--          <img src="../../../assets/img/login_password.svg" alt="" class="register-password-icon">-->
          <div class="register-front-text" style="width: 11rem">再次确认密码:</div>
          <input class="register-input-l" type="password" placeholder="请再次输入您的密码" v-model="twicePwd.value"
          >
          <img :src="twicePwd.src" class="img-end" v-if="twicePwd.show"/>
        </div>
        <div class="row">
<!--          <div class="row register-input-container">-->
<!--            <div class="register-input-text">姓名:</div>-->
<!--            <input type="text" class="register-input" v-model="name.value">-->
<!--            <img :src="name.src" class="img-end" v-if="name.show"/>-->
<!--          </div>-->
          <div class="row register-input-container">
            <div class="register-input-text">昵称:</div>
            <input type="text" class="register-input" v-model="nname.value">
            <img :src="nname.src" class="img-end" v-if="nname.show"/>
          </div>
          <div class="row register-input-container" style="margin-left: 5rem">
            <div class="register-input-text" style="width: 6.8rem">手机号:</div>
            <input type="text" class="register-input" v-model="phone.value">
            <img :src="phone.src" class="img-end" v-if="phone.show"/>
          </div>
        </div>
<!--        <div class="row">-->
<!--          <div class="row register-input-container">-->
<!--            <div class="register-input-text" style="width: 6.8rem">手机号:</div>-->
<!--            <input type="text" class="register-input" v-model="phoneNumber.value">-->
<!--            <img :src="phoneNumber.src" class="img-end" v-if="phoneNumber.show"/>-->
<!--          </div>-->
<!--          <div class="row register-input-container" style="margin-left: 5rem">-->
<!--            <div class="register-input-text">性别:</div>-->
<!--            <select name="gender" id="gender" class="gender-select" v-model="gender.value">-->
<!--&lt;!&ndash;              <option value=""></option>&ndash;&gt;-->
<!--              <option value="男">男</option>-->
<!--              <option value="女">女</option>-->
<!--            </select>-->
<!--            <img :src="gender.src" class="img-end" v-if="gender.show" style="margin-top: 0rem"/>-->
<!--          </div>-->
<!--        </div>-->
        <div class="row" style="margin-top: 3rem">
          <input type="checkbox" style="width: 1rem;height: 1rem" ref="protrol">
          <div class="register-ckb-text">我同意条款和协议并完成注册</div>
        </div>
        <div>
          <el-button type="primary" class="register-btn" @click="registerReq">注册</el-button>
        </div>
        <div class="register-botton-text" @click="login">已经有账号了？点击这里登入</div>
      </div>
    </div>
  </div>
</template>

<script>
import {registerRequest} from '@/api/LoginPage/register'

export default {
  name: "index",
  data() {
    return {
      //用户名
      user_id: {
        value: '',
        src: null,
        flag: false,
        show: false
      },
      //密码
      password: {
        value: '',
        src: null,
        flag: false,
        show: false
      },
      //确认密码
      twicePwd: {
        value: '',
        src: null,
        flag: false,
        show: false
      },
      //姓名
      // name: {
      //   value: '',
      //   src: null,
      //   flag: false,
      //   show: false
      // },
      //昵称
      nname: {
        value: '',
        src: null,
        flag: false,
        show: false
      },
      //手机号
      phone: {
        value: '',
        src: null,
        flag: false,
        show: false
      },
      //性别
      // gender: {
      //   value: '',
      //   src: null,
      //   flag: false,
      //   show: false
      // }
    }
  },
  methods: {
    //供给接口调用 判断是否注册成功
    register(bool) {
      if (bool) {
        this.$message({
          message: '注册成功',
          type: 'success'
        });
        this.$router.push('/LoginPage')
      } else {
        this.$message.error('注册失败');
      }
    },
    //跳转到登录页面
    login() {
      this.$router.push('/LoginPage')
    },
    //判断all输入项合法  发起注册请求
    registerReq() {
      if (this.user_id.flag && this.password.flag && this.twicePwd.flag && this.nname.flag && this.phone.flag  && this.$refs.protrol.checked) {
        registerRequest(this)
      } else {
        this.$message({
          message: '请检查输入项和是否同意条款和协议',
          type: 'warning'
        });
      }
    },
    check(bool, obj) {
      obj.show = true
      if (bool) {
        obj.flag = true
        obj.src = require('@/assets/对.svg')
      } else {
        obj.flag = false
        obj.src = require('@/assets/错.svg')
      }
    }
  },
  watch: {
    user_id: {
      //判断用户名是否合法函数
      handler(newVal) {
        let bool = /^[a-zA-Z0-9]\w{5,10}$/.test(newVal.value)
        this.check(bool, newVal)
      },
      deep: true
    },
    password: {
      handler(newVal) {
        //判断密码是否合法函数
        let bool = /^[a-zA-Z0-9]\w{5,18}$/.test(newVal.value)
        this.check(bool, newVal)
      },
      deep: true
    },
    twicePwd: {
      //判断确认密码是否合法函数
      handler(newVal) {
        let bool = !!(newVal.value === this.password.value && this.password.value)
        this.check(bool, newVal)
      },
      deep: true
    },
    // name: {
    //   //判断姓名是否合法函数
    //   handler(newVal) {
    //     let bool = !!newVal.value
    //     this.check(bool, newVal)
    //   },
    //   deep: true
    // },
    nname: {
      //判断昵称是否合法函数
      handler(newVal) {
        let bool = !!newVal.value
        this.check(bool, newVal)
      },
      deep: true
    },
    phone: {
      //判断手机号是否合法函数
      handler(newVal) {
        let bool = /^1[3-9]\d{9}$/.test(newVal.value)
        this.check(bool, newVal)
      },
      deep: true
    },
    // gender: {
    //   //判断性别是否合法函数
    //   handler(newVal) {
    //     let bool = newVal.value ? true : false
    //     this.check(bool, newVal)
    //   },
    //   deep: true
    // }
  }
}
</script>

<style scoped>
.register-en-text {
  font-size: 2.83rem;
  font-family: Source Sans Pro;
  font-weight: bold;
  letter-spacing: 1rem;
  color: #143992;
  cursor: default;

}

.register-cn-text {
  font-size: 1.62rem;
  font-weight: bold;
  letter-spacing: 0.48rem;
  color: #143992;
  cursor: default;
}

.register-text {
  font-weight: 400;
  font-size: 1.21rem;
  color: #A6A7AD;
  margin: 2rem 0 2rem 2.6rem;
  cursor: default;
}

.register-id-container {
  display: flex;
  flex-direction: row;
  border-bottom: 0.16rem solid #E9E9F0;
  margin-bottom: 2rem;
}

.register-id-icon {
  width: 1rem;
  height: 1rem;
  margin: 0.36rem 0.6rem 0.2rem 0.6rem
}

.register-password-container {
  display: flex;
  flex-direction: row;
  border-bottom: 0.16rem solid #E9E9F0
}

.register-password-icon {
  width: 2rem;
  height: 1.8rem;
  margin: 0.16rem 0.1rem 0rem 0.1rem;
}

.register-input-l {
  width: 100%;
  height: 2rem;
  border: none;
  font-size: 1.08rem;
  color: #143992;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.register-front-text {
  width: 3.17rem;
  font-size: 1.08rem;
  font-weight: 400;
  color: #436496;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.06rem;
}

.row {
  display: flex;
  flex-direction: row;
}

.register-input-container {
  border-bottom: 0.16rem solid #E9E9F0;
  align-items: center;
  width: 12.64rem;
  margin-top: 3rem;
}

.register-input-text {
  width: 4rem;
  font-size: 1.08rem;
  font-weight: 400;
  color: #436496;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.register-input {
  width: 100%;
  height: 2rem;
  border: none;
  font-size: 1rem;
  color: #143992;
}

.gender-select {
  width: 100%;
  height: 2rem;
  border: none;
  text-align: left;
  font-size: 1.08rem;
  color: #143992;
}

.register-btn {
  height: 3.37rem;
  width: 12.86rem;
  margin: 2.8rem 0 2.8rem 9rem;
  color: white;
  background: #143992;
  border-radius: 1rem;
}
.register-btn:hover{
  opacity: 0.8;
  background: #143992;
}

.register-ckb-text {
  font-size: 1.01rem;
  color: #43425D;
  margin-left: 0.26rem;
  cursor: default;
}

.register-botton-text {
  font-size: 1rem;
  color: #43425D;
  margin-left: 9rem;
  text-decoration: underline;
  cursor: pointer;
}

.img-end {
  width: 1rem;
  height: 1rem;
  margin-top: 0.5rem;
  border: none;
}
</style>