import path from "path";

const resolve = (pagePath: string) => path.resolve(__dirname, `${pagePath}`);

export default [
  {
    path: "/",
    name: "Layout",
    file: resolve("../pages/layout"),
    children: [
      {
        path: "",
        name: "Home",
        file: resolve("../pages/home"),
      },
      {
        path: "/login",
        name: "Login",
        file: resolve("../pages/login"),
      },
      {
        path: "/register",
        name: "Register",
        file: resolve("../pages/login"),
      },
      {
        path: "/profile/:username",
        name: "Profile",
        file: resolve("../pages/profile"),
      },
      {
        path: "/settings",
        name: "Settings",
        file: resolve("../pages/settings"),
      },
      {
        path: "/editor",
        name: "Editor",
        file: resolve("../pages/editor"),
      },
      {
        path: "/article/:slug",
        name: "Article",
        file: resolve("../pages/article"),
      },
    ],
  },
];
