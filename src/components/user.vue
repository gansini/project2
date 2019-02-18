<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="querycmd.query"
            :clearable="true"
            @clear="getuserinfo"
            @keyup.enter.native="getuserinfo"
          >
            <el-button slot="append" icon="el-icon-search" @click="getuserinfo"></el-button>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" size="small">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userinfo" border style="width: 100%">
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="role_name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="130"></el-table-column>
        <el-table-column prop="emaile" label="邮箱" width="160"></el-table-column>
        <el-table-column prop="my_state" label="状态" width="180">
          <el-switch v-model="info.row.mg_state" slot-scope="info" @change="changeState(info.row.id,info.row.mg_state)"></el-switch>
        </el-table-column>
        <el-table-column label="操作" width="230">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-tooltip  content=" 提示文字" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
          </el-tooltip>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querycmd.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="querycmd.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="querycmd.tot"
      ></el-pagination>
    </el-card>
  </div>
</template>
  </div>
</template>

<script>
export default {
  created() {
    this.getuserinfo()
  },
  data() {
    return {
      keywords: '',
      userinfo: [],
      querycmd: {
        query: '',
        pagenum: 1,
        pagesize: 3,
        tot: 0
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    async changeState(uid,state) {
      const { data: res } = await this.$http.put('users/'+uid+'/state/'+state)
      if (res.meta.status !==200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    async getuserinfo() {
      const { data: res } = await this.$http.get('/users', {
        params: this.querycmd
      })
      if (res.meta.status != 200) {
        return this.$message.error(res.meta.msg)
      }
      this.querycmd.tot = res.data.total
      this.userinfo = res.data.users
    },
    handleSizeChange(abc) {
      console.log('-------------------------------'+abc)
      this.querycmd.pagesize = abc
      this.getuserinfo()
    },
    handleCurrentChange(abc) {
      
      this.querycmd.pagenum = abc
      this.getuserinfo()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
