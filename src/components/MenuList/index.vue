<template>
<div>
  <div class="menu-icon" style="display: flex; flex-direction: row; margin-top: 0.26rem">
    <img src="@/assets/leaf.png" class="school" />
    <div style="font-size: 1.3rem; text-align: center">IBP-IoT</div>
  </div>
  <router-link v-for="item in Menus" class="menu-list" :to="item.path" :key="item.index" active-class="menu-list-active">
    <img class="list-icon" :src="item.src" />{{ item.name }}
  </router-link>
</div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      //菜单项配置  src图标位置  name名称  path路由配置
      Menus: [{
          name: "首页",
          src: require("@/assets/首页-选中.svg"),
          path: "/HomePage/Home",
        },
        {
          name: "数据查询",
          src: require("@/assets/数据分析.svg"),
          path: "/HomePage/DataAnalysis",
        },
        // {
        //   name: "IntelligentLines",
        //   src: require("../../assets/img/仪表盘.svg"),
        //   path: "/HomePage/IntelligentLines",
        // },
        // {
        //   name: "应用场景",
        //   src: require("../../assets/img/场景.svg"),
        //   path: "/HomePage/ApplicationScenarios",
        // },
        {
          name: "智能曲线",
          src: require("@/assets/设备.svg"),
          path: "/HomePage/Lines",
        },
        {
          name: "数据统计",
          src: require("@/assets/仪表盘.svg"),
          path: "/HomePage/DeviceManagement",
        },
        {
          name: "用户管理",
          src: require("@/assets/用户.svg"),
          path: "/HomePage/UserManagement",
        },
        // {
        //   name: "道闸开关",
        //   src: require("../../assets/img/开关.svg"),
        //   path: "/HomePage/Switch",
        // },
      ],
    };
  },
};
</script>

<style scoped>
.school {
  height: 1.3rem;
  width: 1.3rem;
  margin: 0 0.8rem 0 0.9rem;
}

.menu-list {
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
}

.menu-list:hover {
  background: #1990ff;
}

.menu-list-active {
  background: #1990ff;
  color: white;
}

.menu-icon {
  display: flex;
  font-size: 1.5rem;
  width: 100%;
  height: 3rem;
  color: white;
  margin-left: 1rem;
  align-items: center;
}

.list-icon {
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 1rem 0 1.7rem;
}

.list-text {
  color: #36434e;
}
</style>
