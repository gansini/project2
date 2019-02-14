<template>
  <div id="login-container">
    <div id="login-box">
      <div id="logo-box">
        <img src="../assets/logo.png" alt>
      </div>
      <el-form :rules="loginFormrule" ref="loginFormref" :model="loginform">
        <el-form-item prop="username">
          <el-input v-model="loginform.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginform.password" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="dianji">登录</el-button>
            <el-button type="info" @click="chongzhi">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        username: '',
        password: ''
      },
      loginFormrule: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    dianji() {
      this.$refs.loginFormref.validate(async valid => {
        if (valid === true) {
          const { data: res } = await this.$http.post('/login', this.loginform)
          console.log(res)
          if (res.meta.status !== 200) {
            return this.$message.error('用户名或密码错误')
          }
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      })
    },
    chongzhi() {
      this.$refs.loginFormref.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
  #login-box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    #logo-box {
      width: 130px;
      height: 130px;
      background-color: #fff;
      border-radius: 50%;
      padding: 8px;
      position: absolute;
      left: 50%;
      border: 1px solid #eee;
      box-shadow: 0 0 10px #eee;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .el-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
