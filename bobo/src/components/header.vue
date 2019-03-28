<template>
  <div >
    <el-row :gutter="20" type="flex" justify="space-between" align="middle">
      <el-col :span="10" ><img src="../../static/images/logo.png"><span>BoBo童装管理平台</span></el-col>
      <el-col :span="5" v-if="managerName">
        <span class="manager">{{managerName}}</span>
        <span class="manager password" @click="editPassword">修改密码</span>
        <el-button type="danger" @click="loginout">退出</el-button>
      </el-col>
    </el-row>
    <password />
  </div>
</template>

<script>
import password from './password'
let Base64 = require('js-base64').Base64
export default {
  components: {
    password
  },
  data () {
    return {
      managerName: ''
    }
  },
  methods: {
    loginout () {
      sessionStorage.removeItem('manager')
      sessionStorage.removeItem('islogin')
      this.$router.push({path: '/login'})
    },
    editPassword () {
      this.$store.state.oldpassWord = ''
      this.$store.state.newpassWord = ''
      this.$store.state.repassWord = ''
      this.$store.state.passWord = true
    }

  },
  mounted: function () {
    var managerJsonStr = sessionStorage.getItem('manager')
    // var userJsonStr = this.$cookie.get('userData')
    if (managerJsonStr) {
      var managerdata = JSON.parse(Base64.decode(managerJsonStr))
      this.managerName = managerdata.name
      // console.log(managerdata)
    }
  }
}
</script>

<style lang="less" scoped>
  img{
    width:150px;
    margin-right:20px;
    vertical-align: bottom;
  }
  span{
    font-size: 30px;
    color:white
  }
  .manager{
    font-size: 18px;
    margin-right:10px
  }
  .password{
    font-size: 14px;
    margin-right:10px;
    cursor: pointer;
  }
  .password:hover{
    text-decoration: underline;
  }
</style>

