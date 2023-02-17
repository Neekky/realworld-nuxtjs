import { defineStore } from "pinia";

// 定义store
export const useUserStore = defineStore("userInfo", {
  state: () => {
    // 服务端渲染期间，从客户端获取cookie，存储到pinia中
    // const user = process.server ? {
    //   _id: "",
    //   name: "",
    //   age: "",
    //   avatar_url: "",
    //   gender: "",
    //   headline: "",
    // } : useCookie("user").value;
    return {
      userInfo: {
          _id: "",
          name: "",
          age: "",
          avatar_url: "",
          gender: "",
          headline: "",
        }
    };
  },
  actions: {
    updateUserInfo(data: any) {
      this.userInfo = { ...this.userInfo, ...data };
    },
  },
  getters: {},
});
