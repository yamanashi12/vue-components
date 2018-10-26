<template>
  <div class="">
    <template v-if="item.value && item.value.length > 0">
      <img v-for="(item, index) in item.value" :src="item" :key="index" class="img"/>
    </template>
    <template v-else>
      <p class="center">编辑图片</p>
    </template>
  </div>
</template>
<script>
export default {
  name: 'EditorImage',
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      imgUrl: ''
    }
  }
}
</script>
<style lang="less" scoped>
.img{
  width: 100%;
}
</style>

