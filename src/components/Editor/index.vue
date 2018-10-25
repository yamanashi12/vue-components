<template>
  <div class="Editor">
    <div class="Editor-area">
      <div class="Editor-area-content">
        <div class="Editor-area-content-scroll">
          <div class="Editor-area-content-item" v-for="(item, index) in myValue" :key="index">
            <component :is="item.name" :item="item" :ref="`${item.name}${index}`" :imgAction="imgAction" :videoAction="videoAction" :qiniuToken="qiniuToken"/>
          </div>
        </div>
      </div>
    </div>
    <div class="Editor-fun">
      <el-button 
        v-for="(item, index) in plugins" 
        :key="index" 
        @click="addComponents(item)">
          {{item.title}}
      </el-button>
    </div>
  </div>
</template>
<script>
import EditorJson from './Editor.json.js'
import EditorText from './components/Text'
import EditorVideo from './components/Video'
import EditorImage from './components/Image'
import * as api from './Editor.service.js'
export default {
  name: 'Editor',
  components: { EditorText, EditorVideo, EditorImage },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    imgAction: {
      type: String
    },
    videoAction: {
      type: String
    }
  },
  data() {
    return {
      myValue: this.value,
      plugins: EditorJson.plugins,
      qiniuToken: {}
    }
  },
  watch: {
    value() {
      this.myValue = this.value
    }
  },
  mounted() {
    api.getVideoToken().subscribe(
      res => {
        this.qiniuToken = res.response.data.uptoken
      }
    )
  },
  methods: {
    addComponents(item) {
      this.myValue.push(Object.assign({}, item))
    },
    removeComponents(i) {
      this.myValue.splice(i, 1)
    }
  }
}
</script>

<style lang="less">
@import '../styles/var.less';
.Editor {
  width: 100%;
  display: flex;
  &-area {
    width: 433px;
    height: 868px;
    background: url(./phone.png) no-repeat center;
    background-size: 100% auto;
    padding: 58px 29px 28px;
    &-content {
      padding: 6px;
      padding-left: 2px;
      width: 100%;
      height: 100%;
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
      &-scroll{
        width: 100%;
      }
      &-item {
        width: 100%;
        border: 1px dashed transparent;
        border-bottom: 1px dashed @border-color-base;
        .center {
          text-align: center;
        }
        &:hover,
        &.active {
          border: 1px dashed @color-primary;
        }
      }
    }
  }
  &-fun {
    width: 400px;
    height: 200px;
    padding: 20px;
    margin-left: 20px;
    border: 1px solid @border-color-base;
  }
  .img-group-upload{
    .img-group-item{
      height: auto !important;
      min-height: 150px;
      margin-right: 0;
      margin-bottom: 0;
      button{
        padding-left: 0;
        padding-right: 0;
      }
      img{
        width: 100%;
      }
    }
  }
}
</style>

