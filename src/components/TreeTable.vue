<template>
  <div :style="{width:tableWidth}" class='autoTbale'>
    <table class="treeTable el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--small">
      <thead>
        <tr>
          <th v-for="(column,index) in cloneColumns" :key="index" :style="`width:${column.width}px`" :align="column.align">
            <div class="cell">
              <label v-if="column.type === 'selection'">
                <el-checkbox v-model="checks" @change="handleCheckAll"/>
              </label>
              <label v-else>{{ renderHeader(column, index) }}</label>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in initItems" :key="item[valName]" v-show="show(item)" class="el-table__row">
          <td v-for="(column,snum) in columns" :key="column.key" :style=tdStyle(column)>
            <div class="cell">
              <label v-if="column.type === 'selection'">
                  <el-checkbox :label="item[valName]" v-model="checkGroup" @change="handleCheckChange(item,$event,index)"/>
              </label>
              <div v-if="column.type === 'action'">
                <slot name="action" :index="index" :row="makeData(item)"></slot>
              </div>
              <label @click="toggle(index,item)" v-if="!column.type || column.type === 'flod'">
                <span v-if='snum==iconRow'>
                  <i v-html='item.spaceHtml'></i>
                  <i v-if="item.children&&item.children.length>0" :class="{'el-icon-caret-right':!item.expanded,'el-icon-caret-bottom':item.expanded }"></i>
                  <i v-else class="ms-tree-space"></i>
                </span> 
                {{renderBody(item,column) }}
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TreeTable',
  props: {
    columns: Array,
    items: {
      type: Array,
      default: function() {
        return []
      }
    },
    valName: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      initItems: [], //处理后数据数组
      cloneColumns: [], //处理后的表头数据
      checkGroup: [], //复选框数组
      checks: false, //全选
      screenWidth: document.body.clientWidth, //自适应宽
      tdsWidth: 0, //td总宽
      timer: false, //控制监听时长
      dataLength: 0, //树形数据长度
      iconRow: 0
    }
  },
  computed: {
    tableWidth() {
      return this.tdsWidth > this.screenWidth && this.screenWidth > 0 ? this.screenWidth + 'px' : '100%'
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        setTimeout(() => {
          this.timer = false
        }, 400)
      }
    },
    items() {
      if (this.items) {
        this.dataLength = this.Length(this.items)
        this.initData(this.deepCopy(this.items), 1, null)
        this.checkGroup = this.renderCheck(this.items)
        if (this.checkGroup.length == this.dataLength) {
          this.checks = true
        } else {
          this.checks = false
        }
      }
    },
    columns: {
      handler() {
        this.cloneColumns = this.makeColumns()
      },
      deep: true
    },
    checkGroup(data) {
      this.checkAllGroupChange(data)
    }
  },
  mounted() {
    if (this.items) {
      this.dataLength = this.Length(this.items)
      this.initData(this.deepCopy(this.items), 1, null)
      this.cloneColumns = this.makeColumns()
      this.checkGroup = this.renderCheck(this.items)
      this.iconRow = this.setIconRow()
      if (this.checkGroup.length == this.dataLength) {
        this.checks = true
      } else {
        this.checks = false
      }
    }
    // 绑定onresize事件 监听屏幕变化设置宽
    this.$nextTick(() => {
      this.screenWidth = document.body.clientWidth
    })
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    // 有无多选框折叠位置优化
    setIconRow() {
      const num = this.columns.findIndex(item => item.type === 'flod')
      for (var i = 0, len = this.columns.length; i < len; i++) {
        if (this.columns[i].type == 'selection') {
          return num >= 0 ? num : 1
        }
      }
      return num >= 0 ? num : 1
    },
    // 设置td宽度,td的align
    tdStyle(column) {
      var style = {}
      if (column.align) {
        style['text-align'] = column.align
      }
      if (column.width) {
        style['min-width'] = column.width + 'px'
      }
      return style
    },
    // 点击事件 返回数据处理
    makeData(data) {
      const t = this.type(data)
      let o
      if (t === 'array') {
        o = []
      } else if (t === 'object') {
        o = {}
      } else {
        return data
      }
      if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
          o.push(this.makeData(data[i]))
        }
      } else if (t === 'object') {
        for (let i in data) {
          if (i != 'spaceHtml' && i != 'parent' && i != 'level' && i != 'expanded' && i != 'isShow' && i != 'load') {
            o[i] = this.makeData(data[i])
          }
        }
      }
      return o
    },
    // 处理表头数据
    makeColumns() {
      let columns = this.deepCopy(this.columns)
      this.tdsWidth = 0
      columns.forEach((column, index) => {
        column._index = index
        column._width = column.width ? column.width : ''
        this.tdsWidth += column.width ? parseFloat(column.width) : 0
      })
      return columns
    },
    // 数据处理 增加自定义属性监听
    initData(items, level, parent) {
      this.initItems = []
      let spaceHtml = ''
      for (var i = 1; i < level; i++) {
        spaceHtml += "<i class='ms-tree-space'></i>"
      }
      items.forEach((item, index) => {
        item = Object.assign({}, item, {
          parent: parent,
          level: level,
          spaceHtml: spaceHtml
        })
        if (typeof item.expanded == 'undefined') {
          item = Object.assign({}, item, {
            expanded: false
          })
        }
        if (typeof item.show == 'undefined') {
          item = Object.assign({}, item, {
            isShow: false
          })
        }
        if (typeof item.isChecked == 'undefined') {
          item = Object.assign({}, item, {
            isChecked: false
          })
        }
        item = Object.assign({}, item, {
          load: item.expanded ? true : false
        })
        this.initItems.push(item)
        if (item.children && item.expanded) {
          this.initData(item.children, level + 1, item)
        }
      })
    },
    //  隐藏显示
    show(item) {
      return item.level == 1 || (item.parent && item.parent.expanded && item.isShow)
    },
    toggle(index, item) {
      let level = item.level + 1
      let spaceHtml = ''
      for (var i = 1; i < level; i++) {
        spaceHtml += "<i class='ms-tree-space'></i>"
      }
      if (item.children) {
        if (item.expanded) {
          item.expanded = !item.expanded
          this.close(index, item)
        } else {
          item.expanded = !item.expanded
          if (item.load) {
            this.open(index, item)
          } else {
            item.load = true
            item.children.forEach((child, childIndex) => {
              this.initItems.splice(index + childIndex + 1, 0, child)
              //设置监听属性
              this.$set(this.initItems[index + childIndex + 1], 'parent', item)
              this.$set(this.initItems[index + childIndex + 1], 'level', level)
              this.$set(this.initItems[index + childIndex + 1], 'spaceHtml', spaceHtml)
              this.$set(this.initItems[index + childIndex + 1], 'isShow', true)
              this.$set(this.initItems[index + childIndex + 1], 'expanded', false)
            })
          }
        }
      }
    },
    open(index, item) {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = true
          if (child.children && child.expanded) {
            this.open(index + childIndex + 1, child)
          }
        })
      }
    },
    close(index, item) {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = false
          child.expanded = false
          if (child.children) {
            this.close(index + childIndex + 1, child)
          }
        })
      }
    },
    //点击check勾选框,判断是否有children节点 如果有就一并勾选
    handleCheckChange(data, event, index) {
      data.isChecked = !data.isChecked
      var arr = data.children
      // 选择所有children
      const setChildrenVal = (data, checkGroup, valName) => {
        if (data.children && data.children.length > 0) {
          data.children.forEach(item => {
            checkGroup.push(item[valName])
            setChildrenVal(item, checkGroup, valName)
          })
        }
      }
      // 移除所有children
      const delChildrenVal = (data, checkGroup, index, valName) => {
        let del = false
        if (data[valName] === checkGroup[index]) {
          checkGroup.splice(index, 1)
          del = true
        } else if (data.children && data.children.length > 0) {
          let del = false
          for (let i = 0; i < data.children.length; i++) {
            del = delChildrenVal(data.children[i], checkGroup, index, valName)
            if (del) {
              return del
            }
          }
        }
        return del
      }
      const setChecked = (arr, checkGroup, data, valName) => {
        if (data.isChecked) {
          checkGroup.push(data[valName])
          setChildrenVal(data, checkGroup, valName)
        } else {
          for (var i = 0; i < checkGroup.length; i++) {
            let del = delChildrenVal(data, checkGroup, i, valName)
            if (del) {
              i -= 1
            }
          }
        }
      }
      // setParent 设置上级的选中
      const setParentChecked = (data, checkGroup, valName) => {
        if (data.parent && data.parent.children && data.parent.children.length > 0) {
          if (
            data.parent.children.length ===
            data.parent.children.filter(item => {
              if (this.checkGroup.indexOf(item[this.valName]) >= 0) {
                return item
              }
            }).length
          ) {
            data.parent.isChecked = true
            this.checkGroup.push(data.parent[this.valName])
          } else {
            let index = this.checkGroup.indexOf(data.parent[this.valName])
            if (index !== -1) {
              this.checkGroup.splice(index, 1)
            }
          }
          if (data.parent.parent) {
            setParentChecked(data.parent, checkGroup, valName)
          }
        }
      }
      if (arr) {
        setChecked(arr, this.checkGroup, data, this.valName)
      }
      setParentChecked(data, this.checkGroup, this.valName)
      this.checkGroup = this.getArray(this.checkGroup)
    },
    //checkbox 全选 选择事件
    handleCheckAll() {
      if (this.checks) {
        this.checkGroup = this.getArray(this.checkGroup.concat(this.All(this.items)))
        this.initItems.map(item => (item.isChecked = true))
      } else {
        this.checkGroup = []
        this.initItems.map(item => (item.isChecked = false))
      }
      // this.$emit('on-selection-change', this.checkGroup)
    },
    // 数组去重
    getArray(a) {
      var hash = {},
        len = a.length,
        result = []
      for (var i = 0; i < len; i++) {
        if (!hash[a[i]]) {
          hash[a[i]] = true
          result.push(a[i])
        }
      }
      return result
    },
    // 处理全选
    checkAllGroupChange(data) {
      if (this.dataLength > 0 && data.length === this.dataLength) {
        this.checks = true
      } else {
        this.checks = false
      }
      this.$emit('on-selection-change', this.checkGroup)
    },
    All(data) {
      let arr = []
      data.forEach(item => {
        arr.push(item[this.valName])
        if (item.children && item.children.length > 0) {
          arr = arr.concat(this.All(item.children))
        }
      })
      return arr
    },
    // 返回树形数据长度
    Length(data) {
      let length = data.length
      data.forEach(child => {
        if (child.children) {
          length += this.Length(child.children)
        }
      })
      return length
    },
    // 返回表头
    renderHeader(column, $index) {
      if ('renderHeader' in this.columns[$index]) {
        return this.columns[$index].renderHeader(column, $index)
      } else {
        return column.title || '#'
      }
    },
    // 返回内容
    renderBody(row, column, index) {
      return row[column.key]
    },
    // 默认选中
    renderCheck(data) {
      let arr = []
      data.forEach(item => {
        if (item._checked) {
          arr.push(item[this.valName])
        }
        if (item.children && item.children.length > 0) {
          arr = arr.concat(this.renderCheck(item.children))
        }
      })
      return arr
    },
    // 深度拷贝函数
    deepCopy(data) {
      var t = this.type(data),
        o,
        i,
        ni
      if (t === 'array') {
        o = []
      } else if (t === 'object') {
        o = {}
      } else {
        return data
      }
      if (t === 'array') {
        for (i = 0, ni = data.length; i < ni; i++) {
          o.push(this.deepCopy(data[i]))
        }
        return o
      } else if (t === 'object') {
        for (i in data) {
          o[i] = this.deepCopy(data[i])
        }
        return o
      }
    },
    type(obj) {
      var toString = Object.prototype.toString
      var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
      }
      return map[toString.call(obj)]
    }
  },
  beforeDestroy() {
    window.onresize = null
  }
}
</script>
<style lang="less">
.autoTbale {
  overflow: auto;
  .treeTable {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    .table-bordered {
      border: 1px solid #ebebeb;
    }
    .treeTable > tbody > tr > td,
    .treeTable > tbody > tr > th,
    .treeTable > thead > tr > td,
    .treeTable > thead > tr > th {
      border-top: 1px solid #e7eaec;
      line-height: 1.42857;
      padding: 8px;
      vertical-align: middle;
    }
    .el-checkbox__label {
      display: none;
    }
    .el-checkbox {
      margin-right: 0;
    }
    .ms-tree-space {
      position: relative;
      top: 1px;
      display: inline-block;
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      width: 14px;
      height: 14px;
      &::before {
        content: '';
      }
    }
  }
}
</style>