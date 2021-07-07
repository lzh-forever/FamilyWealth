<template>
  <div id="home">
    <el-container class="home-container">
      <el-header>
        <div>
          <h1 data-shadow="家庭财务管理">喵喵喵家庭财务管理</h1>
        </div>
        <el-popover placement="bottom" width="140" trigger="hover">
          <div style="text-align: center">
            <el-button style="width:130px" plain @click="profile">
              个人资料
            </el-button>
            <el-divider></el-divider>
            <el-button
              type="danger"
              plain
              icon="iconfont icon-dingbudaohang-zhangh"
              @click="logout"
              style="width: 130px"
              >退出</el-button
            >
          </div>
          <el-avatar
            slot="reference"
            id="avatar"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </el-popover>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" v-on:click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单 -->
          <el-menu
            background-color="rgb(5, 107, 110)"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router="ture"
            default-active="1-1"
          >
            <!--侧边栏菜单-->
            <el-submenu index="1" >
              <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span>收支详情</span>
              </template>
              <el-menu-item index="1-1">收支查询</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-finance"></i>
                <span>财务管理</span>
              </template>
              <el-menu-item index="2-1">证券账户管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-data-analysis"></i>
              <span>股票预测</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main> <router-view></router-view> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isCollapse: false,
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
    profile(){
      this.$router.push('/profile')
    }
  },
};
</script>

<style scoped>
.home-container {
  height: 100vh;
  padding: 0;
  margin: 0;
  width: 100%;
}

.el-header {
  background-color: rgb(5, 107, 110);
  display: flex;
  color: #fff;
  justify-content: space-between;
}

.el-header > el-menu {
  display: flex;
  align-items: center;
  justify-items: flex-end;
}

.el-header > div {
  display: flex;
  align-items: center;
}

.el-aside {
  background-color: cadetblue;
}

.el-main {
  background: linear-gradient(to top, #00467f, #a5cc82);
}

.toggle-button {
  background-color: rgb(82, 162, 165);
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

#avatar {
  margin-top: 9px;
}
</style>
