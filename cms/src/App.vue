<template>
  <div id="app">
    <sidebar/>
    <router-view/>
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