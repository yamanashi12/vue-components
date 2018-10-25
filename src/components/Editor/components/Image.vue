<template>
  <div class="">
    <ImgGroupUpload v-model="item.value" :data="{maxHeight: 500, maxWidth: 1000}" :height="150" :width="`100%`"></ImgGroupUpload>
  </div>
</template>
<script>
import ImgGroupUpload from '@/components/ImgGroupUpload'
export default {
  name: 'EditorImage',
  components: { ImgGroupUpload },
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
