<template>
<div>
  <el-dialog  :visible.sync="$store.state.passWord" width="30%" center>
    <h3 slot="title">{{title}}</h3>
    <input type="password" placeholder="输入旧密码" v-model = "$store.state.oldpassWord">
    <input type="password" placeholder="输入新密码" v-model = "$store.state.newpassWord">
    <input type="password" placeholder="输入确认密码" v-model = "$store.state.repassWord">
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" class="btn" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
let Base64 = require('js-base64').Base64
export default {
  name: 'alertbox',
  data () {
    return {
      title: '修改密码',
      id: ''
    }
  },
  methods: {
    submit () {
      var managerJsonStr = sessionStorage.getItem('manager')
      // var userJsonStr = this.$cookie.get('userData')
      if (managerJsonStr) {
        var managerdata = JSON.parse(Base64.decode(managerJsonStr))
        this.id = managerdata.id
      }
      var data = {
        id: this.id,
        oldpassword: this.$store.state.oldpassWord,
        newpassword: this.$store.state.newpassWord
      }
      if (this.$store.state.oldpassWord === '') {
        this.$message({
          message: '输入旧密码',
          type: 'info',
          duration: 1000
        })
        return
      }
      if (this.$store.state.newpassWord === '') {
        this.$message({
          message: '输入新密码',
          type: 'info',
          duration: 1000
        })
        return
      }
      if (this.$store.state.newpassWord !== this.$store.state.repassWord) {
        this.$message({
          message: '两次密码不一致',
          type: 'info',
          duration: 1000
        })
        return
      }
      var that = this
      this.$http.post('/api/updataPassword', data).then(function (ret) {
        // console.log(ret)
        if (ret.data.status > 0) {
          that.$message({
            message: ret.data.msg,
            type: 'success',
            duration: 1000
          })
          that.$store.state.passWord = false
        } else {
          that.$message({
            message: ret.data.msg,
            type: 'info',
            duration: 1000
          })
        }
      }).catch(function (ret) {
        // console.log(ret)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  input{
    display: block;
    background: #eee;
    width: 70%;
    margin: 20px auto;
    border-radius: 10px;
    padding:10px;
    border: 1px solid #d2d2d2;
  }
  h3{
    font-weight: normal;
  }
  input:last-child{
    margin-bottom: 0;
  }
  .btn{
    padding: 10px 75px;
    font-size: 20px;
  }
</style>
