<template>
  <div>
    <el-card>
      <el-input
        placeholder="请输出股票代码"
        v-model="input"
        @keyup.enter.native="forecast"
      ></el-input>
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      input: "",
    };
  },
  mounted() {


    // const option = {
    //   toolbox: { feature: { saveAsImage: {} } },
    //   tooltip: {},
    //   xAxis: {
    //     type: "category",
    //     data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
    //   },
    //   yAxis: { type: "value" },
    //   series: [
    //     {
    //       data: [
    //         // 开盘价、收盘价、最低价、最高价
    //         [20, 30, 10.4, 35],
    //         [40, 35, 30, 55],
    //         [33, 38, 32, 40],
    //         [40, 48, 32, 50],
    //       ],
    //       itemStyle: {
    //         color: "#d87c7c",
    //         color0: "#919e8b",
    //         borderColor: "#d87c7c",
    //         borderColor0: "#919e8b",
    //       },
    //       type: "k",
    //     },
    //   ],
    // };
    // myChart.setOption(option);
  },
  methods: {
    forecast() {
      if (this.input.length != 6) {
        this.$message.error("请输入6位股票代码");
      } else {
        if (isNaN(Number(this.input))) {
          this.$message.error("请输入6位股票代码");
        } else {
          this.$message.success(this.input + " success");
          this.getResult();
        }
      }
    },
    getResult() {
      var that = this;
      this.$http.get("http://192.168.43.54:5000/forecast?code="+this.input+"&date=2021-04-01").then(function (response) {
        var data = response.data;
        console.log(response)
        if (data.code != 0) {
          that.$message.error(data.msg + '请输入6位股票代码');
        } else {
          var myChart = echarts.init(document.getElementById("main"));
          data.option.yAxis.scale=true
          myChart.setOption(data.option);
        }
      },function(err){
        console.log(err)
        console.log('aaaa')
      });
    },
  },
};
</script>

<style>
</style>