<template>
  <div
    :class="[
      'min-h-screen',
      'transition-colors',
      'duration-700',
      'relative',
      'overflow-hidden',
    ]"
  >
    <div class="relative z-10 flex flex-col items-center justify-center p-20">
      <!-- 主要内容卡片 -->
      <div
        class="bg-white dark:bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-7xl w-full text-center transition-colors"
      >
        <!-- 头像 -->
        <div class="avatar-wrapper">
          <el-avatar :src="useWebsite.webInfo?.webmasterAvatar" />
        </div>
        <!-- 标题 -->
        <h1 class="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          👨‍💻 忙里偷闲的sin · Java工程师
        </h1>
        <!-- 介绍文字 -->
        <p class="text-gray-600 dark:text-gray-300 text-lg mb-6 h-24">
          {{ displayedText
          }}<span v-if="showCursor" class="animate-blink">|</span>
        </p>

        <!-- 技能分类 -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            v-for="(group, groupName) in groupedSkills"
            :key="groupName"
            class="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg transition-colors"
          >
            <h2
              class="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300"
            >
              {{ groupName }}
            </h2>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="skill in group"
                :key="skill.name"
                class="relative group cursor-pointer flex flex-col items-center w-24"
              >
                <img :src="skill.icon" alt="icon" class="w-12 h-12 mb-2" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{
                  skill.name
                }}</span>
                <!-- hover弹窗 -->
                <div
                  class="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center"
                >
                  <div
                    class="bg-black dark:bg-white text-white dark:text-black text-xs rounded py-1 px-2 whitespace-nowrap"
                  >
                    {{ skill.description }}
                  </div>
                  <div
                    class="w-3 h-3 bg-black dark:bg-white rotate-45 mt-1"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系方式 -->
        <div class="mt-10 w-full text-center mb-8">
          <h2
            class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100"
          >
            📬 联系方式
          </h2>
          <div class="flex flex-col gap-2 text-gray-600 dark:text-gray-300">
            <p>📧 邮箱：1752597830@qq.com</p>
            <div class="link-wrapper">
              <div class="link-wrapper">
                <SvgIcon name="github_icon" width="32" height="32" />
                <a
                  href="https://github.com/1752597830"
                  target="_blank"
                  class="link-text"
                  >忙里偷闲的sin</a
                >
              </div>
              <div class="link-wrapper">
                <SvgIcon name="gitee_icon" width="32" height="32" />
                <a
                  href="https://gitee.com/qinfeng_wei"
                  target="_blank"
                  class="link-text"
                  >忙里偷闲的sin</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import JSConfetti from "js-confetti";
import useWebsiteStore from "@/store/modules/website.ts";

const useWebsite = useWebsiteStore();

const jsConfetti = new JSConfetti();

jsConfetti.addConfetti();
// 打字机动画
const fullText =
  "一名热爱技术、注重工程实践的后端开发者，热衷于系统架构与性能优化，追求代码的优雅与效率，持续探索新技术与最佳实践。";
const displayedText = ref("");
const showCursor = ref(true);
let index = 0;
// 根据系统主题初始化
onMounted(() => {
  // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //   $colorMode.value = "dark";
  // }

  const typingInterval = setInterval(() => {
    if (index < fullText.length) {
      displayedText.value += fullText[index];
      index++;
    } else {
      clearInterval(typingInterval);
      setInterval(() => {
        showCursor.value = !showCursor.value;
      }, 500);
    }
  }, 80);
});

// 技能数据
const groupedSkills = {
  "🛠️ 后端语言与并发": [
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      description: "扎实的Java基础，深入理解面向对象、集合、多线程",
    },
    {
      name: "JUC并发",
      icon: "/icons/concurrency.svg",
      description: "掌握线程池、CAS机制、synchronized、并发工具类",
    },
  ],
  "🚀 框架与微服务": [
    {
      name: "Spring全家桶",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      description: "精通Spring、SpringBoot、SpringMVC、MyBatis框架",
    },
    {
      name: "Spring Cloud Alibaba",
      icon: "/icons/cloud.svg",
      description: "熟悉Nacos、Feign、Sentinel、Seata、Gateway等",
    },
  ],
  "🧠 数据库与缓存": [
    {
      name: "MySQL优化",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      description: "掌握事务、索引优化、SQL调优、分库分表",
    },
    {
      name: "Redis高级应用",
      icon: "/icons/redis.svg",
      description: "缓存设计、分布式锁、布隆过滤器、秒杀优化",
    },
  ],
  "📦 中间件与消息队列": [
    {
      name: "RocketMQ",
      icon: "/icons/rocketmq.svg",
      description: "掌握可靠消息、消费幂等、延迟消息处理",
    },
    {
      name: "Kafka / RabbitMQ",
      icon: "/icons/mq.svg",
      description: "熟悉消息投递、死信队列等场景设计",
    },
  ],
  "🔧 运维与部署": [
    {
      name: "Nginx优化",
      icon: "/icons/nginx.svg",
      description: "动静分离、负载均衡、限流防刷",
    },
    {
      name: "Docker & Linux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      description: "掌握Docker容器化部署，Linux服务器管理",
    },
  ],
  "🤖 AI赋能开发": [
    {
      name: "ChatGPT / DeepSeek",
      icon: "/icons/ai.svg",
      description: "熟练使用AI工具提升开发效率与质量",
    },
  ],
};
</script>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
.animate-blink {
  animation: blink 1s step-start infinite;
}
.avatar-wrapper {
  width: 20vw;
  height: 20vw;
  max-width: 120px;
  max-height: 120px;
  min-width: 60px;
  min-height: 60px;
  margin: 0 auto;
  .el-avatar {
    width: 20vw;
    height: 20vw;
    max-width: 120px;
    max-height: 120px;
    min-width: 60px;
    min-height: 60px;
    border: 3px solid var(--el-color-white);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    transition: all 0.6s ease;
  }

  &:hover .el-avatar {
    transform: rotate(360deg) scale(1.1);
  }
  margin-bottom: 30px;
}
.link-wrapper {
  display: flex;
  justify-content: center; /* 整体居中 */
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 图标和文字之间的间距 */
  margin-top: 5px; /* 距顶部5px */
}

.link-text {
  /* font-size: 18px; */
  text-decoration: none;
  transition: color 0.3s;
}

.link-text:hover {
  color: #1da1f2; /* 悬浮时变成亮色，比如天蓝 */
}
.social-links a img:hover {
  transform: scale(1.2);
  transition: all 0.3s ease;
}
</style>
