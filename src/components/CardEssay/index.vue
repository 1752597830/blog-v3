<script setup lang="ts">
import { ArticlePage, getArticleList } from "@/apis/home";
import { pageData } from "@/apis/utils";
import usePaginationStore from "@/store/modules/pagination";
import { useWindowSize } from "@vueuse/core";

// const articleList = ref([]);
const articleList = ref<ArticlePage[]>([]);

const paginationStore = usePaginationStore();

// 监听页数
watch(
  () => paginationStore.articlePagination.currentPage,
  () => {
    getArticleListFunc();
    // 滚动到顶部
    window.scrollTo(0, 300);
  }
);

// 屏幕宽度
const { width } = useWindowSize();

const getArticleListFunc = async () => {
  let params = {
    currentPage: paginationStore.articlePagination.currentPage,
    pageSize: paginationStore.articlePagination.pageSize,
  };
  let res:pageData<ArticlePage> = await getArticleList(params);
  if (res.code == 200) {
    let { list, total } = res.data;
    list = list.map((item: any) => {
      item.summary = item.summary.replace(/[*#>`~\-\\[\]()\s]|(\n\n)/g, "");
      // 提取前 50 个字符
      item.summary = item.summary.substring(0, 60) + "...";
      return item;
    });
    paginationStore.articlePagination.total = total;
    articleList.value = list;
  }
};
function loadContent() {
  getArticleListFunc();
}
</script>

<template>
  <!-- 封装文章列表卡片 -->
  <div v-view-request="{ callback: loadContent }">
    <template
      v-for="(article, index) in articleList"
      :key="article.id"
      v-if="articleList.length > 0"
    >
      <div
        v-slide-in
        @click="$router.push('/article/' + article.id)"
        class="h-92 md:h-60 mt-4 flex flex-col md:flex-row card overflow-hidden shadow-md mb-5 mx-2 dark:bg-[#1D1D1D]"
      >
        <div
          class="w-full md:h-full md:w-1/2 h-40"
          v-if="index % 2 == 1 || width < 768"
        >
          <div class="relative w-full h-full">
            <div class="relative img w-full h-full">
              <img
                class="w-full h-full object-cover hover:scale-110 ease-linear duration-300"
                v-lazy="true"
                :data-src="article.cover"
                alt="文章封面"
              />
            </div>
          </div>
        </div>
        <div class="md:w-1/2 w-full m-1 px-2 flex flex-col pl-5 pt-2 leading-7">
          <div
            class="hover:text-[#409EFF] transition-colors text-2xl font-bold w-fit"
          >
            {{ article.articleTitle }}
          </div>
          <div class="flex text-xs mt-2 space-x-2">
            <div class="flex">
              <SvgIcon name="reading"/>
              <span class="ml-1">{{ article.visitCount }}</span>
            </div>
          </div>
          <p
            class="overflow-ellipsis overflow-hidden h-10 md:h-[3.9rem] leading-tight mt-2 text-[#475569]"
          >
            {{ article.summary }}
          </p>
          <div class="flex space-x-2">
            <div class="tag">
              <span>标签：</span>
              <el-tag
                size="small"
                class="mr-2"
                v-for="tag in article.tagNameList"
                >{{ tag }}</el-tag
              >
            </div>
          </div>
          <div class="text-xs mt-4 flex">
            <p class="mr-4 mb-1">发布于：{{ article.createTime }}</p>
            <p>更新于：{{ article.updateTime }}</p>
          </div>
        </div>
        <div
          class="w-full md:h-full md:w-1/2 h-40"
          v-if="index % 2 == 0 && width > 768"
        >
          <div class="relative w-full h-full">
            <div class="relative img w-full h-full">
              <img
                class="w-full h-full object-cover"
                v-lazy="true"
                :data-src="article.cover"
                alt="文章封面"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <template v-if="articleList.length == 0">
    <el-skeleton :rows="8" animated />
  </template>
</template>

<style scoped lang="scss">
.card {
  border-radius: $border-radius;

  &:hover img {
    transform: scale(1.1);
  }
  .img {
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s linear;
    }
  }
}

.classify {
  z-index: 1;
  position: absolute;
  top: 0;
  color: white;
  padding: 10px;
  backdrop-filter: blur(5px);
}
</style>
