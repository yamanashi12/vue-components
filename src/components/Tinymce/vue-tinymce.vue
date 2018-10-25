<template>
  <div class="tinymce-container editor-container">
    <textarea :id="id" class="tinymce-textarea"/>
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
    </div>
  </div>
</template>

<script>
const INIT = 0
const INPUT = 1
const CHANGED = 2
import tinymce from 'tinymce/tinymce.min.js'
import editorImage from './editorImage'
import baseSetting from './setting'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/media'
import 'tinymce/plugins/preview'
import './langs/zh_CN'
export default {
  components: { editorImage },
  props: {
    value: {
      type: String,
      default: ''
    },
    setup: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      id: '',
      editor: null,
      status: INIT,
      backup: ''
    }
  },
  watch: {
    value(val) {
      if (this.status === CHANGED) return (this.status = INPUT)
      if (!this.editor || !this.editor.initialized) return // fix editor plugin is loading and set content will throw error.
      this.editor.setContent(val)
    }
  },
  created() {
    this.id = 'vue-tinymce-' + Date.now()
    if (typeof tinymce === 'undefined') throw new Error('tinymce undefined')
  },
  mounted() {
    this.$nextTick(() => {
      const setting = Object.assign({}, baseSetting, {
        selector: `#${this.id}`,
        setup: editor => {
          this.setup(editor)
          this.editor = editor
          editor.on('init', () => {
            // console.log('init', this.value);
            editor.setContent(this.value)
            //fix execCommand not change ,more see issues#2
            editor.on('input change undo redo execCommand KeyUp', () => {
              if (this.status === INPUT || this.status === INIT) return (this.status = CHANGED)
              this.$emit('input', editor.getContent())
            })
            //fix have chang not to emit input,more see issues #4
            editor.on('NodeChange', () => {
              this.$emit('input', editor.getContent())
            })
          })
        }
      })
      tinymce.init(setting)
    })
  },
  methods: {
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        tinymce.get(_this.id).insertContent(`<img class="wscnph" src="${v}" >`)
      })
    }
  },
  beforeDestroy: function() {
    if (this.editor) {
      this.editor.remove()
    }
  }
}
</script>
<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>