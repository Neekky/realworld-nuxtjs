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
        path: "/profile",
        name: "Profile",
        file: resolve("../pages/profile"),
      },
      {
        path: "/settings",
        name: "Settings",
        file: resolve("../pages/settings"),
      },
      {
        path: "/question",
        name: "Question",
        file: resolve("../pages/editor"),
      },
      {
        path: "/answer",
        name: "Answer",
        file: resolve("../pages/editor"),
      },
      {
        path: "/question-list",
        name: "QuestionList",
        file: resolve("../pages/questionList"),
      },
    ],
  },
];
