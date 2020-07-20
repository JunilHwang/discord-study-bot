<template>
  <section>
    <h1>Github Hook 관리</h1>
    <repositories />
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace} from "vuex-class";
  import {ActionMethod} from "vuex";
  import {Repositories} from "@/components";

  const githubStore = namespace('githubStore');
  const userStore = namespace('userStore');

  const components = { Repositories };

  @Component({ components })
  export default class Hooks extends Vue {
    @userStore.Getter id!: string;
    @githubStore.Action FETCH_REPOS!: ActionMethod;

    created (): void {
      this.FETCH_REPOS(this.id);
    }
  }
</script>