export const constantRouter = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout/index.vue"),
    children: [
      // 首页
      {
        path: "",
        component: () => import("@/views/Home/index.vue"),
        name: "home",
        meta: {
          title: "sin-blog | 忙里偷闲的sin",
        },
      },
      // 时间轴
      {
        path: "/timeline",
        component: () => import("@/views/Pigeonhole/TimeLine/index.vue"),
        name: "timeline",
        meta: {
          title: "时间轴",
        },
      },
      // 分类
      {
        path: "/category/:id?",
        component: () => import("@/views/Pigeonhole/Category/index.vue"),
        name: "category",
        meta: {
          title: "文章分类",
        },
      },
      // 标签
      {
        path: "/tags/:id?",
        component: () => import("@/views/Pigeonhole/Tags/index.vue"),
        name: "tags",
        meta: {
          title: "文章标签",
        },
      },
      // // 树洞
      // {
      //     path: '/tree-hole',
      //     component: () => import('@/views/Amusement/TreeHole/index.vue'),
      //     name: 'treeHole',
      //     meta: {
      //         title: '心灵树洞',
      //     }
      // },
      // // 留言版
      // {
      //     path: '/message',
      //     component: () => import('@/views/Amusement/Message/index.vue'),
      //     name: 'message',
      //     children: [
      //         {
      //             path: '',
      //             component: () => import('@/views/Amusement/Message/MessageList/index.vue'),
      //             name: 'messageList',
      //             meta: {
      //                 title: '留言板',
      //             }
      //         },
      //         {
      //             path: '/message/detail/:id?',
      //             component: () => import('@/views/Amusement/Message/MessageDetail/index.vue'),
      //             name: 'messageDetail',
      //             meta: {
      //                 title: '留言详情',
      //             }
      //         }
      //     ]
      // },
      // 关于
      {
        path: "/about",
        component: () => import("@/views/About/index.vue"),
        name: "about",
        meta: {
          title: "关于网站",
        },
      },
      // 知识库
      {
        path: "/knowledge",
        component: () => import("@/views/Knowledge/index.vue"),
        name: "knowledge",
        meta: {
          title: "知识库",
        },
      },
      {
        path: "/knowledge/:id",
        name: "KnowledgeDetail",
        component: () => import("@/views/Knowledge/KnowledgeDetail.vue"),
        meta: {
          title: "详情"
        }
      },

      // // 音乐
      // {
      //     path: '/music',
      //     component: () => import('@/views/Music/index.vue'),
      //     name: 'music',
      //     meta: {
      //         title: '音乐',
      //     }
      // },
      // // 相册
      // {
      //     path: '/photo',
      //     component: () => import('@/views/Photo/index.vue'),
      //     name: 'photo',
      //     meta: {
      //         title: '相册',
      //     }
      // },
    ],
  },
  // 文章
  {
    path: "/article/:id",
    component: () => import("@/views/Article/index.vue"),
    name: "article",
    meta: {
      title: "文章详情",
    },
  },
  // // 设置
  // {
  //     path: '/setting',
  //     component: () => import('@/views/Setting/index.vue'),
  //     name: 'setting',
  //     meta: {
  //         title: '用户设置',
  //     }
  // },
  // 访问其他任何不存在的路由，重定向到首页
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
    name: "any",
  },
];
