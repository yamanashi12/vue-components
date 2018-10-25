<template>
  <ContentBox label="灯箱查看大图">
    <div class="demo-box">
      <PreviewBox>
        <div class="img-list">
          <img :src="item" v-for="(item, index) in imgList" :key="index" />
        </div>
      </PreviewBox>
    </div>
  </ContentBox>
</template>
<script>
import PreviewBox from '@/components/PreviewBox'
export default {
  components: {
    PreviewBox
  },
  data() {
    return {
      imgList: [
        'http://img3.imgtn.bdimg.com/it/u=2651699413,2424500550&fm=26&gp=0.jpg',
        'http://img2.imgtn.bdimg.com/it/u=3163094850,381287186&fm=26&gp=0.jpg',
        'http://img4.imgtn.bdimg.com/it/u=4213360101,3373903901&fm=26&gp=0.jpg'
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: '灯箱查看大图' }])
  }
}
</script>
