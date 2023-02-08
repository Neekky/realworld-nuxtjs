import Request from "@/utils/request";

export default new (class Login extends Request {
  /**
   * 用户登录
   */
  login(params: { name: string; password: string }) {
    return this.post("/users/login", { body: params });
  }

  /**
   * 用户注册
   */
  register(params: { name: string; password: string }) {
    return this.post("/users/create", { body: params });
  }
})();
