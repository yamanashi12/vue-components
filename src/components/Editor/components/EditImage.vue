<template>
  <div class="">
    <ImgGroupUpload v-model="item.value" :data="{maxHeight: 500, maxWidth: 1000}"></ImgGroupUpload>
  </div>
</template>
<script>
import ImgGroupUpload from '@/components/ImgGroupUpload'
export default {
  name: 'EditorEditImage',
  components: { ImgGroupUpload },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
    }
  }
}
</script>
