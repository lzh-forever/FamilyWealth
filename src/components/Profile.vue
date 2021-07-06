<template>
  <div id="profile">
    <el-card>
      <el-row :gutter="20">
        <el-col :offset="2" :span="2">账号</el-col>
        <el-col :offset="1" :span="5"
          ><el-input v-model="username" :disabled="true"></el-input
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="2" :span="2">用户名</el-col>
        <el-col :offset="1" :span="5"
          ><el-input v-model="name"></el-input
        ></el-col>
        <el-col :span="2">
          <el-button plain @click="changeName">保存用户名</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="2" :span="2">预算</el-col>
        <el-col :offset="1" :span="5"
          ><el-input v-model="advanceConsumption"></el-input
        ></el-col>
        <el-col :span="2">
          <el-button plain @click="changeBudget">保存预算</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="2">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="原密码">
              <el-input
              type="password"
                v-model="formInline.oldPassword"
                placeholder="请输入原密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input
              type="password"
                v-model="formInline.newPassword"
                placeholder="请输入新密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword"
                >重置密码</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2">
          <el-button type="danger" @click="logout">注销账号</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: window.sessionStorage.getItem("token"),
      username: "",
      name: "",
      advanceConsumption: "",
      formInline: {
        oldPassword: "",
        newPassword: "",
      },
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const { data } = await this.$http.post("/api/user/info", {
        token: this.token,
      });
      if (data.code == 0) {
        this.$message.success(data.msg);
        this.username = data.data.username;
        this.name = data.data.name;
        this.advanceConsumption = data.data.advanceConsumption;
      } else {
        this.$message.error(data.msg);
      }
    },
    async changeName() {
      if (this.name == "") {
        this.$message.error("用户名不能为空");
      } else {
        const { data } = await this.$http.put("/api/user/modify/name", {
          token: this.token,
          name: this.name,
        });
        if (data.code == 0) {
          this.$message.success(data.msg);
        } else {
          this.$message.error(data.msg);
        }
      }
    },
    async changePassword() {
      if (
        this.formInline.oldPassword == "" ||
        this.formInline.newPassword == ""
      ) {
        this.$message.error("密码不能为空");
      } else {
        const { data } = await this.$http.put("/api/user/modify/password", {
          token: this.token,
          oldPassword: this.formInline.oldPassword,
          newPassword: this.formInline.newPassword,
        });
        if (data.code == 0) {
          this.$message.success(data.msg);
        } else {
          this.$message.error(data.msg);
        }
      }
    },
    async changeBudget() {
      if (this.advanceConsumption == "") {
        this.$message.error("预算不能为空");
      } else {
        var budget = Number(this.advanceConsumption);
        if (isNaN(budget)) {
          this.$message.error("请输入数字");
        } else {
          const { data } = await this.$http.put(
            "/api/user/modify/advance_consumption",
            {
              token: this.token,
              advanceConsumption: budget,
            }
          );
          if (data.code == 0) {
            this.$message.success(data.msg);
          } else {
            this.$message.error(data.msg);
          }
        }
      }
    },
    logout() {
      var that = this
      this.$prompt("请输入密码确认", "注销账号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password"
      })
        .then(({ value }) => {
          this.$http
            .delete("/api/user/logout", {
              data: {
                token: this.token,
                password: value,
              },
            })
            .then(function (response) {
              if (response.data.code == 0) {
                that.$message.success(response.data.msg);
                that.$router.replace('/login')
              } else {
                that.$message.error(response.data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 80px; /*行间距 */
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px; /*边框圆角 */
}
.bg-purple-dark {
  background: #b5dad8;
}
.bg-purple {
  background: #f1f3e7; /*实际所有颜色控制 */
}
.bg-purple-light {
  background: #bde4e2;
}
.grid-content {
  border-radius: 12px;
  min-height: 300px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
