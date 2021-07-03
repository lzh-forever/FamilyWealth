<template>
  <div class="login_container">
    <div class="login_box">
      <el-form label-width="0" class="login_form">
        <h2>验证管理员账户</h2>
        <el-divider></el-divider>
        <el-form-item>
          <el-input placeholder="请输入管理员账号" prefix-icon="el-icon-user" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入管理员密码" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-form-item class="btns" >
          <el-button type="primary" @click="check">验证</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        check(){
            this.$router.replace('/reset_password')
        }
    }
};
</script>

<style Lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 500px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
h2 {
  display: flex;
  justify-content: center;
}

.btns {
  display: flex;
  justify-content: center;
}

</style>

