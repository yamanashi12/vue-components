import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// state
let state = {
  loading: false,
  layoutGrid: true, // 是否栅格布局
  menuList: [],
  breadcrumb: []
}

// getters
const getters = {
  loading: state => state.loading,
  layoutGrid: state => state.layoutGrid,
  menuList: state => state.menuList,
  breadcrumb: state => state.breadcrumb
}

// actions
const actions = {}

// mutations
const mutations = {
  LayoutGrid(state, value) {
    // 设置左侧siderBar是否可见
    state.layoutGrid = value
  },
  SetBreadcrumb(state, value) {
    state.breadcrumb = value
  },
  MenuList(state, value) {
    // 将子菜单拿出来
    let setArr = function(list) {
      list.map(item => {
        if (item.chirdMenuList && item.chirdMenuList.length > 0) {
          item.chirdMenuList = setArr(item.chirdMenuList)
        }
      })
      return list
    }
    state.menuList = setArr(value)
  }
}

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {},
  strict: false
})

export default store
