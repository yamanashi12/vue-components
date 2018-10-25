<template>
  <ContentBox label="SearchBox">
    <div class="demo-box">
      <div class="search-box">
        <el-form :inline="true" ref="search" :model="search">
          <el-form-item label="账号：">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="search.mobile"></el-input>
          </el-form-item>
          <SearchMore>
            <el-form-item label="所属部门：">
              <el-input v-model="search.mobile"></el-input>
            </el-form-item>
            <el-form-item label="所属部门：">
              <el-input v-model="search.mobile"></el-input>
            </el-form-item>
            <el-form-item label="所属部门：">
              <el-input v-model="search.mobile"></el-input>
            </el-form-item>
            <el-form-item label="所属部门：">
              <el-input v-model="search.mobile"></el-input>
            </el-form-item>
          </SearchMore>
          <el-button size="small" type="primary" plain>查询</el-button>
          <el-button size="small" type="text">重置</el-button>
        </el-form>
      </div>
    </div>
  </ContentBox>
</template>
<script>
import SearchMore from '@/components/SearchMore'
export default {
  components: {
    SearchMore
  },
  data() {
    return {
      search: {},
      value2: [],
      attribute: []
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: 'SearchBox' }])
  },
  methods: {}
}
</script>
