<template>
  <div class="search-box">
    <el-form :inline="true" ref="search" :model="search">
      <slot></slot>
      <search-more>
        <slot name="more">
        </slot>
      </search-more>
      <el-button size="small" type="primary" plain @click="handleSearch">查询</el-button>
      <el-button size="small" type="text" @click="resetForm">重置</el-button>
    </el-form>
  </div>
</template>
<script>
import {searchUpdateRoute} from '@/utils'
export default {
  name: 'Search',
  components: {
    'search-more': resolve => require(['@/components//SearchMore'], resolve)
  },
  props: {
    query: {
      type: Object
    }
  },
  data() {
    return {
      search: {}
    }
  },
  mounted () {
    this.search = this.getSearch()
  },
  methods: {
    handleSearch () {
      searchUpdateRoute(Object.assign({}, this.query, this.search))
    },
    resetForm () {
      this.$refs.search.resetFields()
    },
    getSearch(query) {
      let search = Object.assign({}, query, this.$route.query)
      delete search.pageTotal
      delete search.total
      delete search.pageIndex
      delete search.pageSize
      return search
    }
  }
}
</script>

