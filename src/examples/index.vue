<template>
  <layout class="frame">
    <XBody slot="body" class="frame-body">
      <wrapper :class="classes">
        <sidebar class="frame-sidebar" ref="frame-sidebar" :menuList="menuList" />
        <div class="frame-container" ref="frame-container">
          <router-view></router-view>
        </div>
      </wrapper>
    </XBody>
    <div slot="footer"></div>
  </layout>
</template>
<script>
import { mapGetters } from 'vuex'
import MenuList from './menu.json.js'
import Layout from '@/components/Layout'
import XBody from '@/components/XBody'
import Wrapper from '@/components/Wrapper'
import Sidebar from '@/components/Sidebar'
export default {
  computed: {
    ...mapGetters({
      layoutGrid: 'layoutGrid', // 是否栅格布局
      menuList: 'menuList' // 菜单
    }),
    classes() {
      return this.layoutGrid ? 'layout-grid' : ''
    }
  },
  components: {Layout, XBody, Wrapper, Sidebar},
  data() {
    return {}
  },
  watch: {
    layoutGrid(value) {
      this.styles(value)
    }
  },
  mounted() {
    this.$store.commit('MenuList', MenuList)
    this.styles(this.layoutGrid)
    window.onresize = () => {
      this.styles(this.layoutGrid)
    }
  },
  methods: {
    styles(layout) {
      let height = window.innerHeight - 60
      let sidebar = this.$refs['frame-sidebar'].$el
      let container = this.$refs['frame-container']
      if (layout) {
        sidebar && (sidebar.style.height = height + 10 + 'px')
        container && (container.style.minHeight = height + 'px')
      }
    }
  }
}
</script>

<style lang="less">
body {
  background: #ebf0f5;
}
.frame {
  &-body {
    // margin-top: 10px;
    position: relative;
    &::after {
      content: '';
      clear: both;
      display: table;
    }
  }
  &-sidebar {
    display: none;
    width: 180px;
    margin-right: 0px;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: #242d3b;
      border-radius: 0px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #6b7fa4;
      border-radius: 10px;
    }
  }
  &-container {
    overflow: hidden;
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    top: 10px;
    left: 0;
    right: 0;
  }
  .layout-grid {
    .frame-sidebar {
      display: block;
    }
    .frame-container {
      margin-left: 180px;
    }
    .el-breadcrumb {
      margin-left: -220px;
    }
  }
  .content {
    padding: 60px;
    > .heading-1:first-child {
      margin-top: 0;
    }
  }
}
.router-link:hover {
  color: #3983e5 !important;
}
</style>
