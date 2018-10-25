<template>
  <div class="layout">
    <slot v-if="$slots.header" name="header"></slot>
    <x-header v-else></x-header>
    <slot name="body"></slot>
    <slot v-if="$slots.footer" name="footer"></slot>
    <x-footer v-else></x-footer>
    <slot></slot>
  </div>
</template>

<script>
import XHeader from './XHeader'
export default {
  name: 'ELayout',
  components: {
    XHeader
  }
}
</script>
