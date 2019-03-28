<template>
  <div>
    <el-container>
      <el-header height="auto"><vhead/></el-header>
      <div class="main">
        <el-row >
          <el-col :span="6" :offset="9">
            <el-form  status-icon   label-width="100px" class="demo-ruleForm">
              <el-form-item label="账号" >
                <el-input type="text" v-model="account" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" >
                <el-input type="password" v-model="password" auto-complete="off" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit">确定</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-container>
  </div>
</template>

<script>
import vhead from '../components/header'
let Base64 = require('js-base64').Base64
export default {
  components: {
    vhead
  },
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    submit () {
      let data = {
        loginname: this.account,
        password: this.password
      }
      if (this.trim(data.loginname) === '') {
        this.$message({
          message: '请输入账号',
          duration: 1000,
          type: 'info'
        })
        return
      }
      if (this.trim(data.password) === '') {
        this.$message({
          message: '请输入密码',
          type: 'info',
          duration: 1000
        })
        return
      }
      let that = this
      this.$http.post('/api/login', data).then(function (ret) {
        // console.log(ret)
        if (ret.data.status > 0) {
          sessionStorage.setItem('manager', Base64.encode(JSON.stringify(ret.data.data)))
          sessionStorage.setItem('islogin', true)
          // that.$cookie.set('manager', Base64.encode(JSON.stringify(ret.data.data)), { expires: '30d' })
          that.$router.push({path: '/admin/'})
        } else {
          that.$message({
            message: ret.data.msg,
            type: 'error',
            duration: 1000
          })
        }
      }).catch(function (ret) {
        // console.log(ret.response)
        // console.log('请求出错')
      })
      // this.$router.push({path: '/admin/'})
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header{
    padding:10px 20px
  }
  .main{
    margin:100px 0
  }
</style>
