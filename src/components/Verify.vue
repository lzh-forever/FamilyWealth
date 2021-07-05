<template>
  <div class="login_container">
    <div class="login_box">
      <el-form ref="formRef" label-width="0" class="login_form" :rules="rules" :model="form">
        <h2>验证管理员账户</h2>
        <el-divider></el-divider>
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入管理员账号"
            prefix-icon="el-icon-user"
            @keyup.enter.native="check"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入管理员密码"
            type="password"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="check"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="check">验证</el-button>
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
        username: "xiaoai",
        password: "123456",
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
    check() {
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
                if(data.data.isAdmin)
                var token = data.data.token;
                var isAdmin = data.data.isAdmin ;
                if(!isAdmin){
                  that.$message.error("该账号不是管理员");
                } else{
                  window.sessionStorage.setItem("token", token);
                  that.$router.replace('/reset_password')
                }
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

