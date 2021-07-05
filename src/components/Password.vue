<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        ref="formRef"
        label-width="0"
        class="login_form"
        :rules="rules"
        :model="form"
      >
        <h2>重置密码</h2>
        <el-divider></el-divider>
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入要重置的账号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入更改后的密码"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            placeholder="请再次输入密码"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { max: 50, message: "长度需小于50位", trigger: "blur" },
        ],
        password : [
          { required: true, message: "请输入重置密码", trigger: "blur" },
          { max: 50, message: "长度需小于50位", trigger: "blur" },
        ],
        confirmPassword:[
          { required: true, message: "请输入重置密码", trigger: "blur" },
          { max: 50, message: "长度需小于50位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    reset() {
      var that = this;
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          var password = that.form.password;
          var confirmPassword = that.form.confirmPassword;
          var token = window.sessionStorage.getItem("token");
          if (password == confirmPassword) {
            this.$http
              .put("/api/admin/modify_password", {
                token: token,
                username: that.form.username,
                password: that.form.password,
              })
              .then(function (response) {
                var data = response.data;
                if (data.code != 0) {
                  that.$message.error(data.msg);
                } else {
                  that.$message.success("reset success");
                  that.$router.replace("/login");
                }
              });
          } else {
            that.$message.error("两次密码不一致");
          }
        }
      });
    },
  },
};
</script>

<style>
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