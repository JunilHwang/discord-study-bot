<template>
  <section>
    <h1>Github Hook 관리</h1>
    <repositories />
    <hooks />
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace} from "vuex-class";
  import {ActionMethod} from "vuex";
  import {Repositories, Hooks} from "@/components";

  const githubStore = namespace('githubStore');
  const userStore = namespace('userStore');

  const components = { Repositories, Hooks };

  @Component({ components })
  export default class Github extends Vue {
    @userStore.Getter id!: string;
    @githubStore.Action FETCH_REPOS!: ActionMethod;

    created (): void {
      this.FETCH_REPOS(this.id);
    }
  }
</script>