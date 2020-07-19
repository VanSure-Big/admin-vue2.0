<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
    <!-- 内容区 -->
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#main-wrap {
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.05);
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30px;
  padding-left: $navMenu + 30px;
  padding-right: 30px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all .5s ease 0s);
}
.open {
  .main-content {
    padding-left: $navMenu + 30px;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30px;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  @include webkit(box-sizing, border-box);
  background-color: #ffffff;

}
</style>
