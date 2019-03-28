<template>
  <div>
    <el-container>
      <el-header height="auto"><vhead/></el-header>
      <el-container>
        <el-aside width="200px">
          <el-row>
            <el-col :span="24">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                >
                <el-menu-item index="1">
                  <span slot="title">
                    <router-link to="/admin/clothes"><i class="el-icon-goods"></i>我的商品</router-link>
                  </span>
                 </el-menu-item>
                <el-menu-item index="2">
                  <span slot="title">
                    <router-link to="/admin/member"><i class="el-icon-menu"></i>我的会员们</router-link>
                  </span>
                </el-menu-item>
                <el-menu-item index="3" v-if = "manager == 1">
                  <span slot="title">
                    <router-link to="/admin/manager"><i class="el-icon-goods"></i>我的小伙伴</router-link>
                  </span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer height="auto">BOBO家</el-footer>
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
      manager: ''
    }
  },
  methods: {
    submit () {
      this.$router.push({path: '/admin/'})
    }
  },
  mounted: function () {
    var managerJsonStr = sessionStorage.getItem('manager')
    // var userJsonStr = this.$cookie.get('userData')
    if (managerJsonStr) {
      var managerdata = JSON.parse(Base64.decode(managerJsonStr))
      this.manager = managerdata.id
      // console.log(managerdata)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header{
    padding:10px 20px
  }
  .el-menu-item a{
    color: #303133;
    display: block;
  }
  .router-link-active{
    color:#409EFF !important;
  }
  .el-footer{
    text-align:center;
    color:white;
    padding:20px 0 
  }
  .el-aside{
    border-right: solid 1px #e6e6e6;
    box-shadow: 1px 0px 10px #409EFF;
  }
  .el-menu {
    border-right: none;
  }
</style>
