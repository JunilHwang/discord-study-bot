<template>
  <section>
    <h1>Github Hook 관리</h1>

    <login-module v-if="token === ''" />

  </section>
</template>

<script lang="ts">
  import * as Cookie from 'js-cookie'
  import {Component, Vue} from 'vue-property-decorator'
  import {LoginModule} from "@/components";

  const components = { LoginModule };

  @Component({ components })
  export default class Hooks extends Vue {
    private token: string = Cookie.get('access_token') || ''
  }
</script>