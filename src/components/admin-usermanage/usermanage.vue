<template>
  <div>
    <el-row gutter="20">
      <el-col :span="7">
        <el-input
          placeholder="请输入要查找的账号"
          v-model="findUserName"
          clearable
          @clear="getUserList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="findUser()"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="2.5">
        <el-button type="primary" @click="getUserList"
          >查询所有用户信息</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="centerDialogVisible = true;Init(addUserInfo);" 
          >添加用户</el-button
        >
      </el-col>
        
    </el-row>
    <!--添加用户的对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      v-if="centerDialogVisible"
    >
        <el-form ref="form" :model="addUserInfo" label-width="80px" :rules="rules">
          <el-form-item label="账号:" prop="username">
            <el-input v-model="addUserInfo.username" placeholder="请填写账号"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="addUserInfo.password" placeholder="请填写密码"></el-input>
          </el-form-item>
          <el-form-item label="用户名:" prop="name">
            <el-input v-model="addUserInfo.name" placeholder="请填写用户名"></el-input>
          </el-form-item>
          
        </el-form>
      <!--底部按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false;">取 消</el-button>
        <el-button
          type="primary"
          @click="
            centerDialogVisible = false;
            addUser();
          "
          >添 加</el-button
        >
      </span>
    </el-dialog>

    <el-table stripe :data="userList" highlight-current-row="true" width="665px" height="760" style="margin-top:15px">
      <el-table-column
        class="info"
        type="index"
        label="序号"
        width="65px"
      ></el-table-column>
      <el-table-column
        class="info"
        label="用户名"
        prop="name"
      ></el-table-column>
      <el-table-column
        class="info"
        label="用户账号"
        prop="username"
      ></el-table-column>
      <el-table-column
        class="info"
        label="收入总和"
        prop="receiptSum"
      ></el-table-column>
      <el-table-column
        class="info"
        label="支出总和"
        prop="disbursementSum"
      ></el-table-column>
      <el-table-column
        class="info"
        label="预消费金额"
        prop="advanceConsumption"
      ></el-table-column>
      <el-table-column class="info" label="操作">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            content="删除"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteInfo(scope.$index, scope.row.username)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        username: "",
        receiptSum: "",
        disbursementSum: "",
        advanceConsumption: "",
      },
      userList: [],
      findUserName: "",
      centerDialogVisible: false,
      addUserInfo: {
        username: "",
        name: "",
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
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 19, message: "长度需小于20位", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data } = await this.$http.post("/api/admin/all_info", {
        token: window.sessionStorage.getItem("token"),
      });
      if (data.code !== 0) {
        console.log("获取失败");
        return this.$message.error("获取用户列表失败");
      } else {
        console.log("获取成功");
        this.userList = data.data.users;
      }
    },
    async deleteInfo(index, userName) {
      var that = this;
      const { data } = await this.$http.delete("/api/admin/delete", {
        data: {
          token: window.sessionStorage.getItem("token"),
          username: userName,
        },
      });
      if (data.code !== 0) {
        console.log("删除失败");
        that.$message.error(data.msg);
        return this.$message.error("删除用户失败");
      } else {
        console.log("删除成功");
        this.getUserList();
        that.$message.success(data.msg);
      }
    },
    async findUser() {
      var that = this;
      console.log(this.findUserName);
      const { data } = await this.$http.post("/api/admin/search_info", {
        token: window.sessionStorage.getItem("token"),
        username: this.findUserName,
      });
      if (data.code !== 0) {
        console.log("查询失败");
        that.$message.error(data.msg);
        return this.$message.error("查询用户失败");
      } else {
        console.log("查询成功");
        this.userList = data.data.users;
        that.$message.success(data.msg);
      }
    },
    async addUser() {
      var that = this;
      console.log(this.findUserName);
      const { data } = await this.$http.post("/api/admin/add", {
        token: window.sessionStorage.getItem("token"),
        username: this.addUserInfo.username,
        name: this.addUserInfo.name,
        password: this.addUserInfo.password
      });
      if (data.code !== 0) {
        console.log("添加失败");
        that.$message.error(data.msg);
        return this.$message.error(data.msg);
      } else {
        console.log("查询成功");
        that.$message.success(data.msg);
        this.getUserList();
      }
    },
    Init(addUserInfo){
        addUserInfo.username = '';
        addUserInfo.password = '';
        addUserInfo.name = '';
    }
  },
};
</script>

<style scoped>
</style>