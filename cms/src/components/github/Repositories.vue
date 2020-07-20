<template>
  <el-card class="repositories">
    <h2 slot="header">Github Repository 목록</h2>
    <p class="repositoryCount">
      <strong v-html="repos.length + '개'" />의 Repository가 있습니다.
    </p>
    <ul class="clearFix">
      <li v-for="(repo, key) in repos" :key="repo.id">
        <label class="customRadio">
          <input type="radio" v-model="checked" :value="key" @change="fetchHook" />
          <span v-html="repo.full_name" />
        </label>
      </li>
    </ul>
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

    private checked: number = -1;

    public fetchHook (): void {
      const {repos, checked} = this;
      this.FETCH_HOOKS([repos[checked]]);
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
    line-height: 1;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  strong {
    color: #06F;
  }
</style>

