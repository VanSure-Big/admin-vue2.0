<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconName="menu" className="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="pull-left portrait-img">
        <img src="@/assets/portrait.jpg" alt="">
      </div>
      <div class="pull-left user-name">
        管理员
      </div>
      <div class="pull-left header-icon"><svg-icon iconName="quit" className="quit"></svg-icon></div>
    </div>
    <div>

    </div>
  </div>
</template>
<script>
export default {
  name: "layoutHeader",
  setup(porps, {root}){
    const navMenuState = ()=> {
      //commit方法是在vue实例中调用vuex中mutations方法用来改变state.isCollapse的值
      root.$store.commit("app/SET_COLLAPSE")
    } 
    return {
      navMenuState
    }
  }
};
</script>
<style lang="scss" scoped>
#header-wrap {
  z-index: 1;
  position: fixed;
  left: $navMenu;
  top: 0;
  right: 0;
  height: $layoutHeader;
  line-height: $layoutHeader;
  background-color: #ffffff;
  //边框阴影
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  //平移动画
  @include webkit(transition, all .5s ease 0s);
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    fill: black;
    font-size: 22px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }
}
.user-name {
  height: 100%;
  border-right: 2px solid #ededed;
  padding: 0 25px;
  }
.portrait-img {
  margin: 10px auto;
  line-height: $layoutHeader;
  height: 50px;
  width: 50px;
  border: 1px solid #ffffff;
  border-radius: 30px;
  //图片
  // background-color: red;
  // background-image: url("../../../assets/portrait.jpg");
  // background-repeat:no-repeat;
  // background-size:100% 100%;
  // -moz-background-size:100% 100%;
  img {
    border: 1px solid #ffffff;
    border-radius: 30px;
    height: 100%;
  }
}
</style>
