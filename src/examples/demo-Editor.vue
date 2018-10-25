<template>
  <ContentBox label="富文本">
    <div class="demo-box">
      <Editor v-model="text" />
    </div>
  </ContentBox>
</template>
<script>
import Editor from '@/components/Editor'
export default {
  components: {
    Editor
  },
  data() {
    return {
      text: []
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: '富文本' }])
  },
  methods: {}
}
</script>
