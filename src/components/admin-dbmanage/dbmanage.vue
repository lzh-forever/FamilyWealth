<template>
  <div>

    <el-row gutter="20">
      <el-col :span="7">
        <el-input
          placeholder="请输入数据库备份的名字"
          v-model="dbname"
          clearable
          maxlength="15"
        ></el-input>
      </el-col>
      <el-col :span="1.8">
        <el-button type="primary" @click="dbSave()">备份数据库</el-button>
      </el-col>
      <el-col :span="2.5">
        <el-button type="primary" @click="getdbList()"
          >查询所有数据库备份</el-button
        >
      </el-col>
      <el-col :span="2.5">
        <el-button type="primary" @click="CcenterDialogVisible = true"
          >清空数据库</el-button
        >
      </el-col>
    </el-row>
    <!--添加删除用户的对话框-->
    <el-dialog
      title="删除确认界面"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      v-if="centerDialogVisible"
    >
          <el-input label="管理员密码:" placeholder="请输入管理员密码" v-model="adminPassword" clearable="true">
        </el-input>

      <!--底部按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false;">取 消</el-button>
        <el-button
          type="danger"
          @click="
            deletedbSaved();
            centerDialogVisible = false;
          "
          >确认删除</el-button
        >
      </span>
      
    </el-dialog>
<!--添加还原用户的对话框-->
    <el-dialog
      title="还原确认界面"
      :visible.sync="BcenterDialogVisible"
      width="30%"
      center
      v-if="BcenterDialogVisible"
    >
          <el-input label="管理员密码:" placeholder="请输入管理员密码" v-model="BadminPassword" clearable="true">
        </el-input>

      <!--底部按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="BcenterDialogVisible = false;">取 消</el-button>
        <el-button
          type="success"
          @click="
            setbackSaved();
            BcenterDialogVisible = false;
          "
          >确认还原</el-button
        >
      </span>
      
    </el-dialog>

<!--全部删除数据库备份的对话框-->
    <el-dialog
      title="删除确认界面"
      :visible.sync="CcenterDialogVisible"
      width="30%"
      center
      v-if="CcenterDialogVisible"
    >
          <el-input label="管理员密码:" placeholder="请输入管理员密码" v-model="CadminPassword" clearable="true">
        </el-input>

      <!--底部按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="CcenterDialogVisible = false;">取 消</el-button>
        <el-button
          type="danger"
          @click="
            emptydbSaved();
            CcenterDialogVisible = false;
          "
          >确认删除</el-button
        >
      </span>
      
    </el-dialog>
    <el-table
      :data="dbList"
      highlight-current-row="true"
      width="665px"
      height="760"
      style="margin-top: 15px"
      
    >
      <el-table-column class="info" type="index" label="序号" align="center" width="100px"></el-table-column>
      <el-table-column class="info" label="数据库名称" align="center" prop="name"></el-table-column>
      <el-table-column class="info" label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" @click="centerDialogVisible = true;dbDeleteName = scope.row.name">
            </el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="恢复" placement="top" :enterable="false">
            <el-button type="success" icon="el-icon-check" @click="BcenterDialogVisible = true;dbSetbackName = scope.row.name">
            </el-button>
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
      //要备份的数据库名字
      dbname: "",
      dbList:[],
      //删除的dialog控制
      centerDialogVisible: false,
      //删除的密码
      adminPassword: '',
      //还原的密码
      BadminPassword: '',
      //要删除的数据库名字
      dbDeleteName: '',
      //还原的dialog控制
      BcenterDialogVisible: '',
      //要还原的数据库名字
      dbSetbackName: '',
      //全部删除的dialog控制
      CcenterDialogVisible: '',
      //清空数据库的密码
      CadminPassword: ''
    };
  },
  created(){
    this.getdbList();
  },
  methods: {
    async dbSave() {
      var that = this;
      const { data } = await this.$http.post("/api/database/save", {
        token: window.sessionStorage.getItem("token"),
        name: this.dbname,
      });
      if (data.code !== 0) {
        console.log("备份失败");
        that.$message.error(data.msg);
        return this.$message.error(data.msg);
      } else {
        console.log("备份成功");
        this.getdbList();
        that.$message.success(data.msg);

      }
    },
    async deletedbSaved(){
        var that = this;
        const { data } = await this.$http.delete("/api/database/delete", {
        data: {
          token: window.sessionStorage.getItem("token"),
          password: this.adminPassword,
          name: this.dbDeleteName,
        },
      });
      if (data.code !== 0) {
        console.log("删除失败");
        that.$message.error(data.msg);
        return this.$message.error("删除数据库备份失败");
      } else {
        console.log("删除成功");
        that.$message.success(data.msg);
      }
      this.getdbList();
    },
    async getdbList(){
      const { data } = await this.$http.post("/api/database/get", {
        token: window.sessionStorage.getItem("token"),
      });
      if (data.code !== 0) {
        console.log(data.msg);
        return this.$message.error("获取数据库备份列表失败");
      } else {
        console.log(data.msg);
        this.dbList = data.data.save;
      }
    },
    async setbackSaved(){
      var that = this;
      console.log(this.BadminPassword);
      console.log(this.dbSetbackName);
       const { data } = await this.$http.post("/api/database/recover", {
        token: window.sessionStorage.getItem("token"),
        password:this.BadminPassword,
        name:this.dbSetbackName
      });
      if (data.code !== 0) {
        console.log(data.msg);
        that.$message.error(data.msg);
        return this.$message.error("还原数据库备份失败");
      } else {
        console.log(data.msg);
        that.$message.success(data.msg);
      }
    },
    async emptydbSaved(){
      var that = this;
        const { data } = await this.$http.delete("/api/database/empty", {
        data: {
          token: window.sessionStorage.getItem("token"),
          password: this.CadminPassword,
        },
      });
      if (data.code !== 0) {
        console.log("删除失败");
        that.$message.error(data.msg);
        return this.$message.error("清空数据库失败");
      } else {
        console.log("删除成功");
        that.$message.success(data.msg);
      }
      this.getdbList();
    }
  },
};
</script>

<style>
</style>