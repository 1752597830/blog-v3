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
        <!-- 移动端右侧目录抽屉（使用 md-editor-v3 的 MdCatalog） -->
        <el-drawer
          v-model="showCatalogDrawer"
          direction="btt"
          size="60%"
          :with-header="false"
        >
          <MdCatalog editorId="preview-only" :scrollElement="scrollElement" />
        </el-drawer>

        <el-main class="p-4">
          <!-- 移动端按钮 -->
          <div class="flex justify-between md:hidden mb-2">
            <el-button
              class="fixed bottom-4 left-4 mobileBtn"
              type="primary"
              size="small"
              @click="showMenuDrawer = true"
              >☰ 菜单</el-button
            >
          </div>
          <!-- 移动端按钮 -->
          <div class="flex justify-between md:hidden mb-2">
            <el-button
              class="fixed bottom-14 left-4 mobileBtn"
              type="success"
              size="small"
              @click="isShowMoveCatalog = true"
            >
              <span>☰ 目录</span>
            </el-button>
          </div>

          <!-- 主体内容和右侧卡片（PC两列） -->
          <div class="flex flex-col md:flex-row gap-4">
            <!-- 主内容 -->
            <div class="w-full md:w-3/4">
              <MdPreview
                style="border-radius: 10px"
                editorId="preview-only"
                :modelValue="currentContent"
                :theme="mode"
                :on-html-changed="mdHtml"
              />
            </div>

            <!-- 信息卡片：PC 显示 -->
            <div class="hidden md:block md:w-1/4">
              <CardInfo />
              <ElectronicClocks />
              <div class="sticky mt-4 top-20">
                <DirectoryCard />
              </div>
            </div>
          </div>
        </el-main>
        <MobileDirectoryCard
          id="preview-only"
          :scroll-element="scrollElement"
          :is-show-move-catalog="isShowMoveCatalog"
          @update:isShowMoveCatalog="(value) => (isShowMoveCatalog = value)"
        />
      </el-container>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { MdPreview } from "md-editor-v3";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import { ref, computed, onMounted } from "vue";
