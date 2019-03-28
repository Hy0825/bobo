<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="5">
        <el-button type="primary" @click="add">添加商品</el-button>
      </el-col >
      <el-col  :span="8">
        <el-row type="flex" align="middle">
          <el-col :span="18">
            <el-input v-model="search" placeholder="请输入货号查询"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="success" size="small" @click="searchf">查找</el-button>
          </el-col>
        </el-row>
      </el-col >
    </el-row>
    <el-table
      :data="list.tableData"
      style="width: 100%">
      <!-- <el-table-column
        prop="date"
        label="日期"
        >
      </el-table-column> -->
      <el-table-column
        prop="name"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        prop="code"
        label="货号">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="size1"
        label="1码">
      </el-table-column>
      <el-table-column
        prop="size3"
        label="3码">
      </el-table-column>
      <el-table-column
        prop="size5"
        label="5码">
      </el-table-column>
      <el-table-column
        prop="size7"
        label="7码">
      </el-table-column>
      <el-table-column
        prop="size9"
        label="9码">
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
          <el-button @click="outgoing(scope.row)" type="text" size="small">出库</el-button>
          <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
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
    <addclothes/><outgoing/>
  </div>
</template>

<script>
import addclothes from '../components/addclothes'
import outgoing from '../components/outgoing'
export default {
  components: {
    addclothes,
    outgoing
  },
  data () {
    return {
      search: '',
      getDataUrl: '/api/clothes/list',
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
      this.$store.state.addclothes = {
        name: '',
        code: '',
        price: '',
        size1: '',
        size3: '',
        size5: '',
        size7: '',
        size9: ''
      }
      this.$store.state.addclothesurl = '/api/clothes/add'
      this.$store.state.dialog_clothes = true
    },
    details (row, index) {
      // console.log(row)
      if (index === 0) {
        this.$store.state.addclothes_btn = false
      } else {
        this.$store.state.addclothes_btn = true
      }
      this.$store.state.addclothes = {
        id: row.id,
        name: row.name,
        code: row.code,
        price: row.price,
        size1: row.size1,
        size3: row.size3,
        size5: row.size5,
        size7: row.size7,
        size9: row.size9
      }
      this.$store.state.addclothesurl = '/api/clothes/updata'
      this.$store.state.dialog_clothes = true
    },
    outgoing (item) {
      this.$store.state.outgoing = {
        name: item.name,
        code: item.code,
        price: item.price,
        size: item.size,
        count: 1
      }
      this.$store.state.dialog_outgoing = true
    },
    remove (item) {
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
        this.$http.post('/api/clothes/remove', data).then(function (ret) {
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
    searchf () {
      var data = {
        code: this.search
      }
      if (this.trim(data.code) === '') {
        this.currentChange(1)
        return
      }
      var that = this
      this.$http.post('/api/clothes/search', data).then(function (ret) {
        // console.log(ret)
        that.list.tableData = ret.data.data.list[0]
        that.list.total = ret.data.data.total
      }).catch(function () {
        that.list.tableData = []
        that.list.total = 0
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
