import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  active: 'index',
  url: {
    login: 'login'
  },
  dialog_clothes: false,
  addclothesurl: '',
  addclothes: {
    id: '',
    name: '',
    code: '',
    price: '',
    size1: '',
    size3: '',
    size5: '',
    size7: '',
    size9: ''
  },
  addclothes_btn: true,
  dialog_outgoing: false,
  outgoing: {
    id: '',
    name: '',
    code: '',
    price: '',
    size: '',
    count: '',
    phone: ''
  },
  membertitle: '',
  memberdata: {
    id: '',
    name: '',
    phone: '',
    integral: 0,
    integral2: 0
  },
  dialog_member: false,
  addmember_btn: true,
  addmember: '',
  integralshow: false,
  managerdata: {
    id: '',
    name: '',
    phone: '',
    adress: '',
    idcard: '',
    loginname: '',
    password: ''
  },
  dialog_manager: false,
  addmanager: '',
  addmanager_btn: true,
  managertitle: '',
  passWord: false,
  oldpassword: '',
  newpassword: '',
  repassword: ''
}
const mutations = {
  setdata (state, item) {
    console.log('mutation 方法')
    state.data = item
  }
}
const actions = {
  getdata ({commit}, item) {
    commit('setdata', item)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
