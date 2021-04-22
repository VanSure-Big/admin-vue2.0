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
        {{userName}}
      </div>
    <!-- <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button> -->
      <div class="pull-left header-icon" @click="centerDialogVisible = true">
        <svg-icon iconName="exit" className="exit"></svg-icon>
      </div>
      <!-- 退出框 -->
      <el-dialog
      title="提示"
      append-to-body
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定退出?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exit">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <div>

    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed} from "@vue/composition-api";
import { removeToKen, removeuserName } from "@/utils/app";
export default {
  name: "layoutHeader",
  setup(porps, {root}){
    const centerDialogVisible = ref(false);
    //从vuex中获取username
    const userName = root.$store.state.login.userName;
    const navMenuState = ()=> {
      //commit方法是在vue实例中调用vuex中mutations方法用来改变state.isCollapse的值
      root.$store.commit("app/SET_COLLAPSE")
      console.log(root.$store.state.login.toKen);
      console.log(root.$store.state.login.userName);
    };
    //退出
    const exit = ()=> {
      //dispatch方法是在vue实例中调用vuex中actions里定义的方法
      root.$store.dispatch("login/exit").then(()=>{
        root.$router.push({
          name: "Login"
        })
      })

    }
    return {
      navMenuState,
      userName,
      exit,
      centerDialogVisible
    }
  }
};
</script>
<style lang="scss" >
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
  cursor: pointer;
  svg {
    color: black !important;
    fill: currentColor;
    font-size: 22px;
    text-align: center;
    vertical-align: middle;
  }
}
.user-name {
  height: 100%;
  border-right: 2px solid #ededed;
  padding: 0 25px;
  cursor: pointer;
  }
.portrait-img {
  cursor: pointer;
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
