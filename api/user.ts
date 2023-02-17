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

  /**
   * 查询指定用户
   * fields=educations;following;followingTopics;password
   */
  findUserById(userId: string, params: string) {
    return this.get(`/users/findById/${userId}`, {params})
  }

  /**
   * 更新用户信息
   */
  updateUserById(userId: string, params: string) {
    const token = useCookie('token');
    return this.patch(`/users/update/${userId}`, {body: params}, {Authorization: `Bearer ${token.value}`})
  }
})();
