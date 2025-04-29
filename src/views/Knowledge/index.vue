<template>
  <div class="knowledge-wrapper">
    <!-- 主体部分（左右布局） -->
    <div class="main">
      <!-- 左侧菜单 -->
      <div
        class="sidebar"
        :style="{
          width: isCollapse ? '0px' : '280px',
          overflow: isCollapse ? 'hidden' : 'auto',
        }"
      >
        <el-menu
          class="menu"
          :default-active="selectedId"
          @select="handleSelect"
          unique-opened
          :collapse="isCollapse"
        >
          <template v-for="item in menuItems" :key="item.id">
            <el-sub-menu v-if="item.children" :index="item.id.toString()">
              <template #title>
                <el-tooltip
                  effect="dark"
                  :content="item.name"
                  placement="right"
                >
                  <span class="menu-text">{{ item.name }}</span>
                </el-tooltip>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.id"
                :index="child.id.toString()"
              >
                <el-tooltip
                  effect="dark"
                  :content="child.name"
                  placement="right"
                >
                  <span class="menu-text">{{ child.name }}</span>
                </el-tooltip>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.id.toString()">
              <el-tooltip effect="dark" :content="item.name" placement="right">
                <span class="menu-text">{{ item.name }}</span>
              </el-tooltip>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <!-- 折叠按钮 -->
      <div
        @click="toggleCollapse"
        style="align-items: center; display: flex; padding-left: 10px"
      >
        <el-icon v-if="isCollapse"><ArrowRightBold /></el-icon>
        <el-icon v-else><ArrowLeftBold /></el-icon>
      </div>
      <!-- 右侧内容 -->
      <div class="content">
        <Main is-side-bar>
          <template #content>
            <!-- Markdown 编辑器 -->
            <MdPreview :modelValue="currentContent" />
          </template>
          <template #information>
            <CardInfo />
            <ElectronicClocks />
            <div class="sticky_layout">
              <div class="mt-[2.5em]">
                <DirectoryCard />
              </div>
            </div>
          </template>
        </Main>
        <MobileDirectoryCard
          :id="id"
          :scroll-element="scrollElement"
          :is-show-move-catalog="isShowMoveCatalog"
          @update:isShowMoveCatalog="(value) => (isShowMoveCatalog = value)"
        />
      </div>
    </div>
    <!-- 页面底部 -->
    <Footer />
  </div>
</template>

<!-- <script setup>
  import { ref } from "vue";
  import {generateKnowledgeMockData, MenuItem} from "./index"
  const menuItems = ref<MenuItem[]>(generateKnowledgeMockData())
//   const menuItems = ref([
//     {
//       id: 1,
//       name: "项目介绍",
//       children: [
//         { id: 11, name: "背景与意义", content: "📘 这是背景内容..." },
//         { id: 12, name: "功能模块", content: "📘 这是功能模块内容..." },
//       ],
//     },
//     {
//       id: 2,
//       name: "环境配置",
//       content: "💻 环境配置内容...",
//     },
//     {
//       id: 3,
//       name: "接口文档",
//       children: [
//         { id: 31, name: "用户模块", content: "📄 用户模块内容..." },
//         { id: 32, name: "知识库模块", content: "📄 知识库内容..." },
//       ],
//     },
//   ]);
  
  const currentContent = ref(menuItems.value[0].children[0].content);
  const selectedId = ref(menuItems.value[0].children[0].id.toString());
  
  const handleSelect = (index) => {
    for (const item of menuItems.value) {
      if (item.id.toString() === index) {
        selectedId.value = index;
        currentContent.value = item.content || "暂无内容";
        return;
      }
      if (item.children) {
        const child = item.children.find((c) => c.id.toString() === index);
        if (child) {
          selectedId.value = index;
          currentContent.value = child.content || "暂无内容";
          return;
        }
      }
    }
  };
  </script> -->
