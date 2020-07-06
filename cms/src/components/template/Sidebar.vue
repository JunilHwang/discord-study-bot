<template>
  <div class="sidebar">

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class Sidebar extends Vue {

  }
</script>

<style lang="scss" scoped>
.sidebar {
  background: #222;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 50px;
}
</style>