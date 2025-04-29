<template>
  <div>
    <router-view></router-view>
  </div>
  <!-- 全局loading -->
  <loading></loading>
</template>

<script setup lang="ts">
import {useDark, useToggle} from "@vueuse/core";
import useWebsiteStore from "@/store/modules/website";
import { getWelcomeSay } from "@/utils/tool";
import { ElNotification } from "element-plus";

const useWebsite = useWebsiteStore()

onMounted(() => {
  let msg = getWelcomeSay();
  ElNotification({
    offset: 60,
    title: "欢迎访问sin的博客～",
    message: h("div", { style: "font-weight: 600;" }, msg),
  });
  useWebsite.getInfo()

})

//  深色切换
useDark({
  selector: 'html',
  attribute: 'class',
  valueLight: 'light',
  valueDark: 'dark'
})

useDark({
  onChanged(dark) {
    useToggle(dark)
  }
})
</script>

<style scoped lang="scss">

</style>