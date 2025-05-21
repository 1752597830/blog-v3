<script setup lang="ts">
import { computed } from "vue";
import { useScrollStore } from "@/store/modules/scroll";

const scrollStore = useScrollStore();
const top = computed(() => scrollStore.top);

// 返回顶部
function backToTop() {
  const mainEl = document.querySelector("main");
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
