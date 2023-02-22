import Request from "@/utils/request";

export default new (class Home extends Request {
  /**
   * 获取指定问题
   */
  getQuestionDetail(id: string) {
    return this.get(`/question/${id}`);
  }
  /**
   * 获取指定问题下的答案列表
   */
  getAnswerByQuestionId(id: string) {
    return this.get(`/question/${id}/answer`);
  }
})();