<template>
    <div class="login_container">
    <div class="login_box">
      <el-form label-width="90px" class="login_form">
        <h2>注册</h2>
        <el-divider></el-divider>
        <el-form-item label="用户名">
          <el-input placeholder="请填写用户名"  ></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input placeholder="请填写账号" prefix-icon="el-icon-user" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请填写密码" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item label="邀请人账号">
          <el-input placeholder="请填写邀请人账号" prefix-icon="el-icon-user" ></el-input>
        </el-form-item>
        <el-form-item label="邀请人密码">
          <el-input placeholder="请填写邀请人密码" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-form-item class="btns" label-width="0">
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style Lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 500px;
  height: 500px;
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

</style>>
