<template>
  <el-card>
    <el-row :gutter="15">
      <el-col :offset="1" :span="8">
        <el-date-picker
          v-model="pickdate"
          type="datetimerange"
          placeholder="选择日期时间"
          size="small"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button size="small" @click="getByTime">按时间筛选</el-button>
      </el-col>
      <!-- <el-col :span="2">
        <el-button size="small" @click="test">test</el-button>
      </el-col> -->
    </el-row>
    <div style="height: 20px"></div>
    <el-table :data="tableData" height="460" stripe border style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="name" label="名称" width="250"> </el-table-column>
      <el-table-column prop="code" label="代码" width="180"> </el-table-column>
      <el-table-column prop="buyNum" label="买入数量" width="180">
      </el-table-column>
      <el-table-column prop="saleNum" label="卖出数量" width="180">
      </el-table-column>
      <el-table-column prop="sharePrice" label="交易价格"> </el-table-column>
      <el-table-column prop="time" label="交易时间"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      token: window.sessionStorage.getItem("token"),
      accountID: window.sessionStorage.getItem("accountID"),
      pickdate: "",
    };
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
        this.tableData = data.data.operations;
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
        const { data } = await this.$http.put(
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
          this.tableData = data.data.operations;
          this.$message.success(data.msg);
        }
      }
    },
    test(){
        this.pickdate = this.pickdate==null ? 1 : null
    }
  },
  watch: {
      pickdate(newData){
          if(newData==null){
              this.getAll()
          }
      }
  }
};
</script>

<style>
</style>