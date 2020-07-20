<template>
  <el-card class="repositories">
    <h2 slot="header">Github Repository 목록</h2>
    <p class="repositoryCount">
      <strong v-html="repos.length + '개'" />의 Repository가 있습니다.
    </p>
    <ul class="clearFix">
      <li v-for="(repo, key) in repos" :key="repo.id">
        <label>
          <input type="checkbox" v-model="checked" :value="key" />
          <span v-html="repo.full_name" />
        </label>
      </li>
    </ul>
    <el-row class="repositoryButtons">
      <el-button size="small" type="primary" @click="fetchHooks">
        Hook 조회
      </el-button>
    </el-row>
  </el-card>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {GithubTinyRepository} from "domain/src";
  import {namespace} from "vuex-class";
  import {ActionMethod} from "vuex";

  const githubStore = namespace('githubStore');

  @Component
  export default class Hooks extends Vue {
    @githubStore.State repos!: GithubTinyRepository[];
    @githubStore.Action FETCH_HOOKS!: ActionMethod;

    private checked: number[] = [];

    private get checkedRepos (): GithubTinyRepository[] {
      return this.checked.map(key => this.repos[key]);
    }

    public fetchHooks (): void {
      if (this.checked.length === 0) {
        this.$message.warning('한 개 이상의 Repository를 선택해주세요.');
        return;
      }
      this.FETCH_HOOKS(this.checkedRepos);
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

