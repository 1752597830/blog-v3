<template>
    <div class="p-5" style="padding-top: 100px;">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KnowledgeCard
          v-for="item in paginatedList"
          :key="item.id"
          :data="item"
          :expanded="expandedId === item.id"
          @expand="expandedId = expandedId === item.id ? null : item.id"
        />
      </div>
  
      <!-- 分页控件 -->
      <div class="mt-6 flex justify-center">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="currentPage"
          :total="knowledgeList.length"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import KnowledgeCard from "./KnowledgeCard.vue";
  import "element-plus/dist/index.css";
  
  const expandedId = ref(null);
  const currentPage = ref(1);
  const pageSize = 6; // 每页显示的卡片数
  
  const handlePageChange = (page) => {
    currentPage.value = page;
  };
  
  // 计算当前页展示的数据
  const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return knowledgeList.slice(start, start + pageSize);
  });
  
  const knowledgeList = [
    {
      id: 1,
      title: "Vue3 实战教程",
      description: "从零构建一个企业级 Vue3 项目",
      fullDescription:
        "从基础语法、Composition API 到项目架构，循序渐进掌握 Vue3。",
      articles: 10,
      views: 1392,
      cover: "https://picsum.photos/seed/vue3/300/200",
      author: {
        name: "小明",
        avatar: "https://i.pravatar.cc/40?img=12",
      },
    },
    {
      id: 2,
      title: "后端进阶",
      description: "深入理解 Java & SpringBoot",
      fullDescription:
        "涵盖 Java 高级特性、Spring 全家桶、微服务架构实战，提升后端开发能力。提升升后端开发能提升后端开发能提后端开发能提.",
      articles: 5,
      views: 896,
      cover: "https://picsum.photos/seed/backend/300/200",
      author: {
        name: "小李",
        avatar: "https://i.pravatar.cc/40?img=14",
      },
    },
    {
      id: 3,
      title: "网络协议宝典",
      description: "从 HTTP 到 TCP 的网络通信解析",
      fullDescription: "透彻讲解网络协议体系，助你应对面试，夯实基础。",
      articles: 8,
      views: 1085,
      cover: "https://picsum.photos/seed/network/300/200",
      author: {
        name: "小王",
        avatar: "https://i.pravatar.cc/40?img=15",
      },
    },
    // 你可以继续添加更多数据用来分页测试
    {
      id: 4,
      title: "算法入门",
      description: "从零开始学算法",
      fullDescription: "数据结构 + 算法，面试必备，系统学习高频算法题。",
      articles: 12,
      views: 1234,
      cover: "https://picsum.photos/seed/algorithm/300/200",
      author: {
        name: "小张",
        avatar: "https://i.pravatar.cc/40?img=16",
      },
    },
    {
      id: 5,
      title: "前端性能优化",
      description: "让你的网站飞起来",
      fullDescription: "深入浏览器底层机制，掌握前端性能调优的核心技巧。",
      articles: 7,
      views: 877,
      cover: "https://picsum.photos/seed/performance/300/200",
      author: {
        name: "小刘",
        avatar: "https://i.pravatar.cc/40?img=17",
      },
    },
    {
      id: 6,
      title: "数据库实战",
      description: "掌握 MySQL、Redis 等数据库核心",
      fullDescription: "从建表设计到高并发优化，全面提升数据库实战能力。",
      articles: 9,
      views: 1345,
      cover: "https://picsum.photos/seed/db/300/200",
      author: {
        name: "小杨",
        avatar: "https://i.pravatar.cc/40?img=18",
      },
    },
    {
      id: 7,
      title: "系统设计入门",
      description: "大型系统怎么设计？",
      fullDescription: "消息队列、负载均衡、服务拆分……构建高可用系统。",
      articles: 6,
      views: 1003,
      cover: "https://picsum.photos/seed/systemdesign/300/200",
      author: {
        name: "小胡",
        avatar: "https://i.pravatar.cc/40?img=19",
      },
    },
  ];
  </script>
  