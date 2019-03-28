<template>
<div>
  <el-dialog
    width="45%"
    :visible.sync="$store.state.dialog_clothes"
    :close-on-click-modal = false
  >
    <h3 slot="title">新增物品</h3>
    <el-form ref="form" :model="$store.state.addclothes" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名称">
            <el-input v-model="$store.state.addclothes.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货号">
            <el-input v-model="$store.state.addclothes.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单价">
            <el-input v-model="$store.state.addclothes.price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="1码数量">
            <el-input v-model="$store.state.addclothes.size1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="3码数量">
            <el-input v-model="$store.state.addclothes.size3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="5码数量">
            <el-input v-model="$store.state.addclothes.size5"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="7码数量">
            <el-input v-model="$store.state.addclothes.size7"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="9码数量">
            <el-input v-model="$store.state.addclothes.size9"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" v-if="$store.state.addclothes_btn">确 定</el-button>
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
          id: this.$store.state.addclothes.id,
          name: this.$store.state.addclothes.name,
          code: this.$store.state.addclothes.code,
          price: this.$store.state.addclothes.price,
          size1: this.$store.state.addclothes.size1,
          size3: this.$store.state.addclothes.size3,
          size5: this.$store.state.addclothes.size5,
          size7: this.$store.state.addclothes.size7,
          size9: this.$store.state.addclothes.size9
        }
        if (this.trim(data.name) === '') {
          this.$message({
            message: '亲，商品名称是不是么有填？',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.code) === '') {
          this.$message({
            message: '亲，商品货吗是不是么有填？',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.price) === '') {
          this.$message({
            message: '亲，商品总要填个参考价吧！',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.size1) === '') {
          this.$message({
            message: '亲，1码数量忘填了吧！',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.size3) === '') {
          this.$message({
            message: '亲，3码数量忘填了吧！',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.size5) === '') {
          this.$message({
            message: '亲，5码数量忘填了吧！！',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.size7) === '') {
          this.$message({
            message: '亲，7码数量忘填了吧！！',
            type: 'info',
            duration: 1000
          })
        }
        if (this.trim(data.size9) === '') {
          this.$message({
            message: '亲，9码数量忘填了吧！！',
            type: 'info',
            duration: 1000
          })
        }
        var that = this
        this.$http.post(this.$store.state.addclothesurl, data).then(function (ret) {
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
  .selectbox{
    text-align: left
  }
  .vcode{
    width:50%
  }
</style>
