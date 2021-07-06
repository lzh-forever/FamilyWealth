<template>
  <div>
    <el-card id="stockForecast">
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
import { splitData, setData0, getOption } from "./forecast";
import { Loading } from "element-ui";
var loadingInstance;
export default {
  data() {
    return {
      input: "",
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    var option = window.localStorage.getItem("option");
    myChart.setOption( JSON.parse(option))
    this.input = window.localStorage.getItem('code')
  },
  methods: {
    forecast() {
      if (this.input.length != 6) {
        this.$message.error("请输入6位股票代码");
      } else {
        if (isNaN(Number(this.input))) {
          this.$message.error("请输入6位股票代码");
        } else {
          loadingInstance = Loading.service({
            text: "拼命加载中",
            spinner: "el-icon-loading",
            background: "rgba(0,0,0,0.8)",
          });
          this.$message.success(this.input + " success");
          this.getResult();
        }
      }
    },
    getResult() {
      var that = this;
      this.$http
        .get("http://192.168.43.23:5000/forecast?code=" + this.input)
        .then(
          function (response) {
            console.log(response.data);
            if (response.data.code != 0) {
              that.$message.error(response.data.msg + "请输入6位股票代码");
              loadingInstance.close();
            } else {
              var myChart = echarts.init(document.getElementById("main"));
              var rawData = response.data.data;
              setData0(splitData(rawData));
              var option = getOption();

              window.localStorage.setItem("option", JSON.stringify(option));
              window.localStorage.setItem('code',that.input)

              myChart.setOption(option);
              loadingInstance.close();
            }
          },
          function (err) {
            console.log(err);
            console.log("aaaa");
            loadingInstance.close();
          }
        );
    },
  },
};
</script>

<style>
</style>