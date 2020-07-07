<template>
  <el-card class="loginBox">
    <h2 slot="header">로그인</h2>
    <el-form label-width="100px" @submit.native.prevent="submit">
      <el-form-item label="아이디" size="small" required autofocus>
        <el-input v-model="formData.id"/>
      </el-form-item>
      <el-form-item label="비밀번호" size="small" required>
        <el-input type="password" v-model="formData.password"/>
      </el-form-item>
      <el-form-item size="small">
        <el-button native-type="submit" type="primary">로그인</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {namespace} from 'vuex-class'
  import {ActionMethod} from "vuex";

  const userStore = namespace('userStore')

  @Component
  export default class Hooks extends Vue {
    @userStore.Action SET_USER_INFO!: ActionMethod;

    private formData: { [k: string]: string } = {
      id: '',
      password: ''
    }

    private async submit (): Promise<void> {
      try {
        await this.SET_USER_INFO(this.formData);
        window.location.reload();
      } catch (e) {
        console.error(e);
        this.$message({ type: 'error', message: '로그인에 실패하였습니다.' })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .loginBox {
    width: 500px;
  }
</style>