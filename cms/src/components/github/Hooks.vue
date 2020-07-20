<template>
  <el-card class="hooks">
    <h2 slot="header">Github Hooks</h2>
    <p v-if="selectedHook === null">
      해당 Repository에 Webhook이 존재하지 않습니다.
    </p>
    <ul v-else class="hooksInfo">
      <li>
        <strong>type</strong>
        <p v-html="selectedHook.type" />
      </li>
      <li>
        <strong>id</strong>
        <p v-html="selectedHook.id" />
      </li>
      <li>
        <strong>name</strong>
        <p v-html="selectedHook.name" />
      </li>
      <li>
        <strong>active</strong>
        <p v-html="selectedHook.active" />
      </li>
      <li>
        <strong>events</strong>
        <p v-html="selectedHook.events" />
      </li>
      <li>
        <strong>updated_at</strong>
        <p v-html="selectedHook.updated_at" />
      </li>
      <li>
        <strong>created_at</strong>
        <p v-html="selectedHook.created_at" />
      </li>
      <li>
        <strong>url</strong>
        <p v-html="selectedHook.url" />
      </li>
      <li>
        <strong>test_url</strong>
        <p v-html="selectedHook.test_url" />
      </li>
      <li>
        <strong>ping_url</strong>
        <p v-html="selectedHook.ping_url" />
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

    &Info {
      li {
        display: flex;
        font-size: 15px;
        padding: 5px 0;
      }
      strong {
        width: 120px;
        color: #06F;
        text-transform: uppercase;
      }
    }
  }
</style>