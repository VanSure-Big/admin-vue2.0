<template>
  <div id="nav-wrap">
    <div class="logo"><img src="@/assets/logo.png" alt=""></div>
    <el-menu
      default-active="1-4-1"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
    <template v-for="(item, index) in routers" >
      <el-submenu :index="index.toString()" :key="item.id" v-if="!item.hidden">
        <!--一级菜单-->
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <svg-icon :iconName="item.meta.icon" :className="item.meta.icon"></svg-icon>
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <!--二级菜单-->
        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">{{subItem.meta.name}}</el-menu-item>
      </el-submenu>
    </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed} from "@vue/composition-api";
export default {
  name: "navMuen",
  setup(props, context) {
    /**
     * 声明data数据
     */
    // const isCollapse = ref(false);
    //获取routes
    const routers = reactive(context.root.$router.options.routes)
    console.log(routers);
    /**
     * 计算属性
     */
    const isCollapse = computed(() => context.root.$store.state.app.isCollapse);
    
    /**
     * 声明函数
     */

    /**
     * 生命周期（挂载完成后）
     */
    onMounted(() => {});
    return {
      isCollapse,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
.logo {
  text-align: center;
  padding: 25px 0;
  img {
    width: 100px;
    margin: 0 auto;
    @include webkit(transition, all .5s ease 0s)
  }
}
#nav-wrap {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: $mainColor;
  @include webkit(transition, all .5s ease 0s)
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  img {
    width: 80%;
  }
  
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
</style>
