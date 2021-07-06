<template>
  <div>
    <el-row gutter="20">
      <el-col :span="5">
        <el-tooltip effect="dark" content="添加账户">
          <el-button icon="el-icon-circle-plus" @click="createAccount()"></el-button>
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
      @expand-change="expandChange"
    >
      <el-table-column type="expand" >
        <template>
          <el-table
            stripe
            :data="shareList"
            highlight-current-row="true"
            width="665px"
            height="450px"
            style="margin-top: 15px"
          >
            <el-table-column
              type="index"
              label="序号"
              width="100px"
              align="center"
            ></el-table-column>
            <el-table-column
              label="股票名称"
              align="center"
              prop="name"
            ></el-table-column>
            <el-table-column
              label="股票代码"
              align="center"
              prop="code"
            ></el-table-column>
            <el-table-column
              label="持仓股数"
              align="center"
              prop="positionNum"
            ></el-table-column>
            <el-table-column
              label="当前每股价格"
              align="center"
              prop="price"
            ></el-table-column>
            <el-table-column
              label="该股总收益"
              align="center"
              prop="profit"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-edit" @click="gotoEdit(scope.row.id)">

                </el-button>
              </el-tooltip>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
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
        >账户{{ scope.row.id }}</el-table-column
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
            content="添加股票交易记录"
            :enterable="false"
            placement="top"
          >
            <el-button
              type="success"
              icon="el-icon-circle-plus-outline"
              @click="
                addStuckRecordDialog = true;
                stuckRecord.accountID = scope.row.id;
              "
            ></el-button>
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

    <!--添加股票交易记录的对话框-->
    <el-dialog
      title="添加股票交易记录"
      :visible.sync="addStuckRecordDialog"
      width="30%"
      center
      v-if="addStuckRecordDialog"
    >
      <el-form
        ref="form"
        :model="stuckRecordModel"
        label-width="150px"
        :rules="rules"
      >
        <el-form-item label="股票代码:" prop="code">
          <el-input
            label="股票代码:"
            placeholder="请输入股票代码"
            v-model="stuckRecordModel.code"
            clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="请选择交易类型:" prop="addStuckNum">
          <el-input
            placeholder="请输入股数"
            label="请选择交易类型:"
            v-model="stuckRecordModel.addStuckNum"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="买入" value="1"></el-option>
              <el-option label="卖出" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="交易价格:" prop="sharePrice">
          <el-input
            label="交易价格:"
            placeholder="请输入交易时的价格"
            v-model="stuckRecordModel.sharePrice"
            clearable="true"
          ></el-input>
        </el-form-item>
      </el-form>

      <!--底部按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStuckRecordDialog = false">取 消</el-button>
        <el-button
          type="success"
          @click="
            addStuckRecord();
            addStuckRecordDialog = false;
          "
          >确认添加</el-button
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
      shareList: [],
      deleteAccountDialog: false,
      deleteAccountPassword: "",
      deleteId: "",
      findAccountId: '',
      addStuckRecordDialog: "",
      stuckRecord: {
        accountID: "",
        code: "",
        buyNum: "",
        saleNum: "",
        sharePrice: "",
      },
      stuckRecordModel: {
        code: "",
        addStuckNum: "",
        sharePrice: "",
      },
      select: "",
      rules: {
        code: [
          { required: true, message: "请输入股票代码", trigger: "blur" },
          { max: 9, message: "长度需小于10位", trigger: "blur" },
        ],
        addStuckNum: [
          { required: true, message: "请输入交易股数", trigger: "blur" },
          { max: 9, message: "长度需小于20位", trigger: "blur" },
        ],
        sharePrice: [
          { required: true, message: "请输入交易时的价格", trigger: "blur" },
          { max: 19, message: "长度需小于20位", trigger: "blur" },
        ],
      },
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
    async addStuckRecord() {
      var that = this;
      this.stuckRecord.code = this.stuckRecordModel.code;
      this.stuckRecord.sharePrice = this.stuckRecordModel.sharePrice;
      if (this.select == 1) {
        this.stuckRecord.buyNum = this.stuckRecordModel.addStuckNum;
        this.stuckRecord.saleNum = 0;
      } else if (this.select == 2) {
        this.stuckRecord.saleNum = this.stuckRecordModel.addStuckNum;
        this.stuckRecord.buyNum = 0;
      } else {
        return this.$message.error("选择买入卖出时出现错误");
      }
      const { data } = await this.$http.post("/api/security/operation/add", {
        token: window.sessionStorage.getItem("token"),
        accountID: this.stuckRecord.accountID,
        code: this.stuckRecord.code,
        buyNum: Number(this.stuckRecord.buyNum),
        saleNum: Number(this.stuckRecord.saleNum),
        sharePrice: Number(this.stuckRecord.sharePrice),
      });
      if (data.code !== 0) {
        console.log(data.msg);
        that.$message.error(data.msg);
        return this.$message.error(data.msg);
      } else {
        console.log(data.msg);
        that.$message.success(data.msg);
      }
      getAllAcconts();
    },
    async findAllRecords(){
      var that = this;
      const { data } = await this.$http.post("/api/security/stock/get", {
        token: window.sessionStorage.getItem("token"),
        accountID: Number(this.findAccountId),
      });
      if (data.code !== 0) {
        console.log(data.msg);
        that.$message.error(data.msg);
        return this.$message.error(data.msg);
      } else {
        console.log(data.msg);
        //that.$message.success(data.msg);
        this.shareList = data.data.stocks;
      }
    },
    gotoEdit(id){
      window.sessionStorage.setItem("accountID",)
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
    expandChange(row,expandRows){
      this.findAccountId = row.id;
      this.findAllRecords();
    }
  },
};
</script>

<style>
</style>