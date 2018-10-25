<template>
  <div class="sidebar">
    <el-menu 
      :default-active="activeIndex" 
      unique-opened 
      @select="handleSelect">
      <template v-for="item in menuList">
        <el-submenu :index="item.url || 'id'+item.id" :key="item.id" v-if="item.chirdMenuList">
          <template slot="title">
            {{item.menuName}}
          </template>
          <el-menu-item v-for="chird in item.chirdMenuList" :key="chird.id" :index="chird.url" :item="chird">
            {{chird.menuName}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.url" class="el-submenu__title" :key="item.id" :item="item" v-else>
          {{item.menuName}}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  nameL: 'Sidebar',
  props: {
    menuList: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  errorCaptured() {
    return false
  },
  computed: {
    activeIndex() {
      let path = this.$route.path
      if (this.$route.query.src && this.$route.path === '/iframe') {
        path = this.$route.query.src
      }
      return path || '' 
    }
  },
  methods: {
    handleSelect (key, route, $e) {
      if ($e.$attrs.item.iframe) { // 判断是旧页面使用iframe打开
        this.$router.push({path: 'iframe', query: {
          src: key,
          title: $e.$attrs.item.menuName
        }})
      } else {
        this.$router.push({path: key})
      }
    }
  }
}
</script>
<style src="./index.less" lang="less"></style>
