<template>
<div>
  <el-dialog
    width="30%"
    :visible.sync="$store.state.dialog_member"
    center
  >
    <h3 slot="title">{{$store.state.membertitle}}</h3>
    <el-form ref="form" :model="$store.state.memberdata" label-width="80px">
      
      <el-form-item label="姓名">
        <el-input v-model="$store.state.memberdata.name" :disabled="!$store.state.addmember_btn || $store.state.integralshow"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="$store.state.memberdata.phone" :disabled="!$store.state.addmember_btn || $store.state.integralshow"></el-input>
      </el-form-item>
      <el-form-item label="积分" v-if="$store.state.integralshow" >
        <el-input v-model="$store.state.memberdata.integral" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="本次积分" v-if="$store.state.integralshow">
        <el-input v-model="$store.state.memberdata.integral2" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" v-if="$store.state.addmember_btn && !$store.state.integralshow">确 定</el-button>
      <el-button type="primary" @click="integral" v-if="$store.state.addmember_btn && $store.state.integralshow">确 定</el-button>
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
          id: this.$store.state.memberdata.id,
          name: this.$store.state.memberdata.name,
          phone: this.$store.state.memberdata.phone,
          integral: this.$store.state.memberdata.integral,
          integral2: this.$store.state.memberdata.integral2
        }
        if (this.trim(data.name) === '') {
          this.$message({
            message: '亲，会员名字填一下',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.phone) === '') {
          this.$message({
            message: '亲，会员电话填一下',
            type: 'info',
            duration: 1000
          })
        }
        var that = this
        this.$http.post(this.$store.state.addmember, data).then(function (ret) {
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
          // console.log('新增会员请求出错')
        })
      },
      integral () {
        var data = {
          id: this.$store.state.memberdata.id,
          integral: this.$store.state.memberdata.integral,
          integral2: this.$store.state.memberdata.integral2
        }
        var that = this
        this.$http.post('/api/integral', data).then(function (ret) {
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
          // console.log('新增会员请求出错')
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
