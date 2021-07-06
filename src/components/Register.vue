<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        label-width="100px"
        class="login_form"
        ref="formRef"
        :rules="rules"
        :model="form"
      >
        <h2>注册</h2>
        <el-divider></el-divider>
        <el-form-item label="用户名" prop="name">
          <el-input
            placeholder="请填写用户名"
            v-model="form.name"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input
            placeholder="请填写账号"
            v-model="form.username"
            prefix-icon="el-icon-user"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请填写密码"
            v-model="form.password"
            type="password"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item label="邀请人账号" prop="inviteUsername">
          <el-input
            placeholder="请填写邀请人账号"
            v-model="form.inviteUsername"
            prefix-icon="el-icon-user"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item label="邀请人密码" prop="invitePassword">
          <el-input
            placeholder="请填写邀请人密码"
            v-model="form.invitePassword"
            type="password"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns" label-width="0">
          <el-button type="primary" @click="register">注册</el-button>
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
        name: "",
        username: "",
        password: "",
        inviteUsername: "",
        invitePassword: "",
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
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 19, message: "长度需小于20位", trigger: "blur" },
        ],
        invitePassword: [
          { required: true, message: "请输入邀请人密码", trigger: "blur" },
          { max: 50, message: "长度需小于50位", trigger: "blur" },
        ],
        inviteUsername: [
          { required: true, message: "请输入邀请人账号", trigger: "blur" },
          { max: 19, message: "长度需小于20位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    register() {
      var that = this;
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$http
            .post("/api/user/register", this.form)
            .then(function (response) {
              var data = response.data;
              if (data.code != 0) {
                that.$message.error(data.msg);
              } else {
                that.$message.success("register success");
                that.$http
                  .post("/api/user/login", {
                    username: that.form.username,
                    password: that.form.password,
                  })
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
                        that.$router.replace("/admin");
                      } else {
                        that.$router.replace("/home");
                      }
                    }
                  });
              }
            });
        }
      });
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
