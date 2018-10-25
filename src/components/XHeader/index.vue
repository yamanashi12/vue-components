<template>
  <div class="header">
    <wrapper>
      <slot v-if="$slots.default"></slot>
      <div v-else>
        <div class="header-logo">
          <div class="header-logo-inner">
            <router-link to="/">
              <img :src="logo">
            </router-link>
            <div class="showMenu" @click="showMenu"></div>
          </div>
        </div>
        <el-row class="header-row">
          <el-col class="header-sub" :span="16">
            <el-breadcrumb separator="/" class="header-breadcrumb">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="breadcrumb.length === index - 1 ? '' : { path: item.path }" v-for="(item, index) in breadcrumb" :key="index">{{item.title}}</el-breadcrumb-item>
              <!-- <el-breadcrumb-item>{{menuName || ''}}</el-breadcrumb-item> -->
            </el-breadcrumb>
          </el-col>
          <el-col class="header-sub" :span="8">
            <el-dropdown @command="userEdit" v-if="userName">
              <div class="el-dropdown-link">
                <!-- <e-avatar class="user-photo" :src="this.person_info.iconUrl" /> -->
                <span class="el-dropdown-trigger-text user-name small">{{userName}}</span>
              </div>
              <i class="el-icon-arrow-down" />
              <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
                <el-dropdown-item command="userexit">
                  <i class="el-icon-back"></i> 退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </wrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from './yunjiLogo.png'
// import routes from '@/routers'
import Wrapper from '../Wrapper'
export default {
  computed: {},
  components: {Wrapper},
  props: {
    logo: {
      type: String,
      default: logo
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      userName: 'demo',
      breadcrumb: []
    }
  },
  mounted() {
    let _this = this
    window.addEventListener(
      'message',
      function(e) {
        if (e.data.act === 'breadcrumb') {
          _this.breadcrumb = e.data.msg
        }
      },
      false
    )
  },
  methods: {
    userEdit(command) {
      if (command === 'userexit') {
        this.$confirm('确定退出登录, 是否继续?', '温馨提示', {
          type: 'warning'
        }).then(() => {
          location.href = '//' + globalConfig.adminBasePath + '/yunjiadmin/admin/sso/logout.xhtml'
          // indexApi.userExit({}, {successMsg: '登出成功'}).then((res) => {
          //   url = url + '/login'
          //   location.href = url
          // })
        })
      }
    },
    showMenu() {
      let show = this.$store.getters.layoutGrid
      this.$store.commit('LayoutGrid', !show)
    }
  }
}
</script>
<style src="./index.less" lang="less"></style>
