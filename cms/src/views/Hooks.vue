<template>
  <section>
    <h1>Github Hook 관리</h1>
    <el-card>
      <h2 slot="header">Github Repository 목록</h2>
    </el-card>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class Hooks extends Vue {

  }
</script>