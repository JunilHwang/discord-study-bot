<template>
  <div class="sidebar">
    <ul>
      <li>
        <router-link to="/hooks" class="sidebarLink">
          <span class="middle" />
          <i class="el-icon-s-tools" />
        </router-link>
      </li>
      <li>
        <router-link to="/channels" class="sidebarLink">
          <span class="middle" />
          <i class="el-icon-paperclip" />
        </router-link>
      </li>
      <li>
        <router-link to="/messages" class="sidebarLink">
          <span class="middle" />
          <i class="el-icon-message" />
        </router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout" class="sidebarLink">
          <span class="middle" />
          <i class="el-icon-circle-close" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {namespace} from "vuex-class";
  import {ActionMethod} from "vuex";

  const userStore = namespace('userStore');

  @Component
  export default class Sidebar extends Vue {

    @userStore.Mutation LOGOUT!: ActionMethod

    private logout () {
      this.LOGOUT();
      this.$message({ type: 'success', message: '로그아웃 되었습니다.' });
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    background: #222;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 50px;

    > ul {
      margin-top: 50px;
    }

    &Link {
      display: block;
      text-align: center;
      height: 50px;
      color: #fff;
      font-size: 25px;

      &:hover,
      &.router-link-exact-active {
        background: #a00;
        color: #fff;
      }
    }
  }
</style>