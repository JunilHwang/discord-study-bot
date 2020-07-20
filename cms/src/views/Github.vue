<template>
  <section>
    <h1>Github Hook 관리</h1>
    <el-card>
      <h2 slot="header">Github Repository 목록</h2>
      <el-tree
        :data="reposTree"
        :props="{ label: 'label' }"
        @check-change="changeChecked"
        @node-click="showData"
        show-checkbox />
    </el-card>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {GithubTinyRepository, GithubUser} from "domain/src"
  import {namespace} from "vuex-class"
  import {ActionMethod} from "vuex";

  const githubStore = namespace('githubStore');
  const userStore = namespace('userStore');

  @Component
  export default class Hooks extends Vue {
    @githubStore.State repos!: GithubTinyRepository[]
    @userStore.Getter id!: string
    @githubStore.Action FETCH_REPOS!: ActionMethod

    get reposTree (): { label: string }[] {
      return this.repos.map(repo => ({
        label: repo.full_name
      }))
    }

    changeChecked ({ label }: { [k: string]: string }, checked: boolean, indeterminate: boolean) {
      console.log(label, checked, indeterminate);
    }

    showData (data: any) {
      console.log(data);
    }

    created (): void {
      this.FETCH_REPOS(this.id);
    }
  }
</script>