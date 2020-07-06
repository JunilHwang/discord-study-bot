<template>
  <el-card class="loginBox">
    <h2 slot="header">Github Login</h2>
    <el-form label-width="100px">
      <el-form-item label="아이디" size="small" required autofocus>
        <el-input v-model="formData.id" />
      </el-form-item>
      <el-form-item label="비밀번호" size="small" required>
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item size="small">
        <el-button native-type="submit" type="primary">로그인</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class Hooks extends Vue {
    private formData: {[k: string]: string} = {
      id: '',
      password: ''
    }
  }
</script>

<style lang="scss" scoped>
  .loginBox {
    width: 500px;
  }
</style>