<template>
  <div
    class="rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 transition transform hover:-translate-y-1 hover:shadow-xl relative flex flex-col"
  >
    <img :src="data.cover" alt="cover" class="h-40 w-full object-cover" />
    <div
      class="p-4 cursor-pointer flex-1 flex flex-col justify-between"
      @click="emit('expand')"
    >
      <div>
        <h2 class="text-lg font-semibold flex justify-between items-center">
          <span>{{ data.title }}</span>
          <button
            @click.stop="goToDetail"
            class="text-sm text-blue-500 hover:underline"
          >
            详情
          </button>
        </h2>
        <p class="text-sm text-gray-500 mt-1">{{ data.description }}</p>
        <div class="text-xs text-gray-400 mt-2">{{ data.articles }} 篇文章</div>
      </div>

      <!-- 展开部分 -->
      <transition name="expand">
        <div
          class="overflow-hidden transition-all duration-300 mt-4 text-sm text-gray-600 dark:text-gray-300"
        >
          <div class="flex items-center mb-1">
            <img
              :src="data.author.avatar"
              class="w-6 h-6 rounded-full mr-2"
              alt="avatar"
            />
            👤 忙里偷闲的sin
          </div>
          <div>👁️ 浏览：{{ data.views }} 次</div>
          <div class="mt-2 leading-relaxed">
            <span class="truncate-text">📄 {{ data.fullDescription }}</span>

          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  data: Object,
  expanded: Boolean,
});
const emit = defineEmits(["expand"]);

const goToDetail = () => {
  router.push({ name: "KnowledgeDetail", params: { id: props.data.id } });
};
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}
</style>
