<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>
<script>
//从vue3x @vue/composition-api引入
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconName: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props){
    // console.log(props.iconName);
    // console.log(props.className);
    const svgName = computed(() => {    
      return `#icon-${props.iconName}`
    });
    const svgClass = computed(() =>{
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return `svg-icon`
      }
    })
    return {
      svgName,
      svgClass
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 18px;
  //改变svg颜色
  //1
  color: #fff;
  fill: currentColor;
  //2
  // filter: drop-shadow(rgb(255, 255, 255) 80px 0);
  // -webkit-filter: drop-shadow(rgb(255, 255, 255) 80px 0);
   // transform: translateX(-80px);
  }

</style>