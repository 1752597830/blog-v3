<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { throttle } from "@/utils/optimize";

// 滚动距离
const top = ref(0);
let mainEl: HTMLElement | null = null;

const handleScroll = () => {
  if (mainEl) {
    top.value = mainEl.scrollTop;
  }
};

const handleScrollThrottled = throttle(handleScroll, 200);

onMounted(() => {
  mainEl = document.querySelector("main");
  if (mainEl) {
    mainEl.addEventListener("scroll", handleScrollThrottled);
  }
});

onBeforeUnmount(() => {
  if (mainEl) {
    mainEl.removeEventListener("scroll", handleScrollThrottled);
  }
});

// 返回顶部
function backToTop() {
  if (mainEl) {
    mainEl.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
</script>
<template>
  <transition name="el-zoom-in-bottom">
    <div v-if="top >= 1000" @click="backToTop">
      <el-tooltip effect="light" content="回到顶部" placement="left">
        <div>
          <svg-icon name="back_to_top" class="back-to-top" />
        </div>
      </el-tooltip>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.back-to-top {
  height: 30px !important;
  width: 30px !important;

  @media screen and (max-width: 768px) {
    height: 30px !important;
    width: 30px !important;
  }
}
</style>
