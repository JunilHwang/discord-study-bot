<template>
  <section>
    <h1>Github Hook 관리</h1>
    <el-card class="repositories">
      <h2 slot="header">Github Repository 목록</h2>
      <p class="repositoryCount">
        <strong v-html="repos.length + '개'" />의 Repository가 있습니다.
      </p>
      <ul class="clearFix">
        <li v-for="(repo, key) in repos" :key="repo.id">
          <label>
            <input type="checkbox" v-model="data" :value="key" />
            <span v-html="repo.full_name" />
          </label>
        </li>
      </ul>
      <el-row class="repositoryButtons">
        <el-button size="small" type="primary" @click="showChecked">
          Hook 조회
        </el-button>
      </el-row>
    </el-card>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {GithubTinyRepository} from "domain/src";
  import {namespace} from "vuex-class";
  import {ActionMethod} from "vuex";

  const githubStore = namespace('githubStore');
  const userStore = namespace('userStore');

  @Component
  export default class Hooks extends Vue {
    @githubStore.State repos!: GithubTinyRepository[];
    @userStore.Getter id!: string;
    @githubStore.Action FETCH_REPOS!: ActionMethod;

    private data: number[] = [];

    private get checkedRepos (): GithubTinyRepository[] {
      return this.data.map(key => this.repos[key]);
    }

    public showChecked () {
      console.log(this.checkedRepos);
    }

    created (): void {
      this.FETCH_REPOS(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  .repository {

    &Count {
      margin-bottom: 20px;
      font-size: 17px;
    }

    &Buttons {
      margin-top: 20px;
    }

  }

  li {
    float: left;
    width: 50%;
    line-height: 1;
    margin-bottom: 10px;
  }
  strong {
    color: #06F;
  }
  label {
    cursor: pointer;
    display: block;
    span {
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
      position: relative;
      top: -1px;
    }
  }
</style>