import { useColorMode } from "@vueuse/core";
import DirectoryCard from "../Article/DirectoryCard/index.vue";
import MobileDirectoryCard from "../Article/MobileDirectoryCard/index.vue";
import "md-editor-v3/lib/preview.css";
const isCollapse = ref(false);
const route = useRoute();
const mode = useColorMode();
const showMenuDrawer = ref(false);
const isShowMoveCatalog = ref(false);
const scrollElement = document.documentElement;
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
            '## \uD83D\uDE80后台管理\n\n## centos 7.x\n\n## \uD83D\uDC2F配置多jdk环境\n\n### 下载、解压jdk 8 和jdk 17\n\n```shell\n[root@hcss-ecs-df6e ~]# cd /usr/local/program/jvm\n[root@hcss-ecs-df6e jvm]# ll\ntotal 8\ndrwxr-xr-x 9 root root 4096 Oct  5 15:28 jdk-17\ndrwxr-xr-x 7   10  143 4096 Dec 16  2018 jdk-8\n[root@hcss-ecs-df6e jvm]# pwd\n/usr/local/program/jvm\n```\n\n### 配置系统环境\n\n```shell\n# JDK 8\nupdate-alternatives --install /usr/bin/java java /usr/local/program/jvm/jdk-8/bin/java 1\nupdate-alternatives --install /usr/bin/javac javac /usr/local/program/jvm/jdk-8/bin/javac 1\n\n# JDK 17\nupdate-alternatives --install /usr/bin/java java /usr/local/program/jvm/jdk-17/bin/java 2\nupdate-alternatives --install /usr/bin/javac javac /usr/local/program/jvm/jdk-17/bin/javac 2\n```\n\n\n\n### 切换版本\n\n> alternatives --config java\n\n```shell\n[root@hcss-ecs-df6e jvm]# alternatives --config java\n\nThere are 2 programs which provide \'java\'.\n\n  Selection    Command\n-----------------------------------------------\n + 1           /usr/local/program/jvm/jdk-8/bin/java\n*  2           /usr/local/program/jvm/jdk-17/bin/java\n\nEnter to keep the current selection[+], or type selection number: 1\n[root@hcss-ecs-df6e jvm]# java -version\njava version "1.8.0_202"\nJava(TM) SE Runtime Environment (build 1.8.0_202-b08)\nJava HotSpot(TM) 64-Bit Server VM (build 25.202-b08, mixed mode)\n[root@hcss-ecs-df6e jvm]# \n```\n\n## 安装docker\n\n| docker版本 | 发布日期  | docker-compose版本 | 发布日期  |\n| ---------- | --------- | ------------------ | --------- |\n| 27.2.0     | 2024/9/5  | v2.29.2            | 2024/9/5  |\n| 27.1.2     | 2024/9/5  | /                  | /         |\n| 27.1.1     | 2024/7/30 | /                  | /         |\n| 27.1.0     | 2024/7/30 | v2.29.1            | 2024/7/23 |\n| 27.0.3     | 2024/7/10 | v2.29.0            | 2024/7/17 |\n| 27.0.2     | 2024/6/26 | v2.28.1            | 2024/6/24 |\n| 27.0.1     | 2024/6/26 | v2.28.0            | 2024/7/21 |\n| 26.1.4     | 2024/6/10 | v2.27.3            | 2024/7/21 |\n| 25.0.5     | 2024/4/8  | v2.27.0            | 2024/4/25 |\n| 24.0.9     | 2024/2/5  | v2.24.6            | 2024/2/15 |\n\n### 卸载旧版本\n\n```sh\nyum remove docker \\\n    docker-client \\\n    docker-client-latest \\\n    docker-common \\\n    docker-latest \\\n    docker-latest-logrotate \\\n    docker-logrotate \\\n    docker-engine\n```\n\n### **设置存储库**\n\n安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。\n\n```sh\nyum install -y yum-utils\n# 官方的不行，用阿里源拉取\nyum-config-manager \\\n    --add-repo \\\n    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo\n```\n\n### 安装docker引擎\n\n```sh\nyum install -y docker-ce docker-ce-cli containerd.io\n```\n\n### 启动docker\n\n```sh\n#启动docker\nsystemctl start docker\n#查看docker服务状态 running 就是启动成功\nsystemctl status docker\n```\n\n### 设置开机自启\n\n```sh\nsystemctl enable docker\n```\n\n### 查看版本\n\n```sh\n[root@hcss-ecs-df6e jvm]# docker version\nClient: Docker Engine - Community\n Version:           26.1.4\n```\n\n## 安装docker-compose\n\n### 下载文件\n\n官网地址：[Releases · docker/compose (github.com)](https://github.com/docker/compose/releases)\n\n下载完毕后，将文件传输到centos（我用的Xftp）\n\n### 授权\n\n```sh\nchmod a+x docker-compose-linux-x86_64\n```\n\n将拥有可执行权限的docker-compose文件移动到系统默认的环境变量的PATH目录中\n\n```\nmv docker-compose-linux-x86_64 /usr/bin/docker-compose\n```\n\n### 测试\n\n```sh\ndocker-compose version\n```\n\n```sh\n# 效果如下：\n[root@hcss-ecs-df6e docker]# docker-compose version\nDocker Compose version v2.27.3\n```\n\n## 配置镜像\n\n由于巴拉巴拉，，不能拉取\n\n我们采用GitHub拉取或者用我的链接直接下载\n\n[使用Github Action 构建docker镜像-悟空的日常 (cpolar.cn)](https://wkdaily.cpolar.cn/archives/gc)\n\n### 下载\n\n[直接下载我的镜像文件](https://www.123865.com/s/dCcDVv-jKgfd)\n\n### 导入镜像\n\n> docker load -i 镜像名\n\n```sh\n# ps:\ndocker load -i elasticsearch_8.14.3-amd64.tar\n```\n\n### 查看镜像\n\n```sh\ndocker images\n# 示例如下\n[root@hcss-ecs-df6e docker]# docker images\nREPOSITORY      TAG                            IMAGE ID       CREATED         SIZE\nminio/minio     RELEASE.2024-07-31T05-46-26Z   727cda9e715b   2 months ago    161MB\nmysql           8.0.39                         23b013c7c67d   2 months ago    572MB\nelasticsearch   8.14.3                         482b5962b08a   2 months ago    1.24GB\nkibana          8.14.3                         0da260e719ee   2 months ago    1.14GB\nrabbitmq        3.12.14-management             f6c6c9af5108   16 months ago   247MB\nredis           6.2.6                          3c3da61c4be0   2 years ago     113MB\n```\n\n### MySQL\n\ndocker-compose.yml文件\n\n**我的密码假设admin123**\n\n```yaml\nservices:\n  mysql:\n    image: mysql:8.0.39\n    container_name: mysql\n    ports:\n      - 3306:3306\n    environment:\n      - MYSQL_ROOT_PASSWORD=admin123\n    volumes:\n      - ./data/:/var/lib/mysql/\n```\n\n运行\n\n```sh\ndocker-compose up -d\n```\n\n路径结构\n\n```yaml\n--mysql\n  --docker-compose.yml\n```\n\n### Redis\n\n先准备一个Redis的配置文件，设置好连接密码信息\n\n```sh\nmkdir data\ncd data\nvi redis.conf\n```\n\nredis.conf文件编写(我的密码假设admin123)\n\n```sh\nrequirepass admin123\n```\n\ndocker-compose.yml文件\n\n```yaml\nservices:\n  redis:\n    image: redis:5.0.9\n    container_name: redis\n    ports:\n      - 6379:6379\n    volumes:\n      - ./data/:/data/\n    command: ["redis-server","redis.conf"]\n```\n\n运行\n\n```sh\ndocker-compose up -d\n```\n\n路径结构\n\n```yaml\n--Redis\n  --data\n    --redis.conf\n  --docker-compose.yml\n```\n\n### Minio\n\ndocker-compose.yml文件\n\n(我的密码假设admin123)\n\n```yaml\nservices:\n  minio:\n    image: minio/minio:RELEASE.2024-07-31T05-46-26Z\n    container_name: myminio\n    ports:\n      - 9000:9000\n      - 9001:9001\n    volumes:\n      - /nas/minio:/data\n      - ./config:/root/.minio\n    environment:\n      MINIO_ROOT_USER: "admin"\n      MINIO_ROOT_PASSWORD: "admin123"\n    command: server --console-address \':9001\' /data\n    restart: always\n    privileged: true\n```\n\n运行\n\n```sh\ndocker-compose up -d\n```\n\n路径结构\n\n```yaml\n--minio\n  --docker-compose.yml\n```\n\n### Nacos\n\nNacos默认的启动方式是集群模式，集群模式占用的内存比较大，默认2G左右，直接采用单机模式的即可standalone模式~~~\n\n暂时Nacos持久化采用内嵌的数据库derby就足够了。\n\n准备docker-compose.yml\n\n```yaml\nservices:\n  nacos:\n    image: nacos/nacos-server:v2.3.0\n    container_name: nacos\n    ports:\n      - "8848:8848"\n      - "9848:9848"\n    environment:\n      - MODE=standalone\n```\n\n运行\n\n```sh\ndocker-compose up -d\n```\n\n### RabbitMQ\n\n准备docker-compose.yml文件\n\n```yaml\nservices:\n  rabbitmq:\n    image: rabbitmq:3.12.14-management\n    container_name: rabbitmq\n    ports:\n      - 5672:5672\n      - 15672:15672\n    environment:\n      - RABBITMQ_DEFAULT_USER=admin\n      - RABBITMQ_DEFAULT_PASS=admin123\n```\n\n运行\n\n```sh\ndocker-compose up -d\n```\n\n### nginx\n\n准备docker-compose.yml文件\n\n```yaml\n services:\n  nginx:\n    image: nginx:1.27.0\n    ports:\n      - "80:80"\n    volumes:\n      - "./nginx.conf:/etc/nginx/nginx.conf"\n      - "./logs:/var/log/nginx"\n      - "./html:/usr/share/nginx/html"\n    restart: always\n volumes:\n  data:\n```\n\n当前目录下创建nginx.conf \n\n```yaml\nworker_processes  1;\nevents {\n    worker_connections  1024;\n}\nhttp {\n    include       /etc/nginx/mime.types;\n    server {\n      listen       80;\n      server_name  localhost;\n      location / {\n        try_files $uri $uri/ @router;\n        root   /usr/share/nginx/html;\n        index  index.html index.htm;\n      }\n      location @router {\n          rewrite ^.*$ /index.html last;\n      }\n\n      location /api {\n          rewrite  ^/api/(.*)$ /$1 break;\n          # 配置后端IP\n          proxy_pass http://172.17.0.1:8099;\n          proxy_set_header Host $host;\n          proxy_set_header Cookie $http_cookie;\n          proxy_set_header X-Real-IP $remote_addr;\n          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n          proxy_redirect default;\n          add_header Access-Control-Allow-Origin *;\n          add_header Access-Control-Allow-Headers X-Requested-With;\n          add_header Access-Control-Allow-Methods GET,POST,OPTIONS;\n      }\n        access_log /var/log/nginx/access.log;\n        error_log /var/log/nginx/error.log;\n        error_page   500 502 503 504  /50x.html;\n        location = /50x.html {\n            root   /usr/share/nginx/html;\n        }\n    }\n    # 开启gzip\n    gzip on;\n    gzip_static on;\n    gzip_proxied any;\n    # 低于1kb的资源不压缩\n    gzip_min_length 1k;\n    gzip_buffers 4 16k;\n    gzip_comp_level 2;\n    # 需要压缩的类型\n    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;\n    # 配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）\n    gzip_disable "MSIE [1-6]\\.";\n    # 是否添加“Vary: Accept-Encoding”响应头\n    gzip_vary off;\n}\n```\n\n### Elasticsearch、Kibana\n\nElasticsearch和Kibana要一起安装，Kibana要依赖Elasticsearch\n\nElasticsearch默认也是集群的方式去搭建，而且占用的内存默认情况下特别大，设置一下Elasticsearch的占用内存大小\n\n准备docker-compose.yml\n\n```yaml\nservices:\n  elasticsearch:\n    image: elasticsearch:8.14.3\n    container_name: elasticsearch\n    ports:\n      - 9200:9200\n    environment:\n      - "cluster.name=elasticsearch"\n      - "discovery.type=single-node"\n      - "ES_JAVA_OPTS=-Xms256m -Xmx256m"\n      - "ELASTIC_PASSWORD=admin123"\n      - "xpack.security.enabled=true"\n    volumes:\n      - ./plugins/:/usr/share/elasticsearch/plugins/\n      - ./data/:/usr/share/elasticsearch/data/\n  kibana:\n    image: kibana:8.14.3\n    container_name: kibana\n    ports:\n      - 5601:5601\n    depends_on:\n      - elasticsearch\n    environment:\n      - "elasticsearch.hosts=http://elasticsearch:9200"\n      - "ELASTICSEARCH_USERNAME=admin"\n      - "ELASTICSEARCH_PASSWORD=admin123"\n```\n\n',
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
  background-color: var(--el-bg-color);
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
  height: calc(100vh - 160px);
  padding-bottom: 4px;
  overflow-y: auto;
  transition: width 0.3s ease;
  overflow-x: hidden;
}
.mobileBtn {
  color: var(--el-text-color-primary);
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
.el-main {
  height: calc(100vh - 156px);
}
</style>
