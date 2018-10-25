<template>
  <div @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Preview from './Preview'
  export default {
    name: 'PreviewBox',
    methods: {
      handleClick (e) {
        if (/^img$/i.test(e.target.nodeName)) {
          e.preventDefault()
          e.stopPropagation()
          let list = []
          let index = 0
          Array.from(this.$el.querySelectorAll('img')).forEach((item, i) => {
            if (item === e.target) {
              index = i
            }
            list.push(item.getAttribute('data-src') || item.src)
          })
          let node = document.createElement('div')
          document.body.appendChild(node)
          new Vue({ // eslint-disable-line
            el: node,
            components: {
              Preview
            },
            data: () => {
              return {
                visible: true,
                index: index,
                list: list
              }
            },
            mounted () {
              this.index = index
            },
            methods: {
              handleClose () {
                this.$destroy()
              }
            },
            render (h) {
              return <Preview visible={this.visible} index={this.index} onClose={this.handleClose} list={list} />
            }
          })
        }
      }
    }
  }
</script>
