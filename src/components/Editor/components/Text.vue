<template>
  <div class="">
    <template v-if="item.value">{{item.value}}</template>
    <template v-else>
      <p class="center">{{item.title}}</p>
    </template>
  </div>
</template>
<script>
export default {
  name: 'EditorText',
  props: {
    item: {
      type: Object
    }
  }
}
</script>
