<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="banner" v-for="banner in banners">
        <img :src="banner" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
// If you use Swiper 6.0.0 or higher
// import 'swiper/swiper-bundle.css'
export default {
  data() {
    return {
      banners: [
        "https://imgs.qunarzz.com/vs_ceph_b2c_001/ce021e65-7016-431a-9ef1-904b736bc636.jpg_r_390x260x95_80e50ab5.jpg",
        "https://imgs.qunarzz.com/vs_ceph_b2c_001/a2b0969a-c60e-4977-b88f-8c9841d3e74d.jpg_r_390x260x95_6018e758.jpg",
        "https://imgs.qunarzz.com/vs_ceph_b2c_001/35c86e66-3c10-4c8c-97f3-08470bac1454.jpg_r_390x260x95_b2ed0992.jpg"
      ],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          // loop: true,
          effect: "coverflow", //翻转效果
          centeredSlides: true,
          slidesPerView: "auto", //设置中间的卡片居中显示
          coverflowEffect: {
            // coverflow 效果调整
            rotate: 30,
            stretch: 0,
            depth: 60,
            modifier: 2,
            slideShadows: true
          }
        }
      }
    };
  },
  mounted() {
    console.log("Current Swiper instance object", this.mySwiper);
    this.mySwiper.slideTo(3, 1000, false);
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 600px;
  height: 300px;
}
</style>