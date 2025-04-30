<template>
  <div class="knowledge-wrapper">
    <div class="main">
      <el-container class="h-screen">
        <div>
          <el-aside
            :width="isCollapse ? '0px' : '260px'"
            class="hidden md:block sidebar"
          >
            <el-menu
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
                  <el-tooltip
                    effect="dark"
                    :content="item.name"
                    placement="right"
                  >
                    <span class="menu-text">{{ item.name }}</span>
                  </el-tooltip>
                </el-menu-item>
              </template>
            </el-menu>
          </el-aside>
        </div>
        <!-- 折叠按钮 -->
        <div style="align-items: center; display: flex">
          <div @click="toggleCollapse" class="hidden md:block pl-[10px]">
            <el-icon v-if="isCollapse"><ArrowRightBold /></el-icon>
            <el-icon v-else><ArrowLeftBold /></el-icon>
          </div>
        </div>

        <!-- 移动端菜单抽屉 -->
        <el-drawer
          v-model="showMenuDrawer"
          direction="ltr"
          size="260px"
          :with-header="false"
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
                <el-tooltip
                  effect="dark"
                  :content="item.name"
                  placement="right"
                >
                  <span class="menu-text">{{ item.name }}</span>
                </el-tooltip>
              </el-menu-item>
            </template>
          </el-menu>
        </el-drawer>

        <el-main class="p-4">
          <!-- 移动端顶部按钮 -->
          <div class="flex justify-between md:hidden mb-2">
            <el-button
              class="fixed bottom-4 left-4"
              type="primary"
              size="small"
              @click="showMenuDrawer = true"
              >☰ 菜单</el-button
            >
          </div>

          <!-- 主体内容和右侧卡片（PC两列） -->
          <div class="flex flex-col md:flex-row gap-4">
            <!-- 主内容 -->
            <div class="w-full md:w-3/4">
              <MdPreview editorId="preview-only" :modelValue="currentContent" />
            </div>

            <!-- 信息卡片：PC 显示，移动端抽屉 -->
            <div class="hidden md:block md:w-1/4">
              <CardInfo />
              <ElectronicClocks />
              <div class="sticky mt-4 top-20">
                <DirectoryCard />
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
    <div class="hidden md:block">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { MdPreview } from "md-editor-v3";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import { ref, computed, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import useWebsiteStore from "@/store/modules/website.ts";
import DirectoryCard from "../Article/DirectoryCard/index.vue";
import "md-editor-v3/lib/preview.css";
const isCollapse = ref(false);
const isShowMoveCatalog = ref(false);
const websiteStore = useWebsiteStore();
const route = useRoute();

const showMenuDrawer = ref(false);

const detailData = ref(null);
// 字数 统计
const countMd = ref(0);
onMounted(() => {
  const id = Number(route.params.id);
  const found = knowledgeList.id == id;
  detailData.value = found || null;
});

// ✅ 模拟数据（直接写在这里）
const knowledgeList = {
  id: 1,
  title: "Vue3 实战教程",
  description: "从零构建一个企业级 Vue3 项目",
  fullDescription:
    "从基础语法、Composition API 到项目架构，循序渐进掌握 Vue3。",
  articles: 10,
  views: 1392,
  children: [
    {
      id: 11,
      name: "Vue3 实战教程",
      description: "从零构建一个企业级 Vue3 项目",
      fullDescription:
        "从基础语法、Composition API 到项目架构，循序渐进掌握 Vue3。",
      articles: 10,
      views: 1392,
      child: [
        {
          id: 1110,
          name: `模块 1.1`,
          content: `📚 欢迎来到 <strong>模块 1.1</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。欢迎来到 <strong>模块 1.1</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。欢迎来到 <strong>模块 1.1</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。欢迎来到 <strong>模块 1.1</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。欢迎来到 <strong>模块 1.1</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。欢迎来到 <strong>模块 1.1</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。`,
        },
        {
          id: 11111,
          name: `模块 1.2`,
          content: `📚 欢迎来到 <strong>模块 1.2</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。`,
        },
      ],
    },
    {
      id: 112,
      name: "Vue3 实战教程222",
      description: "从零构建一个企业级 Vue3 项目",
      fullDescription:
        "从基础语法、Composition API 到项目架构，循序渐进掌握 Vue3。",
      articles: 10,
      views: 1392,
      child: [
        {
          id: 222222,
          name: `模块 2.2`,
          content: `📚 欢迎来到 <strong>模块 2.1</strong>，这是一个测试内容区域，支持 <em>富文本</em> 渲染。\n # 1.1ddd \n dadasdasd \n ## 1.2 ddd`,
        },
        {
          id: 222333,
          name: `模块 2.2`,
          content:
            '访问 `/api/test` 接口超过 5 次/分钟时，返回：\r\n\r\n```json\r\n{\r\n  "status": 429,\r\n  "message": "一分钟最多访问5次哦"\r\n}\r\n```\r\n\r\n------\r\n\r\n需要我帮你改成返回统一的 `Result<T>` 风格，或加上用户ID识别、IP白名单这些扩展吗？',
        },
      ],
    },
  ],
};

// 封装假数据
const generateKnowledgeMockData = (): MenuItem[] => {
  const menuItems: MenuItem[] = knowledgeList.children.map((item) => ({
    id: item.id,
    name: item.name,
    children: item.child,
  }));
  return menuItems;
};
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

  return knowledgeList.fullDescription;
});

// 菜单点击事件
const handleSelect = (index: string) => {
  selectedId.value = index;
};
function mdHtml(htmlText: string) {
  // 获取html中的所有文字，去掉空格与标点符号
  const text = htmlText
    .replace(/<[^>]+>/g, "")
    .replace(/[\r\n]/g, "")
    .replace(/[ ]/g, "")
    .replace(/[\s+\.\!\/_,$%^*(+\"\']+|[+——！，。？、~@#￥%……&*（）]+/g, "");
  countMd.value = <number>countWords(text.length);
}
// 字数统计
function countWords(count: number) {
  if (count <= 1000) {
    return count;
  } else {
    let counts = count / 1000;
    // 留小数点一位数
    counts = Number(counts.toFixed(1));
    return counts + "k";
  }
}
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
  overflow: hidden;
}

/* 主体区域：左右布局 */
.main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 左侧菜单 */
.sidebar {
  // width: 260px;
  overflow-y: auto;
  transition: width 0.3s ease;
  overflow-x: hidden;
}

/* 菜单文本截断 */
.menu-text {
  display: inline-block;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 如果你是在 <style scoped> 中写 */
:deep(.content_container) {
  width: 100% !important;
}
.el-menu {
  height: 100%;
  border-right: none; /* 如果你想去掉边框 */
  white-space: nowrap; /* 防止子元素换行 */
}
</style>
