<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/2-1' }"
          >证券账户管理</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/ShareRecord' }"
          >持仓记录管理</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-card>
    <el-tooltip
      effect="dark"
      content="添加持仓信息"
      :enterable="false"
      placement="top"
    >
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          @click="
          addStuckRecordDialog = true;
          "
        ></el-button>
    </el-tooltip>
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
    </el-table>

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
      shareList: "",
      accountName: '',
      addStuckRecordDialog: '',
      stuckRecordModel: {
        code: "",
        addStuckNum: "",
        sharePrice: "",
      },
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
      stuckRecord: {
        accountID: "",
        code: "",
        buyNum: "",
        saleNum: "",
        sharePrice: "",
      },
    };
  },
  created() {
    this.stuckRecord.accountID = window.sessionStorage.getItem("recordId");
    this.findAllRecords(this.stuckRecord.accountID);
  },
  methods: {
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
        accountID: Number(this.stuckRecord.accountID),
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
      this.findAllRecords(this.stuckRecord.accountID);
    },
    async findAllRecords(id) {
      var that = this;
      const { data } = await this.$http.post("/api/security/stock/get", {
        token: window.sessionStorage.getItem("token"),
        accountID: Number(id),
      });
      if (data.code !== 0) {
        console.log(data.msg);
        that.$message.error(data.msg);
        return this.$message.error(data.msg);
      } else {
        console.log(data.msg);
        that.$message.success(data.msg);
        this.shareList = data.data.stocks;
      }
    },
  },
};
</script>

<style>
</style>