import Request from '@/utils/request'

export default new class Home extends Request {
    /**
     * 获取问题列表
     */
    getQuestionList() {
      return this.get('/question')
    }
  }