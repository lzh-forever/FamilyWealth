<template></template>

<script>
export default {};
</script>

<style>
</style><template>
  <div id="home">
    <el-container class="home-container">
      <el-header>
        <div>
          <h1 data-shadow="家庭财务管理">家庭财务管理-管理员</h1>
        </div>

        <div>
          <el-popover placement="bottom" width="140" trigger="hover">
            <div style="text-align: center">
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
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" v-on:click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单 -->
          <el-menu
            id="asideMenu"
            background-color="rgb(5, 107, 110)"
            text-color="#fff"
            active-text-color="black"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router="ture"
          >
            <!--侧边栏菜单-->
            <el-menu-item index="a1">
              <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span>用户管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="a2">
              <template slot="title">
                <i class="el-icon-s-finance"></i>
                <span>数据库管理</span>
              </template>
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
    profile() {
      this.$router.push("/profile");
    },
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
</style>
