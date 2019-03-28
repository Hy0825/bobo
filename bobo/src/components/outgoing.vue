<template>
<div>
  <el-dialog
    width="45%"
    :visible.sync="$store.state.dialog_outgoing"
    center
  >
    <h3 slot="title">物品出库</h3>
    <el-form ref="form" :model="$store.state.outgoing" label-width="80px">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-form-item label="名称" >
            <el-input v-model="$store.state.outgoing.name" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货号">
            <el-input v-model="$store.state.outgoing.code" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-form-item label="单价">
            <el-input v-model="$store.state.outgoing.price" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="尺码">
            <el-input v-model="$store.state.outgoing.size"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-form-item label="数量">
            <el-input v-model="$store.state.outgoing.count"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-form-item label="会员电话">
            <el-input v-model="$store.state.outgoing.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="hedui">
          <el-button type="warning" size="mini" @click="searchf">效验</el-button>
          <span v-if="member">会员姓名:{{member}}</span>
          <span v-if="member === 0">会员不存在</span>
        </el-col>
      </el-row> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" >出库</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
  export default {
    data () {
      return {
        member: ''
      }
    },
    methods: {
      submit () {
        var data = {
          code: this.$store.state.outgoing.code,
          size: this.$store.state.outgoing.size,
          count: this.$store.state.outgoing.count
        }
        var that = this
        this.$http.post('/api/clothes/outgoing', data).then(function (ret) {
          // console.log(ret)
          if (ret.data.status > 0) {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            location.reload()
          } else {
            that.$message({
              type: 'info',
              message: '操作失败'
            })
          }
        }).catch(function (ret) {
          that.$message({
            type: 'error',
            message: '请求失败'
          })
        })
      },
      searchf () {
        var data = {
          phone: this.$store.state.outgoing.phone
        }
        if (this.trim(data.phone) === '') {
          this.$message({
            type: 'info',
            message: '请填写会员电话'
          })
          return
        }
        var that = this
        this.$http.post('/api/member/search', data).then(function (ret) {
          // console.log(ret)
          if (ret.data.data.total > 0) {
            that.$set(that, 'member', ret.data.data.list[0].name)
          } else {
            that.$set(that, 'member', 0)
          }
        }).catch(function (ret) {
          that.$set(that, 'member', 0)
        })
      }
    }
  }
</script>
<style scoped>
  .el-dialog__body{
    font-size: 16px;
    text-align: center !important;
  }
  
  .el-form-item{
    margin-bottom:10px
  }
  .hedui{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
</style>
