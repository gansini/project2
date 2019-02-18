<template>
  <el-container>
    <el-header>
      <div id="logo-box">
        <img src="../assets/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="open2">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="shousuo?'65px':'200px'">
        <div
          @click="shousuo=!shousuo"
          style="background-color:rgb(74,80,100);height:25px; line-height:25px; font-size:12px ;text-align:center; color:white; letter-spacing:0.1em ;user-select:none; cursor:pointer"
        >|||</div>
        <el-menu
          background-color="#373D41"
          text-color="#fff"
          active-text-color="#409eFF"
          :unique-opened="true"
          :style="shousuo?'width:65px':'width:200px'"
          :collapse="shousuo"
          :collapse-transition="true"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="(item, k) in message" :key="item.id">
            <template slot="title">
              <i :class="'iconfont icon-'+icon[k]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item.path" v-for="item2 in item.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              {{item2.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getmessage()
  },
  data() {
    return {
      shousuo: false,
      message: [],
      icon: ['user', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    async getmessage() {
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status !== 200) {
        return this.$message.err(res.meta.msg)
      }
      this.message = res.data
    },
    open2() {
      this.$confirm('真的要退出吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: rgb(55, 61, 65);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-button {
      margin-right: 20px;
    }
    #logo-box {
      color: #fff;
      font-size: 22px;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
}
.el-aside {
  background-color: #373d41;
  overflow: hidden;
}
.el-main {
  background-color: #eaedf1;
}
</style>
