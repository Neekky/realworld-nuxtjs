// https://nuxt.com/docs/api/configuration/nuxt-config
import routes from "./router";

export default defineNuxtConfig({
  modules: [
    // 添加pinia
    "@pinia/nuxt",
  ],
  css: ["element-plus/dist/index.css"],
  router: {
    options: {
      linkActiveClass: "nav-active",
    },
  },
  hooks: {
    "pages:extend"(r) {
      // 清除默认路由规则表
      r.splice(0);
      r.push(...routes);
    },
  },
  app: {
    head: {
      title: "知乎",
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css",
          type: "text/css",
        },
        {
          href: "//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic",
          rel: "stylesheet",
          type: "text/css",
        },
        {
          href: "/main.css",
          rel: "stylesheet",
          type: "text/css",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
});
