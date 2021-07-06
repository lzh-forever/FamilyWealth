<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        ref="formRef"
        label-width="0"
        class="login_form"
        :model="form"
        :rules="rules"
      >
        <h2>家庭财富管理系统</h2>
        <el-divider></el-divider>
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="account"
            prefix-icon="el-icon-user"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="password"
            type="password"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="3">
              <el-link
                href="http://localhost:8080/#/verify"
                type="primary"
                class="link"
                >找回密码</el-link
              >
            </el-col>
            <el-col :offset="18" :span="3">
              <el-link
                href="http://localhost:8080/#/register"
                type="primary"
                class="link"
                >注册账号</el-link
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
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
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { max: 50, message: "长度需小于50位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 50, message: "长度需小于50位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      var that = this;
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$http
            .post("/api/user/login", this.form)
            .then(function (response) {
              var data = response.data;
              if (data.code != 0) {
                that.$message.error(data.msg);
              } else {
                var token = data.data.token;
                var isAdmin = data.data.isAdmin;
                that.$message.success(data.msg);
                window.sessionStorage.setItem("token", token);
                if (isAdmin) {
                  that.$router.push("/admin");
                } else {
                  that.$router.push("/home");
                }
              }
            });
        }
      });
    },
    test() {
      this.$router.push("/home");
    },
  },
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
.link {
  font: 13px Small;
}
</style>

