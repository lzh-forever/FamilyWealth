<template>
  <div>
    <!-- 面包屑 -->
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/1-1' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>收支详情</el-breadcrumb-item>
        <el-breadcrumb-item>收支查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <br />
    <!-- 表格主体 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="15">
        <el-col :offset="1" :span="6">
          <el-date-picker
            v-model="pickdate"
            type="datetimerange"
            placeholder="选择日期时间"
            size="small"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-button size="small" @click="getByTime">按时间筛选</el-button>
        </el-col>
        <el-col :offset="3" :span="5">
          <el-input v-model="input" placeholder="input" size="small"></el-input
        ></el-col>
        <el-col :span="3">
          <el-button size="small" @click="getByCode">按代码筛选</el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="addDialogVisible = true"
          ></el-button>
        </el-col>
      </el-row>
      <div style="height: 20px"></div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        height="460"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="名称" width="250" sortable>
        </el-table-column>
        <el-table-column prop="code" label="代码" width="180" sortable>
        </el-table-column>
        <el-table-column prop="buyNum" label="买入数量" width="180" sortable>
        </el-table-column>
        <el-table-column prop="saleNum" label="卖出数量" width="180" sortable>
        </el-table-column>
        <el-table-column prop="sharePrice" label="交易价格" sortable>
        </el-table-column>
        <el-table-column prop="time" label="交易时间" sortable>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加的对话框 -->
    <el-dialog title="新增记录" :visible.sync="addDialogVisible" width="20%">
      <!-- 内容主体 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="股票代码" prop="code">
          <el-input v-model="addForm.code"></el-input>
        </el-form-item>
        <el-form-item label="买入股数" prop="buyNum">
          <el-input v-model="addForm.buyNum"></el-input>
        </el-form-item>
        <el-form-item label="卖出股数" prop="saleNum">
          <el-input v-model="addForm.saleNum"></el-input>
        </el-form-item>
        <el-form-item label="交易时价格" prop="sharePrice">
          <el-input v-model="addForm.sharePrice"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addDialogVisible: false,
      tableData: [],
      token: window.sessionStorage.getItem("token"),
      accountID:Number(window.sessionStorage.getItem("accountID")),
      pickdate: "",
      input: "",
      addForm: {
        code: "",
        buyNum: "",
        saleNum: "",
        sharePrice: "",
      },
      // 添加表单的验证规则
      addFormRules: {
        buyNum: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 0, max: 10, message: "0到10位", trigger: "blur" },
        ],
        saleNum: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 0, max: 10, message: "0到10位", trigger: "blur" },
        ],
        sharePrice: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 0, max: 10, message: "0到10位", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入股票代码", trigger: "blur" }],
      },
    };
  },
  mounted () {
    this.getAll()
  },
  methods: {
    async getAll() {
      const { data } = await this.$http.post(
        "/api/security/operation/get_all",
        {
          token: this.token,
          accountID: this.accountID,
        }
      );
      if (data.code == 0) {
        this.tableData = data.data.records;
        this.$message.success(data.msg);
      } else {
        this.$message.error(data.msg);
      }
    },
    async getByTime() {
      if (this.pickdate == null || this.pickdate == "") {
        this.$message.error("请输入时间");
      } else {
        var date = this.pickdate[0].getDate();
        date = date > 9 ? date : "0" + date;
        var month = this.pickdate[0].getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        var year = this.pickdate[0].getFullYear();
        var hour = this.pickdate[0].getHours();
        hour = hour > 9 ? hour : "0" + hour;
        var minute = this.pickdate[0].getMinutes();
        minute = minute > 9 ? minute : "0" + minute;
        var second = this.pickdate[0].getSeconds();
        second = second > 9 ? second : "0" + second;
        var beginTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
        var date1 = this.pickdate[1].getDate();
        date1 = date1 > 9 ? date1 : "0" + date1;
        var month1 = this.pickdate[1].getMonth() + 1;
        month1 = month1 > 9 ? month1 : "0" + month1;
        var year1 = this.pickdate[1].getFullYear();
        var hour1 = this.pickdate[1].getHours();
        hour1 = hour1 > 9 ? hour1 : "0" + hour1;
        var minute1 = this.pickdate[1].getMinutes();
        minute1 = minute1 > 9 ? minute1 : "0" + minute1;
        var second1 = this.pickdate[1].getSeconds();
        second1 = second1 > 9 ? second1 : "0" + second1;
        var endTime = `${year1}-${month1}-${date1} ${hour1}:${minute1}:${second1}`;
        const { data } = await this.$http.post(
          "/api/security/operation/get_by_time",
          {
            token: this.token,
            accountID: this.accountID,
            beginTime: beginTime,
            endTime: endTime,
          }
        );
        if (data.code != 0) {
          this.$message.error(data.msg);
        } else {
          this.tableData = data.data.records;
          this.$message.success(data.msg);
        }
      }
    },
    async getByCode() {
      const { data } = await this.$http.post(
        "/api/security/operation/get_by_stock",
        {
          token: this.token,
          accountID: this.accountID,
          code: this.input,
        }
      );
      if (data.code != 0) {
        this.$message.error(data.msg);
      } else {
        this.tableData = data.data.records;
        this.$message.success(data.msg);
      }
    },
    //添加股票交易记录
    async addItem() {
      const { data } = await this.$http.post("/api/security/operation/add", {
        token: this.token,
        accountID: '3',
        code: this.addForm.code,
        buyNum: Number(this.addForm.buyNum),
        saleNum: Number(this.addForm.saleNum),
        sharePrice: Number(this.addForm.sharePrice)
      });
      var code = data.code;
      if (code == 0) {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      }
      this.addDialogVisible = false;
      this.getAll();
    },

    test() {
      this.pickdate = this.pickdate == null ? 1 : null;
    },
  },

  watch: {
    pickdate(newData) {
      if (newData == null) {
        this.getAll();
      }
    },
    input(newData) {
      if (newData == "") {
        this.getAll();
      }
    },
  },
};
</script>

<style>
</style>