<template>
  <div id="app">

    <template v-if="token === ''">
      <main class="login">
        <login-module />
      </main>
    </template>

    <template v-else>
      <sidebar/>
      <main class="cms">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </main>
    </template>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Sidebar, LoginModule} from "@/components";
  import {namespace} from "vuex-class";

  const components = {Sidebar, LoginModule};
  const userStore = namespace("userStore");

  @Component({components})
  export default class App extends Vue {
    @userStore.State token!: string;
  }
</script>

<style lang="scss" scoped>
  .login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cms {
    margin-left: 50px;
    padding: 50px;
  }
</style>