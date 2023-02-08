import { defineStore } from "pinia";

export const useUserStore = defineStore("userInfo", {
  state: () => ({
    userInfo: {
      _id: "",
      name: "",
      age: "",
      avatar_url: "",
      gender: "",
      headline: "",
    },
  }),
  actions: {
    updateUserInfo(data: any) {
      this.userInfo = { ...this.userInfo, ...data };
    },
  },
  getters: {
    // userInfoA: (state) => state.userInfo,
  },
});
