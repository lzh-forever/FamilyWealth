<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/2-1' }">证券账户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-row gutter="20">
      <el-col :span="5">
        <el-tooltip effect="dark" content="添加账户">
          <el-button
            icon="el-icon-circle-plus"
            @click="createAccount()"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-table
      stripe
      :data="shareAccountList"
      highlight-current-row="true"
      width="665px"
      height="760"
      style="margin-top: 15px"
    >
      <el-table-column
        class="info"
        type="index"
        label="序号"
        width="100px"
        align="center"
      ></el-table-column>
      <el-table-column
        class="info"
        label="账户名"
        align="center"
        prop="id"
        v-slot="scope"
        >账户{{ scope.$index+1 }}</el-table-column
      >
      <el-table-column
        class="info"
        label="账户总收益"
        prop="profit"
        align="center"
      ></el-table-column>
      <el-table-column class="info" label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            content="删除"
            :enterable="false"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="
                deleteId = scope.row.id;
                deleteAccountDialog = true;
                InitPassword();
              "
            ></el-button>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="查看股票持仓"
            :enterable="false"
            placement="top"
          >
          <router-link to="/ShareRecord">
            <el-button
              type="success"
              icon="el-icon-view"
              @click="
                stuckRecord.accountID = scope.row.id;
                setId(scope.row.id);
              "
            ></el-button>
            </router-link>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="编辑交易记录"
            placement="top"
            :enterable="false"
          >
            <router-link to="/SharesManage">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="gotoEdit(scope.row.id)"
              >
              </el-button>
            </router-link>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--删除证券账户的对话框-->
    <el-dialog
      title="删除确认界面"
      :visible.sync="deleteAccountDialog"
      width="30%"
      center
      v-if="deleteAccountDialog"
    >
      <el-input
        label="密码:"
        placeholder="请输入密码"
        v-model="deleteAccountPassword"
        clearable="true"
      >
      </el-input>

      <!--底部按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteAccountDialog = false">取 消</el-button>
        <el-button
          type="danger"
          @click="
            deleteAccount();
            deleteAccountDialog = false;
          "
          >确认删除</el-button
        >
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      shareAccountList: [],
      expands: [],
      shareList: [],
      deleteAccountDialog: false,
      deleteAccountPassword: "",
      deleteId: "",
      findAccountId: "",
      addStuckRecordDialog: "",
      stuckRecord: {
        accountID: "",
        code: "",
        buyNum: "",
        saleNum: "",
        sharePrice: "",
      },
      getRowKeys(row) {
        return row.id;
      },
      stuckRecordModel: {
        code: "",
        addStuckNum: "",
        sharePrice: "",
      },
      select: "",

    };
  },
  created() {
    this.getAllAcconts();
  },
  methods: {
    async getAllAcconts() {
      var that = this;
      const { data } = await this.$http.post("/api/security/account/get", {
        token: window.sessionStorage.getItem("token"),
      });
      if (data.code !== 0) {
        console.log(data.msg);
        that.$message.error(data.msg);
        return this.$message.error(data.msg);
      } else {
        console.log(data.msg);
        //that.$message.success(data.msg);
        this.shareAccountList = data.data.records;
      }
    },
    async createAccount() {
      var that = this;
      const { data } = await this.$http.post("/api/security/account/add", {
        token: window.sessionStorage.getItem("token"),
      });
      if (data.code !== 0) {
        console.log(data.msg);
        that.$message.error(data.msg);
        return this.$message.error(data.msg);
      } else {
        console.log(data.msg);
        this.open(data.data.id);
        this.getAllAcconts();
      }
    },
    async deleteAccount() {
      var that = this;
      const { data } = await this.$http.delete("/api/security/account/delete", {
        data: {
          token: window.sessionStorage.getItem("token"),
          id: this.deleteId,
          password: this.deleteAccountPassword,
        },
      });
      if (data.code !== 0) {
        console.log(data.msg);
        that.$message.error(data.msg);
        return this.$message.error(data.msg);
      } else {
        console.log(data.msg);
        this.getAllAcconts();
        that.$message.success(data.msg);
      }
    },
    setId(id){
      window.sessionStorage.setItem("recordId",id);
    },
    gotoEdit(id) {
      window.sessionStorage.setItem("accountID", id);
    },
    open(id) {
      this.$notify({
        title: "创建成功",
        message: "账户名为:账户" + id,
        offset: 200,
      });
    },
    InitPassword() {
      this.deleteAccountPassword = "";
    },
  },
};
</script>

<style>
</style>