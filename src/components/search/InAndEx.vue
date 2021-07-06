<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/1-1' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>收支详情</el-breadcrumb-item>
        <el-breadcrumb-item>收支查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <br />
    <!-- 两个图表 -->
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
    <!-- 收支查询表 -->
    <el-card shadow="always">
      <!-- 查询输入栏 -->
      <div style="margin-top: 0px">
        <el-row>
          <!-- <el-col :span="3">
            <div class="block"> -->
          <!-- 查询栏级联选择器 -->
          <!-- <el-cascader
                v-model="queryInfo.type"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </div>
          </el-col> -->
          <el-col :span="6">
            <div class="block">
              <!-- 查询栏日期时间选择器 -->
              <el-date-picker
                v-model="queryInfo.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="1">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="large"
              @click="queryByTime"
            ></el-button>
          </el-col>
          <el-col :span="1"
            ><el-button
              type="primary"
              icon="el-icon-edit"
              size="large"
              @click="addDialogVisible = true"
            ></el-button
          ></el-col>
        </el-row>
      </div>
      <el-table :data="tableData" height="350" border style="width: 100%" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="time" label="日期" width="250" sortable>
        </el-table-column>
        <el-table-column prop="receipt" label="收入金额" width="180" sortable>
        </el-table-column>
        <el-table-column
          prop="disbursement"
          label="支出金额"
          width="180"
          sortable
        >
        </el-table-column>
        <el-table-column prop="type" label="收支类型" width="180" sortable>
        </el-table-column>
        <el-table-column prop="note" label="备注"> </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="getEditInfo(scope.row)"
            ></el-button>
          </template>
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
        <el-form-item label="收支金额" prop="num">
          <el-input v-model="addForm.num"></el-input>
        </el-form-item>
        <el-form-item label="收支类型" prop="type">
          <el-cascader
            v-model="addForm.type"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="text">
          <el-input v-model="addForm.text"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改的对话框 -->
    <el-dialog title="修改" :visible.sync="editDialogVisible" width="20%">
      <!-- 内容主体 -->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="收支金额" prop="num">
          <el-input v-model="editForm.num"></el-input>
        </el-form-item>
        <el-form-item label="收支类型" prop="type">
          <el-cascader
            v-model="editForm.type"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="text">
          <el-input v-model="editForm.text"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data: function () {
    return {
      // 控制添加对话框的显示和隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      input: "",
      select: "",
      queryInfo: {
        time: [],
        type: [],
        beginTime: "",
        endTime: "",
      },
      tableData: [],
      //添加记录的数据
      options: [
        {
          value: "in",
          label: "收入",
          children: [
            {
              value: "工资",
              label: "工资",
            },
            {
              value: "股票",
              label: "股票",
            },
            {
              value: "分红",
              label: "分红",
            },
            {
              value: "奖金",
              label: "奖金",
            },
          ],
        },
        {
          value: "ex",
          label: "支出",
          children: [
            {
              value: "税收",
              label: "税收",
            },
            {
              value: "衣食住行",
              label: "衣食住行",
            },
            {
              value: "医疗",
              label: "医疗",
            },
            {
              value: "其他",
              label: "其他",
            },
          ],
        },
      ],
      option1: {
        title: {
          text: "支出",
        },
        tooltip: {},
        legend: {
          data: ["支出"],
        },
        xAxis: {
          data: ["税收", "衣食住行", "医疗", "其他"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [0, 0, 0, 0],
          },
        ],
      },
      option2: {
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
              { value: 0, name: "工资" },
              { value: 0, name: "股票" },
              { value: 0, name: "分红" },
              { value: 0, name: "奖金" },
            ],
          },
        ],
      },
      editForm: {
        type: [],
        num: 0,
        text: "",
        receipt: 0,
        disbursement: 0,
        id: 0,
      },
      addForm: {
        type: [],
        num: "",
        text: "",
        receipt: 0,
        disbursement: 0,
      },
      // 添加表单的验证规则
      addFormRules: {
        num: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 0, max: 10, message: "0到10位", trigger: "blur" },
          { pattern: /^[1-9]\d*$/, required: true, message: "请输入正整数", trigger: "blur" }
        ],
        type: [{ required: true }],
      },
      token: window.sessionStorage.getItem("token"),
    };
  },

  methods: {
    justInOrEx() {
      if (this.addForm.type[0] == "in") {
        this.addForm.receipt = Number(this.addForm.num);
        this.addForm.disbursement = 0;
      } else {
        this.addForm.disbursement = Number(this.addForm.num);
        this.addForm.receipt = 0;
      }
    },

    justInOrEx_e() {
      if (this.editForm.type[0] == "in") {
        this.editForm.receipt = Number(this.editForm.num);
        this.editForm.disbursement = 0;
      } else {
        this.editForm.disbursement = Number(this.editForm.num);
        this.editForm.receipt = 0;
      }
    },

    getEditInfo(row) {
      var temp = JSON.parse(JSON.stringify(this.editForm.type));
      this.editDialogVisible = true;
      this.editForm.id = row.id;
      this.editForm.text = row.note;
      if (row.receipt != 0) {
        temp[0] = "in";
        this.editForm.num = row.receipt;
      } else {
        temp[0] = "ex";
        this.editForm.num = row.disbursement;
      }
      temp[1] = row.type;
      this.editForm.type = temp;
    },

    async editItem() {
      this.justInOrEx_e();
      const { data } = await this.$http.put("/api/bill/update", {
        token: this.token,
        id: this.editForm.id,
        receipt: this.editForm.receipt,
        disbursement: this.editForm.disbursement,
        type: this.editForm.type[1],
        note: this.editForm.text,
      });
      var code = data.code;
      if (code == 0) {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.editDialogVisible = false;
        this.getAll();
      }
    },

    async addItem() {
      this.justInOrEx();
      console.log(this.addForm.receipt);
      console.log(this.addForm.disbursement);
      console.log(this.addForm.type[1]);
      const { data } = await this.$http.post("/api/bill/add", {
        token: this.token,
        receipt: this.addForm.receipt,
        disbursement: this.addForm.disbursement,
        type: this.addForm.type[1],
        note: this.addForm.text,
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

    async getAll() {
      const { data: response } = await this.$http.post("/api/bill/get_all", {
        token: this.token,
      });
      if (response.code == 0) {
        this.tableData = response.data.records;
        this.$message({
          message: "获取收支记录成功",
          type: "success",
        });
      } else {
        this.$message.error("ERROR");
      }
      this.initChart();
    },

    // 删除弹窗
    async removeById(removeid) {
      console.log(removeid);

      const confirmResult = await this.$confirm(
        "此操作将永久删除该记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message({
          type: "info",
          message: "已取消删除",
        });
      }

      const { data: res } = await this.$http.delete("/api/bill/delete", {
        data: {
          token: this.token,
          id: removeid,
        },
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getAll();
      }
    },

    //初始化图表
    async initChart() {
      var myChart1 = echarts.init(document.getElementById("main"));
      var myChart2 = echarts.init(document.getElementById("secondary"));
      const { data } = await this.$http.post("/api/bill/get_sum_by_type", {
        token: this.token,
      });
      this.option1.series[0].data = data.data.disbursement;
      for (var i = 0; i < 4; i++) {
        this.option2.series[0].data[i].value = data.data.receipt[i];
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(this.option1);
      myChart2.setOption(this.option2);
    },
    //时间查询
    async queryByTime() {
      if (this.queryInfo.time == null || this.queryInfo.time == "") {
        this.$message.error("请输入时间");
      } else {
        var date = this.queryInfo.time[0].getDate();
        date = date > 9 ? date : "0" + date;
        var month = this.queryInfo.time[0].getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        var year = this.queryInfo.time[0].getFullYear();
        var hour = this.queryInfo.time[0].getHours();
        hour = hour > 9 ? hour : "0" + hour;
        var minute = this.queryInfo.time[0].getMinutes();
        minute = minute > 9 ? minute : "0" + minute;
        var second = this.queryInfo.time[0].getSeconds();
        second = second > 9 ? second : "0" + second;
        var beginTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
        var date1 = this.queryInfo.time[1].getDate();
        date1 = date1 > 9 ? date1 : "0" + date1;
        var month1 = this.queryInfo.time[1].getMonth() + 1;
        month1 = month1 > 9 ? month1 : "0" + month1;
        var year1 = this.queryInfo.time[1].getFullYear();
        var hour1 = this.queryInfo.time[1].getHours();
        hour1 = hour1 > 9 ? hour1 : "0" + hour1;
        var minute1 = this.queryInfo.time[1].getMinutes();
        minute1 = minute1 > 9 ? minute1 : "0" + minute1;
        var second1 = this.queryInfo.time[1].getSeconds();
        second1 = second1 > 9 ? second1 : "0" + second1;
        var endTime = `${year1}-${month1}-${date1} ${hour1}:${minute1}:${second1}`;
        this.queryInfo.beginTime = beginTime;
        this.queryInfo.endTime = endTime;
        console.log(beginTime);
        console.log(endTime);
        const { data } = await this.$http.post("/api/bill/get_by_time", {
          token: this.token,
          beginTime: beginTime,
          endTime: endTime,
        });
        if (data.code != 0) {
          this.$message.error(data.msg);
        } else {
          this.tableData = data.data.records;
          this.$message.success(data.msg);
        }
      }
    },

    async queryByType() {
      const { data } = await this.$http.post("/api/bill/get_by_type", {
        token: this.token,
        type: this.queryInfo.type[1],
      });
      console.log(this.queryInfo.type);
      console.log(data);
      if (data.code != 0) {
        this.$message.error(data.msg);
      } else {
        this.tableData = data.data.records;
        this.$message.success(data.msg);
      }
    },
  },

  created() {
    this.getAll();
  },

  mounted() {
    this.initChart();
  },

  watch: {
     queryInfo:{//深度监听，可监听到对象、数组的变化
         handler(val, oldVal){
           this.getAll();
         },
         deep:true //true 深度监听
     }
  }
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