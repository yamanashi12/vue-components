<template>
  <el-pagination
    v-show = "query.total"
    :page-sizes="[10, 20, 40, 60, 80, 100]"
    v-bind="$props"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange">
  </el-pagination>
</template>

<script>
import { Pagination } from 'element-ui'
import { searchUpdateRoute } from '@/utils'
let props = { ...Pagination.props }
delete props.pageSizes
export default {
  props: {
    ...props,
    query: {
      type: [Object, Array]
    },
    history: {
      // 列表分页是否产生历史记录
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: [Object, Array],
      default: function(value) {
        return [10, 20, 40, 60, 80, 100]
      }
    }
  },
  watch: {
    $route() {
      this.$emit('fetch', this.getQuery(this.query))
    }
  },
  data() {
    return {}
  },
  methods: {
    getQuery(query) {
      let _query = this.$route.query
      if (_query.pageIndex) {
        _query.pageIndex = parseInt(_query.pageIndex)
      } else {
        delete _query.pageIndex
      }
      if (_query.pageSize) {
        _query.pageSize = parseInt(_query.pageSize)
      } else {
        delete _query.pageSize
      }
      delete _query.pageTotal
      delete _query.total
      return Object.assign({}, query, _query)
    },
    getSearch(query) {
      let search = Object.assign({}, query, this.$route.query)
      delete search.pageTotal
      delete search.total
      return search
    },
    updateRoute(query) {
      // 更新URL地址
      if (this.history) {
        searchUpdateRoute(query)
      } else {
        this.$emit('update:query', query)
        this.$emit('fetch', query)
      }
    },
    handleCurrentChange(value) {
      // 修改页数事件
      if (!this.$sizeChangeTimer) {
        //eslint-disable-line
        let query = Object.assign({}, this.query, { pageIndex: value })
        this.updateRoute && this.updateRoute(query)
        let node = this.$el.querySelector('.el-pagination')
        if (node) {
          // 阻止频繁点击
          node.style.pointerEvents = 'none'
          setTimeout(() => {
            node.style.pointerEvents = ''
          }, 1000)
        }
      }
    },
    handleSizeChange(value) {
      // 修改分页条数事件
      this.$sizeChangeTimer = true // 避免页数修改后当前页Change事件重复触发
      setTimeout(() => {
        this.$sizeChangeTimer = false
      }, 500)
      let pages = {}
      pages.pageIndex = 1
      pages.pageSize = value
      let query = Object.assign({}, this.query, pages)
      this.updateRoute(query)
    }
  }
}
</script>

<style lang="less">
</style>
