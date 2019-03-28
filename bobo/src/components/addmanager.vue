<template>
<div>
  <el-dialog
    width="30%"
    :visible.sync="$store.state.dialog_manager"
    center
  >
    <h3 slot="title">{{$store.state.managertitle}}</h3>
    <el-form ref="form" :model="$store.state.managerdata" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="$store.state.managerdata.name" :disabled="!$store.state.addmanager_btn "></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="$store.state.managerdata.phone" :disabled="!$store.state.addmanager_btn "></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="$store.state.managerdata.adress" :disabled="!$store.state.addmanager_btn "></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="$store.state.managerdata.idcard" :disabled="!$store.state.addmanager_btn "></el-input>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="$store.state.managerdata.loginname" :disabled="!$store.state.addmanager_btn "></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="$store.state.managerdata.password" :disabled="!$store.state.addmanager_btn " type="password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" v-if="$store.state.addmanager_btn">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      submit () {
        var data = {
          id: this.$store.state.managerdata.id,
          name: this.$store.state.managerdata.name,
          phone: this.$store.state.managerdata.phone,
          adress: this.$store.state.managerdata.adress,
          idcard: this.$store.state.managerdata.idcard,
          loginname: this.$store.state.managerdata.loginname,
          password: this.$store.state.managerdata.password
        }
        if (this.trim(data.name) === '') {
          this.$message({
            message: '请填写姓名',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.phone) === '') {
          this.$message({
            message: '请填写电话',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.loginname) === '') {
          this.$message({
            message: '填写登录名！！',
            type: 'info',
            duration: 1000
          })
        }
        if (data.size9 === '') {
          this.$message({
            message: '填写密码！！',
            type: 'info',
            duration: 1000
          })
        }
        var that = this
        this.$http.post(this.$store.state.addmanager, data).then(function (ret) {
          // console.log(ret)
          if (ret.data.status > 0) {
            that.$message({
              message: ret.data.msg,
              type: 'success'
            })
            that.$store.state.dialog_clothes = false
            location.reload()
          } else {
            that.$message({
              message: ret.data.msg,
              type: 'error'
            })
          }
        }).catch(function (ret) {
          // console.log(ret.response)
          // console.log('新增商品请求出错')
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
</style>
