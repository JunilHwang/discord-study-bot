<template>
  <div id="app">
    <sidebar/>
    <main>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </main>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Sidebar} from '@/components'

  const components = { Sidebar };

  @Component({ components })
  export default class App extends Vue {

  }
</script>

<style lang="scss" scoped>
  main {
    margin-left: 50px;
    padding: 50px;
  }
</style>