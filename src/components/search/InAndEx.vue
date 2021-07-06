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
        <el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="收入" value="1"></el-option>
            <el-option label="支出" value="2"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" height="350" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="time" label="日期" width="250">
        </el-table-column>
        <el-table-column prop="receipt" label="收入金额" width="180">
        </el-table-column>
        <el-table-column prop="disbursement" label="支出金额" width="180">
        </el-table-column>
        <el-table-column prop="type" label="收支类型" width="180">
        </el-table-column>
        <el-table-column prop="note" label="备注"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="addDialogVisible = true"
            ></el-button>
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
    <el-dialog title="提示" :visible.sync="addDialogVisible" width="20%">
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
        <el-button type="primary" @click="addItem" 
          >确 定</el-button
        >
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
        <el-button type="primary" @click="editItem" 
          >确 定</el-button
        >
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
      editDialogVisible:false,
      input: "",
      select: "",
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
      editForm:{
        type: [],
        num: 0,
        text: "",
        receipt:0,
        disbursement:0,
        id: 0
      },
      addForm: {
        type: [],
        num: 0,
        text: "",
        receipt:0,
        disbursement:0
      },
      // 添加表单的验证规则
      addFormRules: {
        num: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 0, max: 10, message: "0到10位", trigger: "blur" },
        ],
        type: [{ required: true }],
      },
      // editFormRules: {
      //   Enum: [
      //     { required: true, message: "请输入内容", trigger: "blur" },
      //     { min: 0, max: 10, message: "0到10位", trigger: "blur" },
      //   ],
      //   Etype: [{ required: true }],
      //   Etext:[{}]
      // },
      token: window.sessionStorage.getItem("token"),
      testForm: {
        token: window.sessionStorage.getItem("token"),
        receipt: 20,
        disbursement: 0,
        type: "学习",
        note: "test_addItem",
      },
    };
  },

  methods: {
    justInOrEx(){
      if(this.addForm.type[0]=='in')
      {
        this.addForm.receipt=Number(this.addForm.num);
        this.addForm.disbursement=0;
      }
      else{
        this.addForm.disbursement=Number(this.addForm.num);
        this.addForm.receipt=0;
      }
    },

    getEditInfo(row){
      var temp =JSON.parse(JSON.stringify(this.editForm.type))
      this.editDialogVisible=true;
      this.editForm.id=row.id;
      this.editForm.text=row.note;
      if(row.receipt!=0){
        temp[0]='in';
        this.editForm.num=row.receipt;
      }
      else{
        temp[0]='ex';
        this.editForm.num=row.disbursement;
      }
      temp[1]=row.type;
      this.editForm.type= temp;
    },

    async editItem(){
      const { data } = await this.$http.put(
        "/api/bill/update",
        {token: this.token,
        id:this.editForm.id,
        receipt:this.editForm.receipt,
        disbursement:this.editForm.disbursement,
        type: this.editForm.type[1],
        note:this.editForm.text }
      );
      var code =data.code;
      if(code==0){
        this.$message({
          type: "success",
          message: "修改成功!",
        });
      this.editDialogVisible=false;
      this.getAll();
      }
    },

    async addItem() {
      this.justInOrEx();
      console.log(this.addForm.receipt);
      console.log(this.addForm.disbursement);
      console.log(this.addForm.type[1]);
      const { data } = await this.$http.post(
        "/api/bill/add",
        {token: this.token,receipt:this.addForm.receipt,disbursement:this.addForm.disbursement,type: this.addForm.type[1],note:this.addForm.text }
      );
      var code =data.code;
      if(code==0){
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      }
      this.addDialogVisible=false;
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
  },

  created() {
    this.getAll();
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