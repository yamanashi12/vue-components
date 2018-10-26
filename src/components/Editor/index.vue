<template>
  <div class="Editor">
    <div class="Editor-area">
      <div class="Editor-area-content">
        <div class="Editor-area-content-scroll">
          <ContentItem v-for="(item, index) in myValue" :key="index" :index="index" :item="item" @select="handleSelect" :class="{'active': index === activeIndex}">
            <template slot-scope="scope">
              <component :is="`Editor${scope.item.name}`" :item="scope.item" :ref="`${item.name}${index}`"/>
            </template>
          </ContentItem>
        </div>
      </div>
    </div>
    <div class="Editor-handle">
      <div class="Editor-fun">
        <el-button 
          v-for="(item, index) in plugins" 
          :key="index" 
          @click="addComponents(item)">
            {{item.title}}
        </el-button>
      </div>
      <div class="Editor-fun" v-if="active.name">
        <component :is="`EditorEdit${active.name}`" :item="active" :imgAction="imgAction" :videoAction="videoAction" :qiniuToken="qiniuToken"/>
      </div>
    </div>
  </div>
</template>
<script>
import EditorJson from './Editor.json.js'
import * as api from './Editor.service.js'
export default {
  name: 'Editor',
  components: { 
    EditorText: (resolve) => require(['./components/Text'], resolve), 
    EditorVideo: (resolve) => require(['./components/Video'], resolve), 
    EditorImage: (resolve) => require(['./components/Image'], resolve), 
    ContentItem: (resolve) => require(['./components/ContentItem'], resolve),
    EditorEditImage: (resolve) => require(['./components/EditImage'], resolve),
    EditorEditVideo: (resolve) => require(['./components/EditVideo'], resolve)
  },
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
      qiniuToken: {},
      active: {},
      activeIndex: 0,
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
    },
    handleSelect (index) {
      this.active = this.myValue[index]
      this.activeIndex = index
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
      
    }
  }
  &-handle{
    width: 400px;
  }
  &-fun {
    padding: 30px;
    margin-bottom: 20px;
    border: 1px solid @border-color-base;
  }
}
</style>

