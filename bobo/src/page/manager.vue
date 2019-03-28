<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="5">
        <el-button type="primary" @click="add">新增小伙伴</el-button>
      </el-col >
    </el-row>
    <el-table
      :data="list.tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="adress"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="身份证号码">
      </el-table-column>
      <el-table-column
        prop="loginname"
        label="登录名">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width="200"
        align="center"
        >
        <template slot-scope="scope">
          <el-button @click="details(scope.row, 0)" type="text" size="small">查看</el-button>
          <el-button @click="details(scope.row, 1)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small" v-if = "scope.row.id != 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="list.currentPage"
      :page-sizes="list.sizes"
      :page-size="list.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.total">
    </el-pagination>
    <add/>
  </div>
</template>

<script>
import add from '../components/addmanager'
export default {
  components: {
    add
  },
  data () {
    return {
      search: '',
      getDataUrl: '/api/manager/list',
      list: {
        tableData: [],
        currentPage: 1,
        total: null,
        size: 10,
        sizes: [10, 20, 30]
      }
    }
  },
  methods: {
    add () {
      this.$store.state.managerdata = {
        name: '',
        phone: '',
        adress: '',
        idcard: '',
        loginname: '',
        password: ''
      }
      this.$store.state.addmanager = '/api/manager/add'
      this.$store.state.dialog_manager = true
    },
    details (row, index) {
      // console.log(row)
      if (index === 0) {
        this.$store.state.addmanager_btn = false
      } else {
        this.$store.state.addmanager_btn = true
      }
      this.$store.state.managerdata = {
        id: row.id,
        name: row.name,
        phone: row.phone,
        adress: row.adress,
        idcard: row.idcard,
        loginname: row.loginname,
        password: row.password
      }
      this.$store.state.addmanager = '/api/manager/updata'
      this.$store.state.dialog_manager = true
    },
    remove (item) {
      // console.log(item)
      var data = {
        id: item.id
      }
      var that = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post('/api/manager/remove', data).then(function (ret) {
          if (ret.data.status > 0) {
            that.$message({
              type: 'success',
              message: ret.data.msg
            })
            that.currentChange(that.list.currentPage)
          } else {
            that.$message({
              type: 'info',
              message: ret.data.msg
            })
          }
        }).catch(function (ret) {
          // console.log(ret)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    sizeChange: function (val) {
      this.getData(val, this.list.currentPage - 1)
    },
    currentChange: function (val) {
      this.list.currentPage = val
      this.getData(this.list.size, val - 1)
    },
    getData: function (size, index) {
      var data = {
        index: index,
        size: size
      }
      var that = this
      this.$http.post(this.getDataUrl, data).then(function (ret) {
        // console.log(ret)
        that.list.tableData = ret.data.data.list[0]
        that.list.total = ret.data.data.total
      }).catch(function (ret) {
        // console.log(ret.response)
        that.list.tableData = []
        that.list.total = 0
        // console.log('list翻页请求出错了')
      })
    }
  },
  mounted () {
    this.getData(10, 0)
  }
}
</script>

<style lang="less" scoped>
  .el-table th{
    text-align: center;

  }
  .el-pagination{
    text-align: right
  }
  .el-table{
    margin: 10px 0;
  }
</style>