<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import useWebsiteStore from "@/store/modules/website.ts";
import MobileDirectoryCard from "../Article/MobileDirectoryCard/index.vue";
import DirectoryCard from "../Article/DirectoryCard/index.vue";
const scrollElement = document.documentElement;
const id = "preview-only";
const isCollapse = ref(false);
const isShowMoveCatalog = ref(false);
const websiteStore = useWebsiteStore();
// 公告
function announcement() {
  ElMessageBox.alert(
    `<pre>${websiteStore.webInfo?.sidebarAnnouncement}</pre>`,
    "公告",
    {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: "关闭",
      closeOnPressEscape: true,
      dangerouslyUseHTMLString: true,
    }
  );
}
// 数据类型定义
interface SubMenuItem {
  id: number;
  name: string;
  content: string;
}

interface MenuItem {
  id: number;
  name: string;
  children?: SubMenuItem[];
}

// 封装假数据
const generateKnowledgeMockData = (): MenuItem[] => {
  const menuItems: MenuItem[] = [];
  let idCounter = 1;

  for (let i = 1; i <= 50; i++) {
    const parent: MenuItem = {
      id: idCounter++,
      name: `模块 ${i}`,
      children: [],
    };

    const childCount = Math.floor(Math.random() * 4) + 2; // 2~5 个子模块

    for (let j = 1; j <= childCount; j++) {
      const child: SubMenuItem = {
        id: idCounter++,
        name: `模块 ${i}.${j}`,
        content: `📚 欢迎来到 <strong>模块 ${i}.${j}</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。`,
      };

      parent.children?.push(child);
    }

    menuItems.push(parent);
  }

  return menuItems;
};
// 折叠菜单
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
// 菜单数据
const menuItems = ref<MenuItem[]>(generateKnowledgeMockData());

// 当前选中的子项 ID
const selectedId = ref<string>("");

// 当前内容
const currentContent = computed(() => {
  for (const parent of menuItems.value) {
    if (parent.children) {
      const match = parent.children.find(
        (child) => child.id.toString() === selectedId.value
      );
      if (match) return match.content;
    } else if (parent.id.toString() === selectedId.value) {
      return `📘 ${parent.name} 暂无详细内容，请选择子项查看～`;
    }
  }
  return "📖 请选择左侧的模块查看对应内容。";
});

// 菜单点击事件
const handleSelect = (index: string) => {
  selectedId.value = index;
};
</script>

<style scoped lang="scss">
.collapse-btn {
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  color: #ccc;
}
:deep(.el-menu-item) {
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
  margin: 4px 8px; /* 给选中状态留出圆角空间 */
}

/* 选中项样式 */
:deep(.el-menu-item.is-active) {
  background-color: #409eff !important;
  color: #fff !important;
  font-weight: bold;
}

.knowledge-wrapper {
  display: flex;
  flex-direction: column;
  padding-top: 56px;
  height: 100vh;
}

/* 主体区域：左右布局 */
.main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 左侧菜单 */
.sidebar {
  width: 280px;
  overflow-y: auto;
  transition: width 0.3s ease;
}

/* 菜单文本截断 */
.menu-text {
  display: inline-block;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 右侧内容 */
.content {
  flex: 1;
  padding-top: 20px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

// 移动端目录按钮
.move_catalog_btn {
  border-radius: 1em;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color);
  background: white;
  // 固定在右下角
  position: fixed;
  right: 5em;
  bottom: 1em;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  @media screen and (max-width: 910px) {
    visibility: visible;
    right: 3em;
    bottom: 1em;
  }

  @media screen and (max-width: 768px) {
    right: 5em;
    bottom: 1em;
  }

  .move_catalog_svg {
    @media screen and (max-width: 768px) {
      width: 25px !important;
      height: 25px !important;
    }
  }
}
/* 如果你是在 <style scoped> 中写 */
:deep(.content_container) {
  width: 100% !important;
}
</style>
