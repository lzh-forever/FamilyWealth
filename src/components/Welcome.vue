<template>
  <div id="welcome">
    <el-row :gutter="20">
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <!-- <ChangeableTitle></ChangeableTitle> -->
  </div>
</template>

<script>
import ChangeableTitle from './ChangeableTitle'

export default {
  data:function(){
    return{
    }
  },
  components:{
    ChangeableTitle
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 80px;/*行间距 */
}

.el-row:last-child {
    margin-bottom: 0;
  }

.el-col {
  border-radius: 4px;/*边框圆角 */
}
.bg-purple-dark {
  background: #b5dad8;
}
.bg-purple {
  background: #f1f3e7;/*实际所有颜色控制 */
}
.bg-purple-light {
  background: #bde4e2;
}
.grid-content {
  border-radius: 12px;
  min-height: 300px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
