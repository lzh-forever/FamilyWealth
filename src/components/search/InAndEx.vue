<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>收支详情</el-breadcrumb-item>
        <el-breadcrumb-item>收支查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <br />
    <el-row :gutter="24">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card shadow="always">
            <div id="main" style="width: 1000px; height: 250px"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card shadow="always">
            <div id="secondary" style="width: 600px; height: 250px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-card shadow="always">
      <div style="margin-top: 0px">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="收入" value="1"></el-option>
            <el-option label="支出" value="2"></el-option>
          </el-select>
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="收/支" width="180">
        </el-table-column>
        <el-table-column prop="address" label="收支类型" width="180">
        </el-table-column>
        <el-table-column prop="note" label="备注"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data: function () {
    return {
      input: "",
      select: "",
    };
  },

  mounted() {
    var myChart1 = echarts.init(document.getElementById("main"));
    var myChart2 = echarts.init(document.getElementById("secondary"));
    // 指定图表的配置项和数据
    var option1 = {
      title: {
        text: "支出",
      },
      tooltip: {},
      legend: {
        data: ["支出"],
      },
      xAxis: {
        data: ["餐饮", "购物 ", "娱乐", "交通", "理财", "转账"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    var option2 = {
      title: {
        text: "收入",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          roseType: "angle",
          data: [
            { value: 235, name: "转账" },
            { value: 274, name: "工资" },
            { value: 310, name: "红包" },
            { value: 335, name: "公积金" },
            { value: 400, name: "理财" },
          ],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    myChart2.setOption(option2);
  },
};
</script>

<style scoped>
.el-select {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

/* .bg-purple {
  background: #f1f3e7;
} */

.grid-content {
  border-radius: 4px;
  min-height: 200px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>