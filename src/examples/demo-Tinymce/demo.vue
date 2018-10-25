<template>
  <ContentBox label="cell布局">
    <img :src="`${url}static/favicon.ico`">
    <div class="demo-box">
      <Tinymce v-model='tinymceHtml'></Tinymce>
      <div v-html='tinymceHtml'></div>
    </div>
  </ContentBox>
</template>

<script>
import Tinymce from '@/components/Tinymce/vue-tinymce.vue'
export default {
  name: 'tinymce',
  data() {
    return {
      tinymceHtml: '请输入内容111',
      url: process.env.BASE_URL
    }
  },
  mounted() {},
  components: { Tinymce }
}
</script>