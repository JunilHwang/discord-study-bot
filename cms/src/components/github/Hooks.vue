<template>
  <el-card class="hooks">
    <h2 slot="header">Github Hooks</h2>
    <p v-if="selectedHook === null">
      Repository를 선택하여 Hooks를 조회해주세요.
    </p>
    <ul>
      <li>
        {{ selectedHook }}
      </li>
    </ul>
  </el-card>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import {namespace} from "vuex-class";
  import {GithubHook} from "domain/src";

  const githubStore = namespace("githubStore");

  @Component
  export default class Hooks extends Vue {
    @githubStore.Getter selectedHook!: GithubHook|null;

  }
</script>

<style lang="scss" scoped>
  .hooks {
    margin-top: 30px;
  }
</style>