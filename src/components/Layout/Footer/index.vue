<!-- 底部 -->
<script setup lang="ts">
import useWebsiteStore from "@/store/modules/website.ts";

const useWebsite = useWebsiteStore();
</script>
<template>
  <div class="Footer">
    <!-- 文章页脚 -->
    <div class="footer_container">
      <div class="footer_text">
        <div class="flex">
          <div>&copy;&nbsp;{{ useWebsite.webInfo?.websiteName }}</div>
          &nbsp;&nbsp;
          <div>
            <svg-icon name="astronaut" style="width: 36px; height: 36px"></svg-icon>
          </div>
        </div>

        <div class="footer-color mt-[5px] flex justify-center flex-wrap">
          <a
            class="p-[3px]"
            href="https://www.aliyun.com/?spm=5176.28055625.J_3207526240.1.6a27154aw7v5VK"
            target="_blank"
          >
            <img
              src="https://img.shields.io/badge/%E9%98%BF%E9%87%8C%E4%BA%91-ECS%E6%9C%8D%E5%8A%A1%E5%99%A8-orange"
              alt=""
          /></a>
          <a
            class="p-[3px]"
            href="https://imzbf.github.io/md-editor-v3/docs/index"
            target="_blank"
          >
            <img
              src="https://img.shields.io/badge/MdEditorV3-MD%E7%BC%96%E8%BE%91%E5%99%A8-159957"
              alt=""
          /></a>
          <a class="p-[3px]" href="https://butterfly.js.org/" target="_blank">
            <img
              src="https://img.shields.io/badge/HEXO-BUTTERFLY-blue"
              alt=""
            />
          </a>
          <a class="p-[3px]" href="https://min.io/" target="_blank">
            <img
              src="https://img.shields.io/badge/minio-%E5%AF%B9%E8%B1%A1%E5%AD%98%E5%82%A8%E7%B3%BB%E7%BB%9F-purple"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Footer {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  // 渐变底部
  background: var(--mao-bg-footer);
}

.footer_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer_text {
  // line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
}
</style>
